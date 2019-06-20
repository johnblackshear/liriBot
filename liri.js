require("dotenv").config('./*.env');
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var spotify = new spotify(keys.spotify);
var omdb = require('omdb');
var fs = require('fs');

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
    console.log("hey");
} else if (command === "do-what-it-says") {
    console.log();
}



 function getSpotify(userInput) {

    spotify.search({ type: 'track', query: userInput, limit: 5 }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                console.log("------INFO------")
                console.log("Artist: " + songData.artists[0].name);
                console.log("Song: " + songData.name);
                console.log("Preview URL: " + songData.preview_url);
                console.log("Album: " + songData.album.name);
                console.log("-------END------");
            }
       } else {
                console.log("An error has occurred. Please try again.");
            }
        })
    }

    function concertThis(artist){
        if(userInput === undefined){
           userInput = "chicago";
        }
        var artist = userInput;
        
    for (var i = 4; i < inputString.length; i++) {

       artist  += "+" + inputString[i];
   }
   var request = require('request');
   request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body){
       console.log("error: ", error);
       console.log('statusCode: ', response && response.statusCode);
       var jsonResponse = JSON.parse(body)[0];
       console.log("------INFO------")
       console.log("Artist: " + jsonResponse.lineup);
       console.log("Venue: " + jsonResponse.venue.name);
       console.log("Location: " + jsonResponse.venue.city + ",", jsonResponse.venue.region + ",",  jsonResponse.venue.country );
       console.log("Date: " + moment(jsonResponse.datetime).format('MMMM Do YYYY, h:mm:ss a'));
   });
}



var movieThis = function(movieName){
    if (movieName === undefined) {
        movieName = "Mr. Nobody";
      }


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
    console.log("------INFO------")
    console.log("Title: " + jsonResponse.Title);
    console.log("Year: " + jsonResponse.Year);
    console.log("Rating: " + jsonResponse.Rated);
    console.log("Countries produced in: " + jsonResponse.Country);
    console.log("Languages: " + jsonResponse.Language);
    console.log("Plot: " + jsonResponse.Plot);
    console.log("Actors: " + jsonResponse.Actors);
    console.log("------END------");
    
});
}

var choice = function(caseDate, functionData){
    switch(caseDate){
        case 'movie-this':
            movieThis(functionData);
            break;

        case 'spotify-this-song':
            getSpotify(functionData);
            break;
        case 'concert-this':
            concertThis(functionData);
            break;
       case 'do-what-it-says':
            doWhatItSays(functionData);
            break;
    }


}

var doWhatItSays = function(){
    fs.readFile('random.txt', 'utf8', function(error, data){
        if (error) throw error;
        console.log(data);
        var splitdata = data.split(",");
        if (splitdata.length == 2){
            choice(splitdata[0], splitdata[1]);
        }
      });
}

var runThis = function(argOne, argTwo){
    choice(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);


