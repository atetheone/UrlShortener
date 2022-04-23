require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
// const dns = require('dns');
const addUrl = require('./app').addUrl;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const findByShortId = require('./app').findByShortId;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/shorturl/:short_url', (req, res) => {
  const url = findByShortId(req.params.short_url, (err, data) => {
    if (err) console.log(err);
    else {
      console.log(JSON.stringify(data, null, 3));
      res.redirect(data.original_url);
    }
  });
})


app.post('/api/shorturl', (req, res) => {
  console.log(JSON.stringify(req.body, null, 3));
  var original_url = req.body['url'];
  
  addUrl(original_url, (err, data) => {
    if (err || data['error']) {
      console.log({error: 'Errorrrrr!!!'});
      res.json({error: 'invalid url'})
    }
    else  {
      console.log('data: '+ JSON.stringify(data, null, 3))
      res.json({
        'original_url': data.original_url,
        'short_url': data.short_url
      });
    } 
  });
  
});




app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
