const express = require('express');
const app = express();

app.use(express.static("./../diy-react-router-master/build/"));

app.listen(1337);