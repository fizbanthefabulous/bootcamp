const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const cors = require('cors');
const server = app.listen(4200);
const io = require('socket.io')(server);

app.use(express.static(__dirname + "./../ppm-2-app/build/"));
app.use(cors());

io.on('connection', function (socket) { //2
    console.log("CONNECTED TO CLIENT SOCKET")

    //Acknowledge client
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3

    //Listen for ack of our ack
    socket.on('thankyou', function (data) { //7
        console.log("SOCKET.ON thankyou")
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

    //Give current Product state
    axios.get('http://5ca14971c1b53400149aca17.mockapi.io/products')
    .then((mockApiGetResponse) => {
        //console.log('Current Product List: ',mockApiGetResponse.data)
        socket.emit('newProductList', {products: mockApiGetResponse.data});
    })
    .catch((error) => {
        console.log('Product List no bueno!');
    })

    //Create a new Product
    socket.on('create-new-item', function (data) {
        axios.post('http://5ca14971c1b53400149aca17.mockapi.io/products', data)
        .then((mockApiPostResponse => {
            //console.log('Item Created: ',mockApiPostResponse.data);
            socket.emit('item-created', mockApiPostResponse.data);
            sendUpdatedProducList();
        }))
        .catch((mockApiPostError) => {
            socket.emit('item-creation-error', {errormsg: "There was a problem creating the item. Please try again!"});
        })
    })


    //Edit a Product
    socket.on('update-item', function (data) {
        axios.put(`http://5ca14971c1b53400149aca17.mockapi.io/products/${data.id}`, data)
        .then((mockApiPutResponse => {
            //console.log('Item Created: ',mockApiPutResponse.data);
            socket.emit('item-updated', mockApiPutResponse.data);
            sendUpdatedProducList();
        }))
        .catch((mockApiPostError) => {
            socket.emit('item-update-error', {errormsg: "There was a problem updating the item. Please try again!"});
        })
    })


    //Deleting a Product
    socket.on('delete-item', function (data) {
        axios.delete(`http://5ca14971c1b53400149aca17.mockapi.io/products/${data.id}`)
        .then((mockApiDeleteResponse => {
            //console.log('Item Created: ',mockApiDeleteResponse.data);
            socket.emit('item-deleted', mockApiDeleteResponse.data);
            sendUpdatedProducList();
        }))
        .catch((mockApiPostError) => {
            socket.emit('item-delete-error', {errormsg: "There was a problem deleting the item. Please try again!"});
        })
    })
})

function sendUpdatedProducList() {
    axios.get('http://5ca14971c1b53400149aca17.mockapi.io/products')
    .then((mockApiGetResponse) => {
        //console.log('Current Product List: ',mockApiGetResponse.data)
        io.emit('newProductList', {products: mockApiGetResponse.data});
    })
    .catch((error) => {
        console.log('Product List no bueno!');
    })
}



app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname + "/../ppm-2-app/build/index.html"));
})