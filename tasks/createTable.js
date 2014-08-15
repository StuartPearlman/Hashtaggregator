
// This is our rake db:yolo. Don't do it. Unless you mean to.

// This prevents the file from being required.
if (module.parent) throw "HEY! You can't be doing this. I'm talking to you, Stu."

var sql = require('sql');
var tweetTable = require('./schema')

var tweets = sql.define({
  name: tweetTable.name,
  columns: tweetTable.columns
});

console.log(tweets.create().toQuery().text);
