const express = require('express');
const app = express();

app.use(express.static("./../memory-lane-react/build/"));

app.listen(1337);