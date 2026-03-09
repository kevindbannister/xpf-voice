const { app, BrowserWindow, globalShortcut } = require('electron');
const { registerPushToTalk } = require('../hotkeys/pushToTalk');
const { createIndicatorWindow } = require('./indicator');
const { logger } = require('../utils/logger');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(`data:text/html,<html><body><h1>XProFlow Voice</h1></body></html>`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  logger('Electron app started');
  createWindow();
  createIndicatorWindow();
  registerPushToTalk();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  logger('Global shortcuts unregistered');
});
