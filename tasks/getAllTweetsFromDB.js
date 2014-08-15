// Query database for all the tweets

var dbQuery = require('./query');
var sql = require('sql');

module.exports = function(err, cb) {
  if(err) return cb(err);

  var query = {
    text: 'SELECT * FROM "tweets"'
  };

  var results = dbQuery(query, function(err, data) {
    geoTweets = []
    data.rows.forEach(function(tweet) {
      if (tweet.latitude) geoTweets.push(tweet);
    })
    cb(null, geoTweets);
  });
}

// TESTED ===========================================

if(process.argv[1] === __filename) {
  module.exports(null, function(err, results) {
    if(err) return console.error(err);
    console.log(results);
    process.reallyExit();
  });
};
