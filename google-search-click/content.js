function initializeListeners() {
  let currentHref = null;
  addEventListener('mousedown', ev => currentHref = ev.target.href, true);
  addEventListener('mousedown', ev => ev.target.href = currentHref, false);
}

document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname.match(/\/search/)) {
    initializeListeners();
  }
});
