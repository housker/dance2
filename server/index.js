const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

console.log(__dirname + '/../client')

app.use(express.static(__dirname + '/../client'));

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))