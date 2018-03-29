/** get list of tabs in the same window that are pinned (if `tab` is)
or not pinned (if `tab` isn't) */
function similarTabs(tab, callback) {
  const {pinned, windowId} = tab;
  chrome.tabs.query({pinned, windowId}, callback);
}

/** content.js listens for specific keydown events and converts the
KeyboardEvent#code into a message string, which should match one of the
keys in messageActions: */
const messageActions = {
  MOVE_LEFT(tab) {
    chrome.tabs.move(tab.id, {index: tab.index - 1});
  },
  MOVE_RIGHT(tab) {
    chrome.tabs.move(tab.id, {index: tab.index + 1});
  },
  MOVE_FIRST(tab) {
    similarTabs(tab, tabs => {
      const first_tab = tabs[0];
      chrome.tabs.move(tab.id, {index: first_tab.index});
    });
  },
  MOVE_LAST(tab) {
    // except for pinned tabs, we could just do:
    // chrome.tabs.move(sender.tab.id, {index: -1});
    similarTabs(tab, tabs => {
      const last_tab = tabs[tabs.length - 1];
      chrome.tabs.move(tab.id, {index: last_tab.index});
    });
  },
};

function failAction() {
  throw new Error('Unrecognized message received by tab-tools background script');
}

chrome.extension.onMessage.addListener((message, sender) => {
  const action = messageActions[message] || failAction;
  action(sender.tab);
});
