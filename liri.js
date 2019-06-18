require("dotenv").config('./*.env');
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var spotify = new spotify(keys.spotify);
var movieName = process.argv[3];
var omdb = require('omdb');



// Spotify retrieval
var getSpotify = function(songName) {
    spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data.tracks);
    });
}
getSpotify();

// OMDB retrieval
/*var getMovie = function(movieName) {
    // OMDB request
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    });
}*/

/*function movieThis(){
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(function(movieResponse){
    console.log("Title: " + movieResponse.data.Title);
        }
    );
  };*/

var movieThis = function(movieName){

    var request = require('request');
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});
}


// takes in all of the command line arguments
var inputString = process.argv;
// captures the operator and gives command
var command = inputString[2];
// input being used for data-retrieval
var userInput = inputString[3];

if (command === "concert-this") {
    console.log();
} else if (command === "spotify-this-song") {
    console.log();
} else if (command === "movie-this") {
    console.log();
} else if (command === "do-what-it-says") {
    console.log();
}

var pick = function(caseDate, functionData){
    switch(caseDate){
        case 'movie-this':
            movieThis(functionData);
    default:
        console.log("Liri is uninformed");
    }
}

var runThis = function(argOne, argTwo){
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);


