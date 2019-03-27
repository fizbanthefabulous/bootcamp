const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(express.static(__dirname+"./../shinto-coin/build/"));
app.use(bodyParser.json());
app.use(cors());

app.post("/ledger", (request, response) => {
    console.log("I'm doing the needful!");
    var ledgerResponse;

    axios.post("http://5c9916454236560014393207.mockapi.io/ledger", request.body)
    .then((ledgerPostResponse) => {
        //return response.json(mockApiPostResponse.data);
        ledgerResponse = ledgerPostResponse.data;
        return axios.get("http://5c9916454236560014393207.mockapi.io/shintobank/1")
    })
    .then(())
})


app.get("*", (request, response) => { 
    response.sendFile(path.resolve(__dirname+"/../shinto-coin/build/index.html"));
})

app.listen(4200);