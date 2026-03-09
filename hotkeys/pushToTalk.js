const { globalShortcut } = require('electron');
const { startRecording, stopRecording } = require('../audio/recorder');
const { logger } = require('../utils/logger');

const PUSH_TO_TALK_KEY = '§';
let isRecording = false;

function registerPushToTalk() {
  const registered = globalShortcut.register(PUSH_TO_TALK_KEY, () => {
    if (!isRecording) {
      startRecording();
      isRecording = true;
      return;
    }

    stopRecording();
    isRecording = false;
  });

  if (!registered) {
    logger(`Failed to register push-to-talk hotkey: ${PUSH_TO_TALK_KEY}`);
    return false;
  }

  logger(`Push-to-talk hotkey registered: ${PUSH_TO_TALK_KEY}`);
  return true;
}

module.exports = {
  registerPushToTalk,
};
