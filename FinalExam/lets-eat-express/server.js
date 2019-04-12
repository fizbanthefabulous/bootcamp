const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const cors = require('cors');
const server = app.listen(4200);
const io = require('socket.io')(server);

app.use(express.static(__dirname + "./../lets-eat-app/build/"));
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

    axios.get('http://5cad073901a0b80014dcd22d.mockapi.io/restaurants')
        .then((mockApiGetRestaurantResponse) => {
            //Send author list
            socket.emit('restaurant-list', mockApiGetRestaurantResponse.data);
        })
        .catch((mockApiGetRestaurantError) => {
            console.log('Socket Connect: Get Restaurants Error')
            socket.emit('restaurant-list-error', mockApiGetRestaurantError.data);
        })


    axios.get(`http://5cad073901a0b80014dcd22d.mockapi.io/reviews`)
        .then((mockApiReviewsGetResponse) => {
            socket.emit('review-list', mockApiReviewsGetResponse.data);
        })
        .catch((mockApiReviewsGetError) => {
            console.log("Get Reviews Error");
            io.emit('review-list-error', mockApiReviewsGetError.data);
        })

    socket.on('add-restaurant', (data) => {
        axios.post('http://5cad073901a0b80014dcd22d.mockapi.io/restaurants', data)
            .then((mockApiRestaurantPostResponse) => {
                sendUpdatedRestaurantListToConnectedUsers();
            })
            .catch((mockApiPostRestaurantError) => {
                console.log("Add Restaurant Post Error");
                io.emit('restaurant-add-error', mockApiPostRestaurantError.data);
            })
    })

    socket.on('edit-restaurant', (data) => {
        axios.put(`http://5cad073901a0b80014dcd22d.mockapi.io/restaurants/${data.id}`, data)
            .then((mockApiRestaurantPutResponse) => {
                sendUpdatedRestaurantListToConnectedUsers();
            })
            .catch((mockApiPutRestaurantError) => {
                console.log("Edit Restaurant Put Error");
                io.emit('restaurant-put-error', mockApiPutRestaurantError.data);
            })
    })


    socket.on('add-reivew', (data) => {
        axios.post('http://5cad073901a0b80014dcd22d.mockapi.io/reviews', data)
            .then((mockApiReviewsPostResponse) => {
                sendUpdatedReviewsListToConnectedUsers();
            })
            .catch((mockApiPostReviewError) => {
                console.log("Add Review Post Error");
                console.log(mockApiPostReviewError);
                io.emit('review-add-error', mockApiPostReviewError.data);
            })
    })
})

function sendUpdatedRestaurantListToConnectedUsers() {
    axios.get('http://5cad073901a0b80014dcd22d.mockapi.io/restaurants')
        .then((mockApiGetRestaurantResponse) => {
            //Send author list
            io.emit('restaurant-list', mockApiGetRestaurantResponse.data);
        })
        .catch((mockApiGetRestaurantError) => {
            console.log("Send Updated Restaurant List: Get Restaurants Error");
            io.emit('restaurant-list-error', mockApiGetRestaurantError.data);
        })
}

function sendUpdatedReviewsListToConnectedUsers() {
    axios.get('http://5cad073901a0b80014dcd22d.mockapi.io/reviews')
        .then((mockApiGetReviewsResponse) => {
            //Send author list
            io.emit('review-list', mockApiGetReviewsResponse.data);
        })
        .catch((mockApiGetReviewsError) => {
            console.log("Send Updated Reviews List: Get Reviews Error");
            io.emit('reviews-list-error', mockApiGetReviewsError.data);
        })
}


app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname + "/../lets-eat-app/build/index.html"));
})