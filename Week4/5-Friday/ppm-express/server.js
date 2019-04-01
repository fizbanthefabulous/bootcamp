const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(express.static(__dirname+"./../ppm-app/build/"));
app.use(bodyParser.json());
app.use(cors());

app.post("/products", (request, response) => {
    console.log(request.body);

    axios.post("http://5ca14971c1b53400149aca17.mockapi.io/products", request.body)
    .then((mockApiPostReponse) => {
        return response.json(mockApiPostReponse.data);
    })
    .catch((error) => {
        console.log("I'm sorry, but I can't do that right now.");
    })
})

app.get("/products", (request, response) => {
    axios.get("http://5ca14971c1b53400149aca17.mockapi.io/products")
    .then((mockApiGetResponse) => {
        return response.json(mockApiGetResponse.data);
    })
    .catch((error) => {
        console.log("Have fun storming the castle!");
    })
})

app.get("/products/:id", (request, response) => {
    let id = request.params.id;
    console.log(id);

    axios.get(`http://5ca14971c1b53400149aca17.mockapi.io/products/${id}`)
    .then((mockApiGetResponse) => {
        return response.json(mockApiGetResponse.data);
    })
    .catch((error) => {
        console.log("Uh oh!");
    })
})

app.put("/products/:id", (request, response) => {
    let id = request.params.id;
    console.log(id);

    axios.put(`http://5ca14971c1b53400149aca17.mockapi.io/products/${id}`, request.body)
    .then((mockApiPutResponse) => {
       return axios.get(`http://5ca14971c1b53400149aca17.mockapi.io/products`)
    })
    .then((mockApiGetResponse) => {
        return response.json(mockApiGetResponse.data);
    })
    .catch((error) => {
        console.log("Frak");
    })
})


app.delete("/products/:id", (request, response) => {
    let id = request.params.id;
    console.log(id);

    axios.delete(`http://5ca14971c1b53400149aca17.mockapi.io/products/${id}`)
    .then((mockApiDeleteResponse) => {
       return axios.get(`http://5ca14971c1b53400149aca17.mockapi.io/products/${id}`)
    })
    .then((mockApiGetResponse) => {
        return response.json(mockApiGetResponse.data);
    })
    .catch((error) => {
        console.log("Frell");
    })
})

app.get("*", (request, response) => { 
    response.sendFile(path.resolve(__dirname+"/../ppm-app/build/index.html"));
})

app.listen(4200);