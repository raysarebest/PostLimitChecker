//Set up the click event for the button
document.addEventListener("DOMContentLoaded", function(){
  //Get the button and add the listener to update the post count
  document.getElementById("button").addEventListener("click", update);
});
//Function called each time the check button is clicked
function update(){
  //Figure out how many posts the user has made today
  getPostsToday(function(count){
    //...and subtract that from 250 (post limit), and display it
    document.getElementById("count").innerHTML = 250 - count;
  });
}
//Function for a lot of the payload logic
function getPostsToday(input){
  //Set up the function on first call
  if(typeof input === "function"){
    //When input is a function, it will be the first time the function will have been called, so there's guaranteed to be no first post found yet
    getPostsToday.found = false;
    //Store the input to call when we're really done
    getPostsToday.callback = input;
    //Initialize an array static variable to hold all the posts
    getPostsToday.posts = [];
    //Initialize the search offset to 0, so we're starting with the most recent
    getPostsToday.searchOffset = 0;
  }
  //If it's an object returned by tumblr's API, then we need to analyze it
  else if(typeof input === "object"){
    //Figure out when midnight today is
    var midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    //Serialize the response into a JavaScript object
    var data = JSON.parse(this.response);
    for(var i = 0; i < data.response.posts.length; i++){
      //Check if the post was posted today
      if((data.response.posts[i].timestamp * 1000) >= midnight.getTime()){
        //If it was, append it to the array storing such posts
        getPostsToday.posts.push(data.response.posts[i]);
      }
      else{
        //Otherwise, say we've found our limit
        getPostsToday.found = true;
      }
    }
    //Increment the offset by the number of posts in this call, for the next call
    getPostsToday.searchOffset += data.response.posts.length;
  }
  //We only want to continue if the first post hasn't been found yet
  if(!getPostsToday.found){
    //Create an API call to tumblr to get post data
    var request = new XMLHttpRequest();
    //Set the callback to recursively call this function
    request.onload = getPostsToday;
    //Make sure tumblr recognizes the MIME
    request.overrideMimeType("application/json; charset=utf8");
    //Start the interaction with tumblr's servers, and make it asynchronous
    request.open("GET", "http://api.tumblr.com/v2/blog/themanpagesoflife.tumblr.com/posts?api_key=" + oauth + "&offset=" + getPostsToday.searchOffset.toString(), true);
    //Ask for the API data
    request.send();
  }
  //If the most recent post has been found...
  else{
    //Call the callback function, and tell it how many posts there were today
    getPostsToday.callback(getPostsToday.posts.length);
  }
}