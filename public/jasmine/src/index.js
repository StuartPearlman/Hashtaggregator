require('app')

db.load("./models", function (err) {
  var Tweet = db.models.tweet;
}

module.exports = Tweet;
