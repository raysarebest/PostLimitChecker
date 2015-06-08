//Run this every time the extension is installed/upgraded
chrome.runtime.onInstalled.addListener(function(){
  //Clear any previous rules generated by this extension
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
    //Add a new rule to load the extension
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: "tumblr.com"}
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
//Function to get the post data from tumblr
function getPostData(callback){
  callback();
}