// update a tweet's stars field with data harvested from a retweet

var dbQuery = require('../tasks/query');
var sql = require('sql');

module.exports = function(finderID, stars, cb) {

  var sql = {
    text: 'UPDATE "tweets" SET "stars" = $1 WHERE "tweets"."twitter_id" = $2',
    values: [ stars, finderID ]
  };

  dbQuery(sql, function(err, data){
    if(err) return console.error(err);
    cb(null, data);
  });
}

// TEST ==============================

if(process.argv[1] === __filename) {

  module.exports('493141255871012864', 24, function(err, data) {
    if(err) return console.error(err);
    console.log(data.rowCount === 1);
    process.reallyExit();
  })
}
