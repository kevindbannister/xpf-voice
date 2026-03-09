const recorder = require('./recorder');
const voiceState = require('./voiceState');
const { createIndicatorWindow } = require('./indicator');
const { captureSelectedText } = require('./selectionCapture');
const { logger } = require('../../utils/logger');

const MAX_SELECTED_TEXT_LENGTH = 5000;
let currentSelectionText = '';

async function start() {
  createIndicatorWindow();

  try {
    const capturedText = await captureSelectedText();

    if (capturedText) {
      if (capturedText.length > MAX_SELECTED_TEXT_LENGTH) {
        currentSelectionText = capturedText.slice(0, MAX_SELECTED_TEXT_LENGTH);
        logger('Selected text truncated to 5000 characters');
      } else {
        currentSelectionText = capturedText;
      }
    } else {
      currentSelectionText = '';
    }
  } catch (error) {
    logger(`Failed to capture selected text: ${error instanceof Error ? error.message : String(error)}`);
    currentSelectionText = '';
  }

  recorder.setSelectedText(currentSelectionText);

  voiceState.setState('recording');
  recorder.startRecording();
}

function stop() {
  if (voiceState.getState() !== 'recording') {
    recorder.stopRecording();
    return;
  }

  voiceState.setState('processing');
  recorder.stopRecording();
}

module.exports = {
  start,
  stop,
};
