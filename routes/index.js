var express = require('express');
var router = express.Router();
var runStream = require('../stream/twitterStreamToDatabase');
var placeholder = require('../stream/hashtag');

 // GET home page.
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Hashtaggregator'
  })
})

module.exports = router;
