const express = require('express');
const app = express();
const port = process.env.PORT || 3000

console.log(__dirname + '/../client')

app.use(express.static(__dirname + '/../client'));

app.listen(3000, () => console.log(`server listening on port ${port}`))