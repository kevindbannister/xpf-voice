const { exec } = require('child_process');
const { clipboard } = require('electron');
const { logger } = require('../../utils/logger');

const COPY_COMMAND = "osascript -e 'tell application \"System Events\" to keystroke \"c\" using command down'";
const COPY_DELAY_MS = 120;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function runCopyCommand() {
  return new Promise((resolve) => {
    exec(COPY_COMMAND, (error) => {
      if (error) {
        logger(`Unable to simulate copy: ${error instanceof Error ? error.message : String(error)}`);
      }

      resolve();
    });
  });
}

async function captureSelectedText() {
  logger('Capturing selected text');

  await runCopyCommand();
  await wait(COPY_DELAY_MS);

  const selectedText = clipboard.readText();

  if (!selectedText) {
    logger('No selected text detected');
    return null;
  }

  logger(`Selected text captured (length: ${selectedText.length})`);
  return selectedText;
}

module.exports = {
  captureSelectedText,
};
