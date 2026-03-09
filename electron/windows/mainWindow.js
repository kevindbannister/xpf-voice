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
    title: 'XProFlow Voice Dashboard',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.js'),
    },
  });

  logger('Main UI opened');

  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    console.log('[XPROFLOW VOICE] Loading Vite dev server');
    mainWindow.loadURL('http://localhost:5173');
  } else {
    console.log('[XPROFLOW VOICE] Loading production build');
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

module.exports = {
  createMainWindow,
};
