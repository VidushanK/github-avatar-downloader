// used process.argv[2] for first argument and process.argv[3] for the 2nd argument
var repoName = process.argv[2];
var repoOwner = process.argv[3];
var request = require('request');
var fs = require('fs');
// console log a welcome string
console.log('Welcome to the GitHub Avatar Downloader!');
// username and token for github api
var GITHUB_USER = "VidushanK";
// token stored in a enviornment, can check the token by using echo $GITHUB_ACCESS_TOKEN
var GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
// function that will get the contributors, also requestoptions has the url and headers; headers must include a user-agent as github requires it
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestOptions = {
    url: requestURL,
    headers: {
      'User-Agent' : 'VidushanK'
    }
  };
// request options and parse the body and output the avatar_url and invoke DownloadImageByURL function to create the images
  request.get(requestOptions,function(err, result, body){

    if (!err && result.statusCode === 200) {
      var parsedData = JSON.parse(body);
      parsedData.forEach(function (releaseObject) {
        var dir = "./avatars/"
        var loginFileName = dir + releaseObject.login + ".jpg";
        console.log(releaseObject.avatar_url);
        downloadImageByURL(releaseObject.avatar_url, loginFileName);
      });
    }
  });

}

// writestream according to paramaters
function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));
}
// check too see if the user passes any arguments
if (repoOwner === undefined || repoName === undefined){
  console.log("Program Terminated! Pass in 2 arguments!");
}
else {
  getRepoContributors(repoName, repoOwner, function(err, result) {
      console.log("Errors:", err);
      console.log("Result:", result);
  });
}




