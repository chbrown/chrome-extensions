## Tab Tools

Roughly inspired by / loosed based on / vaguely forked from
[Keyboard Shortcuts to Reorder Tabs](https://chrome.google.com/webstore/detail/moigagbiaanpboaflikhdhgdfiifdodd).
Thanks, [Greg Bullock](http://bonstio.net/)!

| Short  | Long                          | Result                   |
|:-------|:------------------------------|:-------------------------|
| ⌘ ⇧ ← | Command + Shift + Left Arrow  | Move tab left             |
| ⌘ ⇧ → | Command + Shift + Right Arrow | Move tab right            |
| ⌘ ⇧ 1 | Command + Shift + Digit 1     | Move tab to the far left  |
| ⌘ ⇧ 9 | Command + Shift + Digit 9     | Move tab to the far right |


## Overview

* `content.js` gets loaded on each web page; it listens for `keydown` events on the document with `useCapture=true`,
  but only intercepts and handles the combinations listed above.
  Content scripts don't have sufficient privileges to manipulate tabs,
  so `content.js` calls `chrome.extension.sendMessage(...)` so that `background.js` can handle it from here.
* `background.js` is an event page, since `"persistent": false` in the `manifest.json`, and listens for extension messages.
  The `chrome.extension.onMessage.addListener(...)` call sets up a listener for messages from `content.js`,
  maps the message value to a function, and calls it with the current tab.
  Unlike content scripts, background scripts have access to `chrome.tabs`, which is required for the tab manipulation.


### Reference

* https://developer.chrome.com/extensions/tabs
* https://developer.chrome.com/extensions/event_pages
* https://developer.chrome.com/extensions/content_scripts
