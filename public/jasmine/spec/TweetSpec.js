describe("Tweet", function() {
  var tweet;

  beforeEach(function() {
    tweet = new Tweet({
      id: 1,
      username: "bob",
      content: "tweet tweet said the bobolink",
      longitude: 72.45,
      latitude: 54.34,
      twitter_id: "9048750982374098234",
      location: "Chicago, IL",
      stars: 1
    });
  });

  it("is a Tweet", function() {
    console.log(tweet.created_at)
    expect(tweet instanceof Tweet).toBe(true);
  });

  it("should store the correct information", function() {
    expect(tweet.username).toBe("bob");
    expect(tweet.content).toBe("tweet tweet said the bobolink");
  });
});
