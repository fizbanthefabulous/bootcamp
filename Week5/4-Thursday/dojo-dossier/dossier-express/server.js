const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(express.static(__dirname + "./../dossier-app/build/"));
app.use(bodyParser.json());
app.use(cors());


app.post('/people', (request, response) => {
    console.log("Posting person", request.body)
    axios.post("http://5ca14971c1b53400149aca17.mockapi.io/people", request.body)
        .then((mockApiPostResponse) => {
            console.log("Getting all entries!")
            return response.json(mockApiPostResponse.data)
        })
        .catch((error) => {
            console.log("I can't do that right now");
        })
})


app.put('/people/:id', (request, response) => {
    console.log("Updating person", request.body)
    axios.put(`http://5ca14971c1b53400149aca17.mockapi.io/people/${request.params.id}`, request.body)
        .then((mockApiPutResponse) => {
            console.log("Getting all entries!")
            return axios.get("http://5ca14971c1b53400149aca17.mockapi.io/people")
        })
        .then((mockApiGetResponse) => {
            return response.json(mockApiGetResponse.data)
        })
        .catch((error) => {
            console.log("I can't do that right now");
        })
})


app.get('/people', (request, response) => {
    axios.get("http://5ca14971c1b53400149aca17.mockapi.io/people")
        .then((mockApiGetResponse) => {
            return response.json(mockApiGetResponse.data)
        })
        .catch((error) => {
            console.log("Not going to space today!");
        })
})


app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname + "/../dossier-app/build/index.html"));
})

app.listen(4200);