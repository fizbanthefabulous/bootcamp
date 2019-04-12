const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const cors = require('cors');
const server = app.listen(4200);
const io = require('socket.io')(server);

app.use(express.static(__dirname + "./../quote-ranks-app/build/"));
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

    axios.get('http://5cad073901a0b80014dcd22d.mockapi.io/authors')
        .then((mockApiGetAuthorResponse) => {
            //Send author list
            socket.emit('author-list', mockApiGetAuthorResponse.data);
        })
        .catch((mockApiGetAuthorError) => {
            console.log('I have a bad feeling about this.')
            socket.emit('author-list-error', mockApiGetAuthorError.data);
        })

    socket.on('add-author', (data) => {
        axios.post('http://5cad073901a0b80014dcd22d.mockapi.io/authors', data)
            .then((mockApiAuthorPostResponse) => {
                sendUpdatedAuthorListToConnectedUsers();
            })
    })
})

function sendUpdatedAuthorListToConnectedUsers() {
    axios.get('http://5cad073901a0b80014dcd22d.mockapi.io/authors')
        .then((mockApiGetAuthorResponse) => {
            //Send author list
            io.emit('author-list', mockApiGetAuthorResponse.data);
        })
        .catch((mockApiGetAuthorError) => {
            console.log("I\'m sorry Dave. I can\'t do that right now.");
            io.emit('author-list-error', mockApiGetAuthorError.data);
        })
}


app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname + "/../quote-ranks-app/build/index.html"));
})