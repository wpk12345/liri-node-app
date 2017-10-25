//'Require' variables of files and packages
console.log('the bot is starting');
var request = require('request');
var fs = require("fs");
var twitterKeys = require("./keys.js");
var Twit = require('twit');
var Spotify = require('node-spotify-api');
var T = new Twit(twitterKeys);
//assigning argv[2] to the function action for our switch/case method
var action = process.argv[2];
//creating a parameter object for the 'twit' get function.
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
      console.log('Tweet: ' + data[i].text);
        console.log('Tweet created at: ' + data[i].created_at);
      }
  });
};
//============================================Spotify Function====================================================================

    function spotify() {
        var Spotify = require('node-spotify-api');
        
       var spotify = new Spotify({
         id: '102d288e13734766b30efb0caf0c7eb9',
         secret: 'c15786f446024e2a9c8e606ba002781b'
       });
        
       spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
         if (err) {
           return console.log('Error occurred: ' + err);
         }
        
       console.log(data); 
       })

    };
