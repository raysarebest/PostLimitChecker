//Variable to hold time offset between midnight and last time blog was updated
var timeOffset = 0;
//Set up the click event for the button
document.addEventListener("DOMContentLoaded", function(){
  //Get the button and add the listener to update the post count
  document.getElementById("button").addEventListener("click", update);
});
//Function called each time the check button is clicked
function update(){
  var request = new XMLHttpRequest();
  request.onload = getTimeOffset;
  request.overrideMimeType("application/json; charset=utf8");
  request.open("GET", "http://api.tumblr.com/v2/blog/themanpagesoflife.tumblr.com/info?api_key=" + oauth, true);
  request.send();
}
function getTimeOffset(){
  //Turn the raw response into a valid object
  var data = JSON.parse(this.response);
  //Create a new Date and initialize it to midnight
  var midnight = new Date();
  midnight.setHours(0,0,0,0);
  //Convert tumblr's time into a JavaScript compatible one, and get how many milliseconds it's been since midnight
  var time = (data.response.blog.updated * 1000) - midnight.getTime();
  if (time < 0){
    timeOffset = 0;
  }
  else{
    timeOffset = time;
  }
  //Generate a new API request to get the user's posts
  var request = new XMLHttpRequest();
  request.onload = analyzePostData;
  request.overrideMimeType("application/json; charset=utf8");
}
function analyzePostData(){
  // body...
}