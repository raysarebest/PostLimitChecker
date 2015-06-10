//Variable to hold the total number of posts in this user's blog
var totalPosts = 0;
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
    var data = JSON.parse(this.response);
    //Create a new Date and initialize it to midnight
    var midnight = new Date();
    midnight.setHours(0,0,0,0);
    //Convert tumblr's time into a JavaScript compatible one, and get how many milliseconds it's been since midnight
    var getTimeOffset = function(milliseconds){
      return (milliseconds * 1000) - midnight.getTime();
    }
    //Keep track of the total number of the user's posts
    var totalPosts = data.response.blog.posts;
    //Generate a new API request to get the user's posts
    var request = new XMLHttpRequest();
    request.onload = function(){
      //Convert the response to a valid object
      var data = JSON.parse(this.response);
      console.log(data);
    };
    request.overrideMimeType("application/json; charset=utf8");
    request.open("GET", "http://api.tumblr.com/v2/blog/themanpagesoflife.tumblr.com/posts?api_key=" + oauth + "&limit=250", true);
    request.send();
  };
  request.overrideMimeType("application/json; charset=utf8");
  request.open("GET", "http://api.tumblr.com/v2/blog/themanpagesoflife.tumblr.com/info?api_key=" + oauth, true);
  request.send();
}