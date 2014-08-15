var express = require('express');
var path = require('path');
var port = process.env.PORT || 3888;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');
var routes = require('./routes/index');
var messenger = require('./messenger');
// Custom Query Functions
var streamTweetsToClient = require('./tasks/streamTweetsToClient');
var getAllTweetsFromDB = require('./tasks/getAllTweetsFromDB');
var getNewTweets = require('./tasks/getNewTweets');
var getLastTweetID = require('./tasks/getLastTweetID');
var filterByHashtag = require('./tasks/filterByHashtag')
// constants and vars
var TWEET_SENDING_DELAY = 10;
var initialTweets = [];
var tweetsToSend = [];

// SET DEFAULT HASHTAG =================================================
var DEFAULT_HASHTAG = require('./stream/hashtag')
var hashtag = DEFAULT_HASHTAG;

// run stream
var stream = require('./stream/twitterStreamToDatabase')();

var app = new express()
,   http = require('http')
,   server = http.createServer(app)
,   io = require('socket.io').listen(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

// Server

// heroku starts the file

// listen for connections from clients
io.sockets.on('connection', function(client) {
    hashtag = DEFAULT_HASHTAG;
    var lastTweetID = 0;
    console.log('client connected...');

    // on connection, get all tweets from db
    // getAllTweetsFromDB(null, function(err, results) {
        // if(err) return console.error(err);
        // console.log('getting all tweets from db...');
        // initialTweets = results;
        // filterByHashtag(hashtag, results, function(err, filteredResults) {
            // initialTweets = filteredResults;
        // })
    // });

    getLastTweetID(function(err, id) {
        if (err) return console.error(err);
        lastTweetID = id;
    });

    // on 'ready', serve all the tweets from the db
    client.on('ready', function() {
        console.log('client ready...');
        // stream initial tweets to client
        // streamTweetsToClient(initialTweets, client, TWEET_SENDING_DELAY);
    });

    // periodically check db for new tweets
    client.on('moarTweets', function(id) {
        getNewTweets(null, lastTweetID, function(err, newTweets) {
            if(err) return console.error(err);

            // send filtered tweets to view
            filterByHashtag(hashtag, newTweets, function(err, filteredResults) {
                filteredResults.forEach(function(tweet) {
                    client.emit('sendTweets', tweet);
                });
            });

            // update lastTweetID
            getLastTweetID(function(err, id) {
                if (err) return console.error(err);
                lastTweetID = id;
                client.emit('lastTweet', lastTweetID);
            });
        });
    });

    client.on('newStream', function(newHashtag) {
        client.emit('changeColor');
        messenger.emit('destroy');

        console.log(newHashtag === '');
        hashtag = (newHashtag === '' ? require('./stream/hashtag') : newHashtag);
        if (hashtag[0] === '#') {
            stream = require('./stream/twitterStreamToDatabase')(hashtag);
        } else {
            stream = require('./stream/twitterStreamToDatabase')('#' + hashtag);
        }

        getAllTweetsFromDB(null, function(err, results) {
            if(err) return console.error(err);
            console.log('getting all tweets from db...')
            filterByHashtag(hashtag, results, function(err, filteredResults) {
                initialTweets = filteredResults;
                streamTweetsToClient(initialTweets, client, TWEET_SENDING_DELAY);
            })
        })
    })
})


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

server.listen(port);
