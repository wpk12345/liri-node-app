//'Require' variables of files and packages
var request = require('request');
var fs = require("fs");
var twitterKeys = require("./keys.js");
var Twit = require('twit');
var Spotify = require('node-spotify-api');
//playing around with constructor functions
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
        // var Spotify = require('node-spotify-api');
        
       var spotify = new Spotify({
         id: '102d288e13734766b30efb0caf0c7eb9',
         secret: 'c15786f446024e2a9c8e606ba002781b'
       });
   //need to do a for loop for process.argv if name has more than one word
   // Grab all of the command line arguments from Node.
       var nodeArg = process.argv;
       var queryArray = [];
   // for loop that pushes all the process.argv's into an array for the query
       for (var i = 3; i < nodeArg.length; i++) {
        
          // We then "push" (add) each of these strings to our queryArray.
          queryArray.push(nodeArg[i]);      
        }
       spotify.search({ type: 'track', query: queryArray, limit: 1 }, function(err, data) {
         if (err) {
          spotify
          .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
          .then(function(data) {
          console.log('Artist: ' + data.album.artists[0].name); 
          console.log('Song Name: ' + data.name); 
          console.log("Preview Link of Song: " + data.preview_url); 
          console.log("Album Name: " + data.album.name); 

           
          })
          .catch(function(err) {
            console.error('Error occurred: ' + err); 
          });
         }
        //returning the 'artist', 'name of song', 'a preview link' and 'album name'
        console.log('Artist: ' + data.tracks.items[0].album.artists[0].name); 
        console.log('Song Name: ' + data.tracks.items[0].name); 
        console.log("Preview Link of Song: " + data.tracks.items[0].preview_url);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        
       })

    };
