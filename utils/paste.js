const { exec } = require('child_process');
const { clipboard } = require('electron');
const { logger } = require('./logger');

const PASTE_COMMAND = "osascript -e 'tell application \"System Events\" to keystroke \"v\" using command down'";

async function pasteText(text, options = {}) {
  const { autoPaste = true } = options;

  clipboard.writeText(text || '');
  logger('Clipboard updated');

  if (!autoPaste) {
    return;
  }

  exec(PASTE_COMMAND, (error) => {
    if (error) {
      logger(`Unable to simulate paste: ${error instanceof Error ? error.message : String(error)}`);
      return;
    }

    logger('Paste command executed');
  });
}

module.exports = {
  pasteText,
};
