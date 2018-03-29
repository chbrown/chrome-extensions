function initializeListeners() {
  let currentHref = null;
  const storeTargetHref = ev => {
    currentHref = ev.target.href;
  };
  const injectStoredHref = ev => {
    ev.target.href = currentHref;
  };
  addEventListener('mousedown', storeTargetHref, true);
  addEventListener('mousedown', injectStoredHref, false);
}

document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname.match(/\/search/)) {
    initializeListeners();
  }
});
