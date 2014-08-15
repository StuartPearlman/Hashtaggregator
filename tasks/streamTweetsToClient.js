// stream tweets to client on given interval

module.exports = function streamTweetsToClient(Tweets, Client, Delay) {
  (function streamRemainingTweets() {
      if (Tweets.length) {
          Client.emit('sendTweets', Tweets.pop());
          setTimeout(streamRemainingTweets, Delay);
      }
  })();
}

// TESTED ==============================

if(process.argv[1] === __filename) {

  var messenger = require('../messenger')
  var tweets = ['tweetle dee', 'tweetle dum'];


  module.exports(tweets, messenger, 1);

  messenger.on('sendTweets', function(tweet) {
    console.log(tweet === 'tweetle dee');
    process.reallyExit();
  });
}
