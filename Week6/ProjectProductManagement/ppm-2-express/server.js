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
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('thankyou', function (data) { //7
        console.log("SOCKET.ON thankyou")
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

    axios.get('http://5ca14971c1b53400149aca17.mockapi.io/products')
    .then((mockApiGetResponse) => {
        console.log('Current Product List: ',mockApiGetResponse.data)
        socket.emit('newProductList', {products: mockApiGetResponse.data})
    })
    .catch((error) => {
        console.log('Product List no bueno!');
    })
})





app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname + "/../ppm-2-app/build/index.html"));
})