require("dotenv").config('./*.env');
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var spotify = new spotify(keys.spotify);
var omdb = require('omdb');



// Spotify retrieval
var getSpotify = function(songName) {
    spotify.search({ type: 'track', query: '' }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data.tracks);
    });
}
getSpotify();





var movieThis = function(movieName){


// Store all of the arguments in an array
var nodeArgs = inputString;

// Create an empty variable for holding the movie name
var movieName = userInput;

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 4; i < nodeArgs.length; i++) {

     movieName += "+" + nodeArgs[i];
}


    var request = require('request');
    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var jsonResponse = JSON.parse(body);
    console.log("Title: " + jsonResponse.Title);
    console.log("Year: " + jsonResponse.Year);
    console.log("Rating: " + jsonResponse.Rated);
    console.log("Countries produced in: " + jsonResponse.Country);
    console.log("Languages: " + jsonResponse.Language);
    console.log("Plot: " + jsonResponse.Plot);
    console.log("Actors: " + jsonResponse.Actors);
    console.log();
    
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
        case 'concert-this':
            concertThis(functionData);
        case 'spotify-this-song':
            spotifysong(functionData);
        case 'do-what-it-says':
            doWhatItSays(functionData);
    }


}

var runThis = function(argOne, argTwo){
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);


