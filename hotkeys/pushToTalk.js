const { globalShortcut } = require('electron');
const iohook = require('iohook');
const config = require('../config/config');
const { startRecording, stopRecording } = require('../audio/recorder');
const { logger } = require('../utils/logger');

const PUSH_TO_TALK_KEY = 'Control+Space';
const CTRL_KEYCODES = new Set([29, 3613]);
const SPACE_KEYCODE = 57;
const SPACE_RAWCODE = 32;
let isRecording = false;
let isHoldKeyPressed = false;

function startRecordingIfNeeded() {
  if (isRecording) {
    return;
  }

  startRecording();
  isRecording = true;
  logger('[XPROFLOW VOICE] Recording started');
}

function stopRecordingIfNeeded() {
  if (!isRecording) {
    return;
  }

  stopRecording();
  isRecording = false;
  logger('[XPROFLOW VOICE] Recording stopped');
}

function isHoldHotkeyEvent(event) {
  const isSpace = event.keycode === SPACE_KEYCODE || event.rawcode === SPACE_RAWCODE;
  return Boolean(event.ctrlKey && isSpace);
}

function registerTogglePushToTalk() {
  const registered = globalShortcut.register(PUSH_TO_TALK_KEY, () => {
    logger('[XPROFLOW VOICE] Push-to-talk activated');

    if (!isRecording) {
      startRecordingIfNeeded();
      return;
    }

    stopRecordingIfNeeded();
  });

  if (!registered) {
    logger(`Failed to register push-to-talk hotkey: ${PUSH_TO_TALK_KEY}`);
    return false;
  }

  logger(`Push-to-talk hotkey registered: ${PUSH_TO_TALK_KEY}`);
  return true;
}

function registerHoldPushToTalk() {
  iohook.on('keydown', (event) => {
    if (!isHoldHotkeyEvent(event) || isHoldKeyPressed) {
      return;
    }

    isHoldKeyPressed = true;
    logger('[XPROFLOW VOICE] Push-to-talk activated (hold)');
    startRecordingIfNeeded();
  });

  iohook.on('keyup', (event) => {
    const isSpaceRelease = event.keycode === SPACE_KEYCODE || event.rawcode === SPACE_RAWCODE;
    const isCtrlRelease = CTRL_KEYCODES.has(event.keycode);

    if (!isHoldKeyPressed || (!isSpaceRelease && !isCtrlRelease)) {
      return;
    }

    isHoldKeyPressed = false;
    stopRecordingIfNeeded();
  });

  iohook.start();
  logger(`Push-to-talk hotkey registered (hold mode): ${PUSH_TO_TALK_KEY}`);
  return true;
}

function registerPushToTalk() {
  try {
    const mode = config.RECORD_MODE;
    logger(`[XPROFLOW VOICE] Recording mode: ${mode}`);

    if (mode === 'hold') {
      return registerHoldPushToTalk();
    }

    return registerTogglePushToTalk();
  } catch (error) {
    logger(`Error registering push-to-talk hotkey: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

module.exports = {
  registerPushToTalk,
};
