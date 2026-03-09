const { globalShortcut } = require('electron');
const voiceController = require('../modules/voice/voiceController');
const { logger } = require('../utils/logger');

const PUSH_TO_TALK_KEY = 'Control+Space';
let isRecording = false;

function registerPushToTalk() {
  try {
    const registered = globalShortcut.register(PUSH_TO_TALK_KEY, () => {
      logger('Push-to-talk activated');

      if (!isRecording) {
        voiceController.start();
        isRecording = true;
        return;
      }

      voiceController.stop();
      isRecording = false;
    });

    if (!registered) {
      logger(`Failed to register push-to-talk hotkey: ${PUSH_TO_TALK_KEY}`);
      return false;
    }

    logger(`Push-to-talk hotkey registered: ${PUSH_TO_TALK_KEY}`);
    return true;
  } catch (error) {
    logger(`Error registering push-to-talk hotkey: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

module.exports = {
  registerPushToTalk,
};
