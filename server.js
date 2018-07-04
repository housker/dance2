const express = require('express');
const app = express();
const port = process.env.PORT || 3000

console.log(__dirname + '/index.html')

app.use(express.static(__dirname));

app.listen(3000, () => console.log(`server listening on port ${port}`))