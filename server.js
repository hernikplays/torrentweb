require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  res.sendFile(__dirname+`/index.html`)
});

app.post(`/lol`, function(req, res){
  var Client = require('node-torrent');
  var client = new Client({logLevel: 'DEBUG'});
  var torrent = client.addTorrent(req.body.torrent);
   
  torrent.on('complete', function() {
      console.log('complete!');
      torrent.files.forEach(function(file) {
          var newPath = '/downloads/' + file.path;
          fs.rename(file.path, newPath);
          
          file.path = newPath;
      });
  });
});
app.get('/exit', function (req, res) {
    process.exit();
  });


app.listen(process.env.PORT, () => {
    console.log("bruh Listening on port " + process.env.PORT);
  });