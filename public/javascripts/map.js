var MAP_IMAGE_LAYER_PATTERN = 'http://{s}.tiles.mapbox.com/v3/zpfled.j3937a4o/{z}/{x}/{y}.png';
var POPULAR = 75;
var circleRadius = 7;
var mapLayer;

var mapOptions = {
    center: [31.7127, -74.0059],
    zoom: 4,
    scrollWheelZoom: false,
    worldCopyJump: true
};
// def map
window.map = L.map('map', mapOptions);
// def colors
window.colors = {
    index: 0,
    darkCoolColors: ['#468', '#363', '#606'],
    lightCoolColors: ['#0cf', '#6f6', '#c3f'],
    darkCool: '#468',
    lightCool: '#0cf',
    darkWarm: '#f60',
    lightWarm: '#fa6'
}

window.searchArray = [];

function Tweet(tweet) {
    this.id = tweet.id;
    this.username = tweet.username;
    this.content = tweet.content;
    this.latitude = tweet.latitude;
    this.longitude = tweet.longitude;
    this.stars = tweet.stars;
}

function resetMap() {
    if (map) {
        map.remove();
    }
    window.map = L.map('map', mapOptions);
    mapLayer = L.tileLayer(MAP_IMAGE_LAYER_PATTERN, {
        maxZoom: 18,
        minZoom: 3,
    }).addTo(map);
    window.searchArray = [];
}


// not tested
function processTweet(tweetData) {
    tweet = new Tweet(tweetData);
    display(tweet);
    window.searchArray.push(tweet);
    return tweet;
}

// not tested
function display(tweet) {
    L.circleMarker([tweet.latitude, tweet.longitude], {
        radius: circleRadius,
        color: (tweet.stars > POPULAR ? window.colors.darkWarm : window.colors.darkCool),
        fillColor: (tweet.stars > POPULAR ? window.colors.lightWarm : window.colors.lightCool),
        fillOpacity: (tweet.stars > POPULAR ? .9 : .6)
    }).addTo(map)
        .bindPopup(formatTweet(tweet));
}

// tested
function formatTweet(tweet) {
    return "<p><a href='https://twitter.com/" + tweet.username + "'>@" + tweet.username + "</a> said: </p><p class='tweet-popup'>" + tweet.content + "</p><h4>Favorites and Retweets: " + (tweet.stars || "None") + "</h4>";
}

// not tested
$("#search-tweets-div").on("click", "a", function(event) {
    event.preventDefault();
    var path = event.currentTarget.pathname;
    console.log(path);
    // var last = path.length - 1
    // console.log(last)
    var params = path.slice(1);
    params = params.split(',');
    console.log(params)
    var paramsFloat = [];
    $.each(params, function( index, value) {
        paramsFloat.push(parseFloat(value));
    });
    console.log(paramsFloat);
    $('#search-results').hide();
    $('#map').focus();
    map.setView(new L.LatLng(params[1], params[0]), zoom = 18, animate = true);
});
