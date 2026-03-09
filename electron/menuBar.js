const { Menu, Tray, nativeImage } = require('electron');

let tray = null;

function createTray(actions) {
  if (tray) {
    return tray;
  }

  tray = new Tray(nativeImage.createEmpty());
  tray.setTitle('🎙 XProFlow');
  tray.setToolTip('XProFlow Voice');

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Start Recording', click: actions.onStartRecording },
    { label: 'Stop Recording', click: actions.onStopRecording },
    { type: 'separator' },
    { label: 'Restart Engine', click: actions.onRestartEngine },
    { label: 'Settings', click: actions.onSettings },
    { type: 'separator' },
    { label: 'Quit', click: actions.onQuit },
  ]);

  tray.setContextMenu(contextMenu);
  return tray;
}

module.exports = {
  createTray,
};
