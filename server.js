// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

// timestamp endpoint logic
app.get("/api/timestamp", (req, res) => {
  res.json({
    unix: parseInt(Date.parse(new Date())),
    utc: new Date().toUTCString()
  })
})

app.get("/api/timestamp/:timestamp", (req, res) => {
  const { timestamp } = req.params;
  let utcDate
  let unix
  if (timestamp.match(/\d{10}/)) {
    unix = timestamp
    utcDate = new Date(timestamp/1).toUTCString()
  } else {
    utcDate = new Date(timestamp).toUTCString()
    unix = Date.parse(timestamp)
  }

  if (unix === null || utcDate === "Invalid Date") {
    res.json({
      error: "Invalid Date"
    })
  } else {
    res.json({
      unix: unix,
      utc: utcDate
    })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
