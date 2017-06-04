/** for ← and →, `key` is the same as the `code`.
for number keys, the `code` is always 'Digit0', ..., 'Digit9', regardless of
shift status, but the value of `key` varies (e.g., between '(' and '9') */
const code_to_message = {
  BracketLeft:  'MOVE_LEFT',
  BracketRight: 'MOVE_RIGHT',
  Digit0:       'MOVE_FIRST',
  Digit9:       'MOVE_LAST',
};

document.addEventListener('keydown', e => {
  const {metaKey, ctrlKey, code} = e;
  const message = code_to_message[code];
  // Command + Control + [ or ] or 0 or 9
  if (metaKey && ctrlKey && message) {
    e.stopPropagation();
    e.preventDefault(); // presumably there is no default action
    chrome.extension.sendMessage(message);
  }
}, true);
