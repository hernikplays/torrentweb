require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  res.sendFile(__dirname+`/index.html`)
});

app.post(`/lol`, function(req, res){
  console.log(req.body.torrent)
  var WebTorrent = require('webtorrent')
  var client = new WebTorrent()
  
  let conf = {}
  conf.path = __dirname+"/dl/"

  client.add(req.body.torrent,conf,(torrent)=>{
    setInterval(() => {
      var percent = Math.round(torrent.progress * 100 * 100) / 100
      console.log(percent)
    }, 1000);
    torrent.on('done', function () {
      res.send("Torrent downloaded")
      clearInterval()
      console.log('torrent download finished')
      res.end()
    })
  })
});
app.get('/exit', function (req, res) {
    process.exit();
  });


app.listen(process.env.PORT, () => {
    console.log("bruh Listening on port " + process.env.PORT);
  });