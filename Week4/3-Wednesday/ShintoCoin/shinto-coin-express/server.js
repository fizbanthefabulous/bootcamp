const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(express.static(__dirname+"./../shinto-coin/build/"));
app.use(bodyParser.json());
app.use(cors());


//Does all the magic with the backend
app.post("/ledger", (request, response) => {
    console.log("I'm doing the needful!");
    var ledgerResponse;
    var postRequest;
    var value;
    var coins;

    //Get the current valuation and coins owned
    axios.get("http://5c9916454236560014393207.mockapi.io/shintobank/1")
    .then((bankGetResponse) => {
        value = parseInt(bankGetResponse.data.valuation);
        coins = parseInt(bankGetResponse.data.coinbank);
        console.log('Value ', value, 'Coins ', coins);

        //Based on action either add or subtract
        if(request.body.action === "Mined" || request.body.action === "Bought") {
            value += parseInt(request.body.amount);
            coins += parseInt(request.body.amount);
        }
        else {
            value -= parseInt(request.body.amount);
            coins -= parseInt(request.body.amount);
        }

        //Update coin bank and value
        return axios.put("http://5c9916454236560014393207.mockapi.io/shintobank/1", {valuation: value, coinbank: coins});
    })
    .then((ledgerPutResponse) => {
        //Post transaction to the ledger
        postRequest = {...request.body, valuation: value};
        return axios.post("http://5c9916454236560014393207.mockapi.io/ledger", postRequest);
    })
    .then((ledgerPostResponse) => {
        //Return the transaction and updated info
        return response.json({...ledgerPostResponse.data, coinbank: coins});
    })
    .catch((error) => {
        console.log("Something has gone tragically wrong");
    })
})


//Get current ledger, coins, and value
app.get("/ledger", (request, response) => {
    console.log("Fetching all the things!");
    var value, coins;
    
    axios.get("http://5c9916454236560014393207.mockapi.io/shintobank/1")
    .then((bankGetResponse) => {
        value = parseInt(bankGetResponse.data.valuation);
        coins = parseInt(bankGetResponse.data.coinbank);
        console.log('Value ', value, 'Coins ', coins);

        return axios.get("http://5c9916454236560014393207.mockapi.io/ledger")
    })
    .then((ledgerGetResponse) => {
        return response.json({ledger: ledgerGetResponse.data, valuation: value, coinbank: coins})
    })
})


app.get("*", (request, response) => { 
    response.sendFile(path.resolve(__dirname+"/../shinto-coin/build/index.html"));
})

app.listen(4200);