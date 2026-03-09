const path = require('path');
const { BrowserWindow, screen } = require('electron');
const { logger } = require('../utils/logger');

let indicatorWindow;

const INDICATOR_STATES = {
  recording: '🎙 Recording...',
  processing: '⚙ Processing...',
  done: '✓ Done',
};

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

function setIndicatorState(state) {
  const window = createIndicatorWindow();
  const message = INDICATOR_STATES[state] || INDICATOR_STATES.recording;

  const applyState = () => {
    window.webContents.executeJavaScript(`window.setIndicatorState(${JSON.stringify(message)});`, true);
  };

  if (window.webContents.isLoading()) {
    window.webContents.once('did-finish-load', applyState);
  } else {
    applyState();
  }

  logger(`Indicator state: ${state}`);
}

function showIndicator() {
  const window = createIndicatorWindow();
  window.showInactive();
  logger('Recording indicator shown');
}

function hideIndicator() {
  if (!indicatorWindow || indicatorWindow.isDestroyed()) {
    return;
  }

  indicatorWindow.hide();
  logger('Recording indicator hidden');
}

module.exports = {
  createIndicatorWindow,
  showIndicator,
  hideIndicator,
  setIndicatorState,
};
