// Query database for new tweets

var dbQuery = require('./query');
var sql = require('sql');
var getLastTweetID = require('./getLastTweetID')
var geoTweets;

module.exports = function(err, lastTweetID, cb) {
  if(err) return cb(err);

  var query = {
    text: 'SELECT * FROM "tweets" WHERE "tweets".id > $1',
    values: [ lastTweetID ]
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

function byID(a, b) {
  if (a.id < b.id)
     return -1;
  if (a.id > b.id)
    return 1;
  return 0;
}

if(process.argv[1] === __filename) {
  module.exports(null, 1, function(err, results) {
    if(err) return console.error(err);
    console.log(results.sort(byID)[0].id === 2);
    process.reallyExit();
  });
};
