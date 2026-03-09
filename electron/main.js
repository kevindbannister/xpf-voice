const { app, BrowserWindow, globalShortcut } = require('electron');
const voiceController = require('../modules/voice/voiceController');
const { registerPushToTalk } = require('../hotkeys/pushToTalk');
const { createIndicatorWindow } = require('../modules/voice/indicator');
const { createTray } = require('./menuBar');
const { createSettingsWindow } = require('./settingsWindow');
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

  mainWindow.loadURL('data:text/html,<html><body><h1>XProFlow Voice</h1></body></html>');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function restartEngine() {
  logger('Restarting engine...');
  globalShortcut.unregisterAll();
  voiceController.stop();
  registerPushToTalk();
  logger('Engine restarted');
}

app.whenReady().then(() => {
  logger('Electron app started');
  createWindow();
  createIndicatorWindow();
  registerPushToTalk();

  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment) {
    logger('Development mode detected, opening settings window');
    createSettingsWindow();
  }

  createTray({
    onStartRecording: () => voiceController.start(),
    onStopRecording: () => voiceController.stop(),
    onRestartEngine: () => restartEngine(),
    onSettings: () => createSettingsWindow(),
    onQuit: () => app.quit(),
  });

  if (process.platform === 'darwin' && app.dock) {
    app.dock.hide();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', (event) => {
  event.preventDefault();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  logger('Global shortcuts unregistered');
});
