// Handles the whole process of streaming from twitter to the database
var twitterStream = require('./twitterStream');
var createTweet = require('./createTweet');
var objectifyTweet = require('./objectifyTweet');
var messenger = require('../messenger');
var stream;

// custom callbacks
function objectifyCB(err, tweetObject) {
  if (err) return console.error(err);
  if (tweetObject.latitude) {
    createTweet(tweetObject, createTweetCB);
  }
}

function createTweetCB(err, data) {
  console.log(data);
}

// exports
module.exports = function(hashtag) {
  
  if (hashtag === '#') {
    hashtag = require('./hashtag');
  }

  twitterStream(hashtag, function(err, theStream) {
    stream = theStream;
  });

  stream.on('tweet', function(tweet) {
    objectifyTweet(tweet, objectifyCB);
  });

  // memory leak risk
  messenger.on('destroy', function() {
    stream.stop();
  });
};

// CAN'T FIGURE OUT HOW TO TEST THIS DIRECTLY ====================
