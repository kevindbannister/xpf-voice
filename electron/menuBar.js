const { Menu, Tray, nativeImage } = require('electron');
const voiceState = require('../modules/voice/voiceState');

let tray = null;
let isVoiceStateHooked = false;

function setTrayStateTitle(state) {
  if (!tray) {
    return;
  }

  if (state === 'recording') {
    tray.setTitle('🎙 Recording');
    return;
  }

  if (state === 'processing') {
    tray.setTitle('⚙ Processing');
    return;
  }

  tray.setTitle('🎙 XProFlow');
}

function hookVoiceState() {
  if (isVoiceStateHooked) {
    return;
  }

  voiceState.on('change', (state) => {
    setTrayStateTitle(state);
  });

  isVoiceStateHooked = true;
}

function createTray(actions = {}) {
  const {
    onStartRecording,
    onStopRecording,
    onRestartEngine,
    onSettings,
    onQuit,
  } = actions;
  if (tray) {
    return tray;
  }

  tray = new Tray(nativeImage.createEmpty());
  setTrayStateTitle(voiceState.getState());
  tray.setToolTip('XProFlow Voice');

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Start Recording', click: onStartRecording },
    { label: 'Stop Recording', click: onStopRecording },
    { type: 'separator' },
    { label: 'Restart Engine', click: onRestartEngine },
    { label: 'Settings', click: onSettings },
    { type: 'separator' },
    { label: 'Quit', click: onQuit },
  ]);

  tray.setContextMenu(contextMenu);
  hookVoiceState();
  return tray;
}

module.exports = {
  createTray,
};
