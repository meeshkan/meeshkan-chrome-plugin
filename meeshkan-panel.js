counter = 0;

chrome.devtools.network.onRequestFinished.addListener(request => {
  request.getContent((body) => {
    if (request.request && request.request.url) {
      console.log(body);
      document.getElementById('info').textContent = counter++;
 
      //if (request.request.url.includes('<url-to-intercept>')) {
        //chrome.runtime.sendMessage({
            //response: body
        //});
      //}
    }
  });
});
