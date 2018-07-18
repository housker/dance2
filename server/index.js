const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));

app.get('/downloads', (req, res) => {
  var files = fs.readdirSync(__dirname + '/../client/downloads');
  res.status(200).send(files);
})

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))