var env = require("dotenv").config();
var keys = require("./keys");
var Twitter = require("twitter");


switch(process.argv[2]) {
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
         getSpotify();
        break;
    default:
        // code block
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

