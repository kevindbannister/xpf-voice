const { globalShortcut } = require('electron');
const { log } = require('../utils/logger');

const PUSH_TO_TALK_KEY = '§';
let releaseTimer;

function registerPushToTalk() {
  const registered = globalShortcut.register(PUSH_TO_TALK_KEY, () => {
    clearTimeout(releaseTimer);
    log('Voice recording START');

    releaseTimer = setTimeout(() => {
      log('Voice recording STOP');
    }, 150);
  });

  if (!registered) {
    log(`Failed to register push-to-talk hotkey: ${PUSH_TO_TALK_KEY}`);
    return false;
  }

  log(`Push-to-talk hotkey registered: ${PUSH_TO_TALK_KEY}`);
  return true;
}

module.exports = {
  registerPushToTalk,
};
