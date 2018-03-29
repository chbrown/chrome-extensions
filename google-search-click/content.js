/** See documentation in `../README.md` (https://git.io/vxwiJ) */

const trackingTokenRegExp = /[\?\&]utm_(source|medium|term|campaign|content|cid|reader)=[^&#]+/ig

function cleanUrl(url) {
  let cleanedUrl = url.replace(trackingTokenRegExp, '')
  // if we deleted the '?', leaving an '&', replace that with a '?'
  const querystringIndex = url.indexOf('?')
  if (cleanedUrl[querystringIndex] == '&') {
    cleanedUrl = cleanedUrl.slice(0, querystringIndex) + '?' + cleanedUrl.slice(querystringIndex + 1)
  }
  return cleanedUrl
}

function initializeListeners() {
  let currentUrl = null
  const storeTargetHref = ev => {
    const anchor = ev.target.closest('a')
    if (anchor) {
      anchor.removeAttribute('ping')
      if (anchor.href) {
        currentUrl = cleanUrl(anchor.href)
      }
    }
  }
  const injectStoredHref = ev => {
    const anchor = ev.target.closest('a')
    if (anchor) {
      if (currentUrl) {
        anchor.href = currentUrl
      }
    }
  }
  // because we're implicitly adding the event listener to the `window`,
  // the events' `currentTarget` will always be `window` (not useful)
  addEventListener('mousedown', storeTargetHref, true) // useCapture=true
  // Google does its click-interception somewhere between these
  addEventListener('mousedown', injectStoredHref, false) // useCapture=false (the default)
}

document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname.match(/\/search/)) {
    initializeListeners()
  }
})
