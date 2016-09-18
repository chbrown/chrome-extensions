/*globals chrome */
const trackingTokenRegExp = /[\?\&]utm_(source|medium|term|campaign|content|cid|reader)=[^&#]+/ig;

/**
@param {number} tabId - Something like `2160`
@param {object} changeInfo - an object with fields like `status` and `url`
@param {Tab} tab - a full 'Tab' object
*/
function onUpdated(tabId, changeInfo, tab) {
  const querystringIndex = tab.url.indexOf('?');
  // if there's no querystring, there's nothing to do
  if (querystringIndex > -1) {
    let url = tab.url.replace(trackingTokenRegExp, '');
    // if that replacement resulted in a different url, set the new url
    if (url != tab.url) {
      // but first, if we deleted the '?', leaving an '&', replace that with a '?'
      if (url[querystringIndex] == '&') {
        url = url.slice(0, querystringIndex) + '?' + url.slice(querystringIndex + 1);
      }
      chrome.tabs.update(tabId, {url});
    }
  }
}
chrome.tabs.onUpdated.addListener(onUpdated);
