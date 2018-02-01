var env = require("dotenv").config();
var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");


switch(process.argv[2]) {
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
        getSpotify(process.argv[3]);
        break;
    default:
        // code block
}

function getSpotify(song){

	song = song ? song : "The Sign";
	
	var spotify = new Spotify(keys.spotify);

	spotify.search(
		{ 
			type: 'track', 
			query: song
		}, function(err, data) {
	  			if (err) {
	    			return console.log('Error occurred: ' + err);
	 			 }
				var dataArr = data.tracks.items; 

				dataArr.forEach(function(element, index){
					console.log("Song name : " + element.name);
					console.log("Artists : " + JSON.stringify(element.artists[0].name));
					console.log("Preview URL : " + element.preview_url);
					console.log("Album : " + element.album.name);
					console.log("-----------------------------------");
				});
	});
}


function getTweets(){

	var client = new Twitter(keys.twitter);
 
	var params = {
			screen_name: 'ashaaweb'
		};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			tweets.forEach( function(element, index) {
				console.log( index+1 + ") You Tweeted - " + element.text);
				console.log("Date : " + element.created_at);
				console.log("-----------------------------------");
			});
		}
		else{
			console.log(error);
		}
	});

}

