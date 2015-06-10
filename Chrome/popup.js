//Set up the click event for the button
document.addEventListener("DOMContentLoaded", function(){
  //Get the button and add the listener to update the post count
  document.getElementById("button").addEventListener("click", update);
});
//Function called each time the check button is clicked
function update(){
  var request = new XMLHttpRequest();
  request.onload = analyzeTumblrData;
  request.open("GET", "http://example.com", true);
  request.send();
}
function analyzeTumblrData(){
  console.log(this.responseText);
}