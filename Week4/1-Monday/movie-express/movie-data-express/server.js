const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());
app.use(express.static("./../movie-data/build/"))


//This route searches a title from openmdb, adds it to the history store, and returns the stored movie
app.get('/movies/:title', (request, response) => {
    var title = request.params.title;
    console.log(`Title=${title}`);

    //Initial call to lookup movie
    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=9681f08f&s=${title}`)
    .then((mockApiResponse) => {
        console.log(mockApiResponse.data.Search[0]);
        
        var movie = mockApiResponse.data.Search[0];
        //console.log(mockApiResponse.data);

        //Store to history
        return axios.post(`http://5c9916454236560014393207.mockapi.io/moviehistory`, { title, year: movie.Year, poster: movie.Poster })
    })
    .then((mockApiPostResponse) => {
        console.log(`Posted!`)
        console.log(mockApiPostResponse.data)

        //Return stored movie
        return response.json(mockApiPostResponse.data);
    })
    .catch((error) => {
        console.log(`Oh noes an error!`)
        console.log(error);
    })
})


//Fetches the entire movie search history
app.get('/movies', (request, response) => {
    axios.get('http://5c9916454236560014393207.mockapi.io/moviehistory')
    .then((mockApiResponse) => {
        return response.json(mockApiResponse.data);
    })
    .catch((error) => {
        console.log('Error Will Robinson!')
    })
})


//Deletes the selected movie then returns the updated history
app.delete('/movies/:id', (request, response) => {
    var id = request.params.id;
    console.log(`Deleting ${id}`);

    axios.delete(`http://5c9916454236560014393207.mockapi.io/moviehistory/${id}`)
    .then((mockAPIDeleteResponse) => {
        return axios.get('http://5c9916454236560014393207.mockapi.io/moviehistory');
    })
    .then((mockAPIGetResponse) => {
        return response.json(mockAPIGetResponse.data);
    })
    .catch((error) => {
        console.log(`Don't go the drones will miss you!`);
    })
})

app.listen(1337);