'use strict';

var counter = 0;
var countByHost = {};

chrome.devtools.network.onRequestFinished.addListener(request => {

  const isJsonResponse = request.response && request.response.headers.some((header) => {
    return header.name.toLowerCase() == 'content-type' && header.value.includes('application/json');
  });
  if (!isJsonResponse) return;

  request.getContent((body) => {
    if (request.request && request.request.url) {
      let host = new URL(request.request.url).hostname;
      if (host in countByHost) {
        countByHost[host]++;
      } else {
        countByHost[host] = 1;
      }
      console.log('REQ', request);
      console.log(body);

      let ul = document.createElement('ul');
      for (const [host, count] of Object.entries(countByHost)) {
        let li = document.createElement('li');
        li.textContent = host + ': ' + count;
        ul.appendChild(li);
      }

      document.getElementById('info').innerHTML = '';
      document.getElementById('info').appendChild(ul);
    }
  });
});
