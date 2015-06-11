//Variable to hold the total number of posts in this user's blog
var postsToday = [];
//Set up the click event for the button
document.addEventListener("DOMContentLoaded", function(){
  //Get the button and add the listener to update the post count
  document.getElementById("button").addEventListener("click", update);
});
//Function called each time the check button is clicked
function update(){
  var request = new XMLHttpRequest();
  request.onload = function(){
    //Turn the raw response into a valid object
    var blogData = JSON.parse(this.response);
    //Create a new Date and initialize it to midnight
    var midnight = new Date();
    midnight.setHours(0,0,0,0);
    //Convert tumblr's time into a JavaScript compatible one, and get how many milliseconds it's been since midnight
    var getTimeOffset = function(milliseconds){
      return (milliseconds * 1000) - midnight.getTime();
    }
    //Keep track of the total number of the user's posts
    var totalPosts = blogData.response.blog.posts;
    //Generate a new API request to get the user's posts
    var request = new XMLHttpRequest();
    request.onload = function(){
      //Convert the response to a valid object
      var postData = JSON.parse(this.response);
      console.log(postData);
      getPostsToday(function(){});
    };
    request.overrideMimeType("application/json; charset=utf8");
    request.open("GET", "http://api.tumblr.com/v2/blog/themanpagesoflife.tumblr.com/posts?api_key=" + oauth , true);
    request.send();
  };
  request.overrideMimeType("application/json; charset=utf8");
  request.open("GET", "http://api.tumblr.com/v2/blog/themanpagesoflife.tumblr.com/info?api_key=" + oauth, true);
  request.send();
}
//Function for a lot of the payload logic
function getPostsToday(input){
  //Set up the function on first call
  if(typeof input === "function"){
    //When input is a function, it will be the first time the function will have been called, so there's guaranteed to be no first post found yet
    getPostsToday.found = false;
    //Store the input to call when we're really done
    getPostsToday.callback = input;
  }
  //If it's an object returned by tumblr's API, then we need to analyze it
  else if(typeof input == "object"){
    var data = JSON.parse(input);
  }
  //We only want to continue if the first post hasn't been found yet
  if(!getPostsToday.found){
    //Figure out when midnight today is
    getPostsToday.midnight = new Date();
    getPostsToday.midnight.setHours(0, 0, 0, 0);
    var request = new XMLHttpRequest();
    request.onload = getPostsToday;
    request.overrideMimeType("application/json; charset=utf8");
    request.open("GET", "http://api.tumblr.com/v2/blog/themanpagesoflife.tumblr.com/posts?api_key=" + oauth, true);
    request.send();
  }
}