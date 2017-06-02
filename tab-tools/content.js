/** for ← and →, `key` is the same as the `code`.
for number keys, the `code` is always 'Digit1', ..., 'Digit9', regardless of
shift status, but the value of `key` varies (e.g., between '(' and '9') */
const code_to_message = {
  ArrowLeft:  'MOVE_LEFT',
  ArrowRight: 'MOVE_RIGHT',
  Digit1:     'MOVE_FIRST',
  Digit9:     'MOVE_LAST',
};

document.addEventListener('keydown', e => {
  const {shiftKey, metaKey, code} = e;
  const message = code_to_message[code];
  // Shift + Command + ← or → or 1 or 9
  if (shiftKey && metaKey && message) {
    e.stopPropagation();
    e.preventDefault(); // presumably there is no default action
    chrome.extension.sendMessage(message);
  }
}, true);
