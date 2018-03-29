// we have to insert the script as an element,
// since plain `window` points to the extension context
const script = document.createElement('script')
script.textContent = 'window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {}'
document.documentElement.appendChild(script)
script.parentNode.removeChild(script)
