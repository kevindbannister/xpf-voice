const path = require('path');
const { BrowserWindow, screen } = require('electron');
const { logger } = require('../utils/logger');

let indicatorWindow;

function createIndicatorWindow() {
  if (indicatorWindow && !indicatorWindow.isDestroyed()) {
    return indicatorWindow;
  }

  const primaryDisplay = screen.getPrimaryDisplay();
  const windowWidth = 180;
  const windowHeight = 60;
  const x = Math.round(primaryDisplay.workArea.x + (primaryDisplay.workArea.width - windowWidth) / 2);
  const y = Math.round(primaryDisplay.workArea.y + 16);

  indicatorWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x,
    y,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    show: false,
    focusable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  indicatorWindow.setAlwaysOnTop(true, 'screen-saver');
  indicatorWindow.loadFile(path.join(__dirname, 'indicator.html'));

  indicatorWindow.on('closed', () => {
    indicatorWindow = null;
  });

  return indicatorWindow;
}

function showIndicator() {
  const window = createIndicatorWindow();
  window.showInactive();
  logger('[XPROFLOW VOICE] Recording indicator shown');
}

function hideIndicator() {
  if (!indicatorWindow || indicatorWindow.isDestroyed()) {
    return;
  }

  indicatorWindow.hide();
  logger('[XPROFLOW VOICE] Recording indicator hidden');
}

module.exports = {
  createIndicatorWindow,
  showIndicator,
  hideIndicator,
};
