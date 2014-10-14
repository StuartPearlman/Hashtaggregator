// Connect to Twitter Streaming API and return constant stream of JSON objects

var Twit = require('twit');
// var keys = require('../keys.js');

var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});

module.exports = function(hashtag, cb) {
  hashtag = (typeof hashtag !== 'undefined' ? hashtag : require('./hashtag'));
  console.log('firing up the Tweet Stream...tracking ' + hashtag);
  var stream = T.stream('statuses/filter', {
    track: hashtag
  });

  cb(null, stream);
};
