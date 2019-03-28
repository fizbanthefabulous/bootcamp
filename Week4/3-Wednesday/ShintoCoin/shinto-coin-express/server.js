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


//Get current ledger, coins, and value
app.get("/ledger/:id", (request, response) => {
    console.log("Fetching all the things!");
    
    axios.get(`http://5c9916454236560014393207.mockapi.io/ledger/${request.params.id}`)
    .then((ledgerGetResponse) => {
        return response.json(ledgerGetResponse.data);
    })
})


app.get("/quote", (request, response) => {
    let quote, answer, tokens, idx;

    axios.get("http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote")
    .then((quoteGetResponse) => {
        console.log(quoteGetResponse.data);
        quote = quoteGetResponse.data.starWarsQuote;
        idx = quote.indexOf('-');
        console.log("hyphen idx: ",idx);
        if(idx === -1)
            idx = quote.indexOf('&#8211;');

        console.log("en dash idx:", idx);


        if(idx > - 1) {
            answer = quote.substring(idx+1).trim();
            quote = quote.substring(0,idx).trim();
            console.log("quote: ",quote);
            console.log("answer: ",answer);
        
            return response.json({quote, answer});
        }
        else {
            throw new Error("Derp!");
        }
    })
    .catch((error) => {
        console.log("We aren't going to space today!")
        console.log(error.message);
        return response.status(500).send(error.message);
    })
})


app.get("*", (request, response) => { 
    response.sendFile(path.resolve(__dirname+"/../shinto-coin/build/index.html"));
})

app.listen(4200);