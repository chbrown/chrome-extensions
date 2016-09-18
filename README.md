## Google Chrome Extensions

On OS X, Chrome stores its extensions at:

    ~/Library/"Application Support"/Google/Chrome/Default/Extensions

The folders in that directory correspond to the IDs listed at [`chrome://extensions`](chrome://extensions/)


## google-search-click

**Google Search Click Protection**

This Chrome extension prevents Google from intercepting clicks on search result links and rewriting the `href` attribute contents.

It works by adding two event listeners for the same event that Google listens to, `mousedown`.

1. The first event listener is attached at the beginning of the listener stack by using `useCapture=true`, and saves the current anchor href to a local variable.
2. The second event listener is attached to the end of the listener stack by using `useCapture=false`, and restores the href from the local variable.

It uses the same strategy as the GreaseMonkey plugin [searchlinkfix](https://github.com/palant/searchlinkfix/blob/master/lib/content.js), but is much simpler since it only targets Google.


## react-developer-tools-spoof

React.js is great but their non-production library's incessant "Download this extra clunky thing that you don't need" log entry is annoying. This disables that 'better development experience' (LOL) warning, by pretending that you have their extension installed.


## url-cleaner

**URL cleaner**

Based on [chrome-utm-stripper](https://github.com/jparise/chrome-utm-stripper).

It's a background script that listens for tab [update events](https://developer.chrome.com/extensions/tabs#event-onUpdated) and removes common `utm_*` key-value pairs from the querystring.
(`utm_*` is what Google Analytics names its various Urchin Tracking Module (UTM) tokens.)

The Google Analytics query string parameters are documented [here](https://support.google.com/analytics/answer/1033867).


## License

Copyright 2015-2016 Christopher Brown. [MIT Licensed](https://chbrown.github.io/licenses/MIT/#2015-2016).
