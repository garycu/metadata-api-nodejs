const express = require('express');
const path = require('path');
const moment = require('moment');
const { HOST, COLLECTION_NAME } = require('./src/constants');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

const app = express()
  .set('port', PORT)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

// Static public files
app.use(`/${COLLECTION_NAME}`, express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.send('The API for CU\'s SkywalkerZ collection!');
});

app.get(`/${COLLECTION_NAME}/:token_id`, function(req, res) {
  const tokenId = parseInt(req.params.token_id).toString();
  const data = JSON.parse(fs.readFileSync("./public/metadata/" + tokenId + ".json", "utf8"));
  data.image = `${HOST}/${COLLECTION_NAME}/images/${tokenId}.png`;
  res.send(data);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})