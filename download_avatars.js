// GET /repos/:owner/:repo/contributors?only=avatar_url
var request = require('request');
var fs = require('fs');
// const location  ='/repos/:owner/:repo/contributors?only=avatar_url';
console.log('Welcome to the GitHub Avatar Downloader!');
var GITHUB_USER = "VidushanK";
var GITHUB_TOKEN = "861736a4838238cbbb97a15c69c07427a026022d";
// request.get('https://VidushanF:861736a4838238cbbb97a15c69c07427a026022d@api.github.com/repos/jquery/jquery/contributors');
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var requestOptions = {
  url: requestURL,
  headers: {
    'User-Agent' : 'VidushanK'
  }
  };
  request.get(requestOptions, function(err, result, body){

    if (!err && result.statusCode === 200) {
    const parsedData = JSON.parse(body);
    parsedData.forEach(function (releaseObject) {
      console.log(releaseObject.avatar_url);
    });
    }
  });

}
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

