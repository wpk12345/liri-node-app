//Require variables of files and packages
console.log('the bot is starting');
var request = require('request');
var fs = require("fs");
var Twit = require('twit');
var twitterKeys = require("./keys.js");
var T = new Twit(twitterKeys);
var action = process.argv[2];
var params = {
    count: 20,
    screen_name: 'wpk543210'
  };

switch (action) {
  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    spotify();
    break;
//see instructions for process.argv[3]
  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doWhat();
    break;
}
//============================================Twitter Function====================================================================

function tweet(){
    
    T.get('statuses/user_timeline', params , function(err, data) {
      for (var i = 0; i < data.length ; i++) {
        console.log(data[i].text);
      }
  })
    };
//============================================Spotify Function====================================================================

    function spotify() {}
    




  


