const { BrowserWindow } = require('electron');
const path = require('path');
const { logger } = require('../../utils/logger');

let mainWindow;

function createMainWindow() {
  if (mainWindow) {
    mainWindow.focus();
    return;
  }

  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    title: 'XProFlow Voice',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  logger('Main UI opened');
  mainWindow.loadFile(path.join(__dirname, '../../index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

module.exports = {
  createMainWindow,
};
