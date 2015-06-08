//Set up the click event for the button
document.addEventListener("DOMContentLoaded", function(){
  //Get the button and add the listener
  document.getElementById("button").addEventListener("click", update);
});
function update(){
  document.getElementById("count").textContent = "0";
}