const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

let nextId = 4;

const notes = [
    {id:1, title:"first object"},
    {id:2, title:"second object"},
    {id:3, title:"third object"},
]

app.use(express.static(__dirname+"/react-app/build/"));

app.get("/", (request, response) => {
    
})

app.get("/notes", (request, response) => {
    response.json( notes )
})


app.get("/notes/:id", (request, response) => {
    request.params.id
    response.json({
        status: true
    })
})

app.post("/notes", (request, response) => {
    request.body
    notes.push({
        title: request.body,
        id: nextId++,
    })
    response.json({
        status: true
    })
})

app.delete("/notes/:id", (request, response) => {
    request.params.id
    response.json({
        status: true
    })
})

app.put("/notes/:id", (request, response) => {
    request.params.id
    request.body
    response.json({
        status: true
    })
})


app.listen(1337, () => {
    console.log("Server restarted.");
});