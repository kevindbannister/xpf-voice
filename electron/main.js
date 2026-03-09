const { app, BrowserWindow, globalShortcut } = require('electron');
const recorder = require('../audio/recorder');
const { registerPushToTalk } = require('../hotkeys/pushToTalk');
const { createIndicatorWindow } = require('./indicator');
const { createTray } = require('./menuBar');
const { getSettings } = require('../config/settings');
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
  recorder.stopRecording();
  registerPushToTalk();
  logger('Engine restarted');
}

app.whenReady().then(() => {
  logger('Electron app started');
  getSettings();
  createWindow();
  createIndicatorWindow();
  registerPushToTalk();

  createTray({
    onStartRecording: () => recorder.startRecording(),
    onStopRecording: () => recorder.stopRecording(),
    onRestartEngine: () => restartEngine(),
    onSettings: () => logger('Settings clicked (placeholder)'),
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
