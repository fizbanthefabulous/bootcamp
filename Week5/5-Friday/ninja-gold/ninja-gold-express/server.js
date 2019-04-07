const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(express.static(__dirname + "./../ninja-gold-app/build/"));
app.use(bodyParser.json());
app.use(cors());

app.get('/ninja-gold', (request, response) => {
    axios.get('http://5ca14971c1b53400149aca17.mockapi.io/ninja-gold/1')
    .then((mockApiGetResponse) => {
        return response.json(mockApiGetResponse.data);
    })
    .catch((error) => {
        console.log('Not going to space today!')
    })
})


app.put('/ninja-gold', (request, response) => {
    console.log("Request", request.body);

    axios.get('http://5ca14971c1b53400149aca17.mockapi.io/ninja-gold/1')
    .then((mockApiGetResponse) => {
        console.log('Get1 reponse',mockApiGetResponse.data);
        return  axios.put('http://5ca14971c1b53400149aca17.mockapi.io/ninja-gold/1', {gold: request.body.gold, history: [...mockApiGetResponse.data.history, request.body.history]})
    })
    .then((mockApiPutResponse) => {
        console.log('Put reponse',mockApiPutResponse.data);
        return axios.get('http://5ca14971c1b53400149aca17.mockapi.io/ninja-gold/1')
    })
    .then((mockApiGet2Response) => {
        console.log('Get2 reponse',mockApiGet2Response.data);
        return response.json(mockApiGet2Response.data);
    })
    .catch((error) => {
        console.log("But the drones will miss you!");
    })
   
})


app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname + "/../ninja-gold-app/build/index.html"));
})

app.listen(4200);