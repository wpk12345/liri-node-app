//'Require' variables of files and packages
var request = require('request');
var fs = require("fs");
var twitterKeys = require("./keys.js");
var Twit = require('twit');
var Spotify = require('node-spotify-api');
var imdb = require('imdb-api');
//playing around with constructor functions
//assigning argv[2] to the function action for our switch/case method
var action = process.argv[2];
//creating a parameter object for the 'twit' get function.

switch (action) {
  case "my-tweets":
    tweet();
    break;

  case "spotify-this-song":
    spotify();
    break;
//see instructions for process.argv[3]
  case "movie-this":
    movieFunction();
    break;

  case "do-what-it-says":
    doWhat();
    break;
}
//============================================Twitter Function====================================================================

function tweet(){

  var T = new Twit(twitterKeys);
  
  var params = {
    count: 20,
    screen_name: 'wpk543210'
  };

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
        //default query if api returns no song
        if (err) {
          spotify
          .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
          .then(function(data) {
            console.log('===============================================================================================');            
          console.log('Artist: ' + data.album.artists[0].name); 
          console.log('===============================================================================================');          
          console.log('Song Name: ' + data.name); 
          console.log('===============================================================================================');          
          console.log("Preview Link of Song: " + data.preview_url); 
          console.log('===============================================================================================');          
          console.log("Album Name: " + data.album.name);
          console.log('===============================================================================================');          
          })
          .catch(function(err) {
            console.error('Error occurred: ' + err); 
          });
         }
        //returning the 'artist', 'name of song', 'a preview link' and 'album name'
        console.log('===============================================================================================');        
        console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
        console.log('===============================================================================================');        
        console.log('Song Name: ' + data.tracks.items[0].name);
        console.log('===============================================================================================');        
        console.log("Preview Link of Song: " + data.tracks.items[0].preview_url);
        console.log('===============================================================================================');        
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log('===============================================================================================');        
       });
    };
//============================================OMDB Function====================================================================
function movieFunction() {
//same thing as spotify.  we want to create a var that we can pass multiple arguments into
 var nodeArg = process.argv;
 var queryArray = [];
//for loop that pushes all the process.argv's into an array for the query
  for (var i = 3; i < nodeArg.length; i++) {
     // We then "push" (add) each of these strings to our queryArray.
     queryArray.push(nodeArg[i]); 
    //using the .join method to remove the commas in the array and concatonate
     var concatArray = (queryArray.join(' '));     
   };
imdb.get(concatArray, {apiKey: '40e9cece'}, function(err, data) {
    if (err) {
      imdb.get('Mr. Nobody', {apiKey: '40e9cece', timeout: 30})
  .then(function(data){

  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
    }
    console.log('===============================================================================================');
    // * Title of the movie.
    console.log('Movie Title: ' + data.title);
    console.log('===============================================================================================');    
    // * Year the movie came out.
    console.log('Year: ' + data.year); 
    console.log('===============================================================================================');    
    // * IMDB Rating of the movie.
    console.log('IMDB Rating: ' + data.ratings[0].Value);   
    console.log('===============================================================================================');    
    // * Rotten Tomatoes Rating of the movie.
    console.log('Rotton Tomatoes Rating: ' + data.ratings[1].Value);  
    console.log('===============================================================================================');    
    // * Country where the movie was produced.
    console.log('Country: ' + data.country);
    console.log('===============================================================================================');    
    // * Language of the movie.
    console.log('Language: ' + data.languages);
    console.log('===============================================================================================');    
    // * Plot of the movie.
    console.log('Movie Plot: ' + data.plot);
    console.log('===============================================================================================');    
    // * Actors in the movie.
    console.log('Actors: ' + data.actors);
    console.log('===============================================================================================');    
});
};