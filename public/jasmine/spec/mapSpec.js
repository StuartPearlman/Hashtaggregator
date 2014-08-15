describe ("map.js", function() {
  var tweet, tweetishObject;

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = './spec/fixtures';
    tweetishObject = {
      id: 1,
      username: "bob",
      content: "tweet tweet said the bobolink",
      longitude: 72.45,
      latitude: 54.34,
      twitter_id: "9048750982374098234",
      location: "Chicago, IL",
      stars: 1
    };
  });

  describe ('function formatTweet(tweet)', function() {
    it ('returns a formatted popup', function() {
      expect(formatTweet(tweetishObject)).toEqual("<a href='https://twitter.com/bob'>@bob</a> said: <p class='tweet-popup'>tweet tweet said the bobolink</p><h4>Favorites and Retweets: 1</h4>");
    })
  })

  // describe ('function processTweet(tweet)', function() {
  //   it('returns a Tweet', function() {
  //     expect(processTweet(tweetishObject) instanceof Tweet).toBe(true);
  //   });
  // });



  // describe ('function display(tweet)', function() {
  //   it ('creates a circleMarker', function() {
  //     loadFixtures('map.html');
  //     MAP_IMAGE_LAYER_PATTERN = 'http://{s}.tiles.mapbox.com/v3/mvhls.j254m1nf/{z}/{x}/{y}.png';
  //     map = L.map('map', {
  //           center: [41.84, -87.65],
  //           zoom: 5,
  //           scrollWheelZoom: true
  //           // zoomControl: false
  //       });
  //     console.log(map)

  //     L.tileLayer(MAP_IMAGE_LAYER_PATTERN, {
  //         maxZoom: 18,
  //     }).addTo(map);

  //     var tweet = processTweet(tweetishObject);
  //     console.log(tweet)
  //     console.log(L.circleMarker)
  //     spyOn(L, 'circleMarker');
  //     display(tweet);
  //     // expect('g').toBeVisible();
  //   })
  // })
});
