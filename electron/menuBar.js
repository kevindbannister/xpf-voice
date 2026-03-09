const { Menu, Tray, nativeImage } = require('electron');

let tray = null;

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
  tray.setTitle('🎙 XProFlow');
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
  return tray;
}

module.exports = {
  createTray,
};
