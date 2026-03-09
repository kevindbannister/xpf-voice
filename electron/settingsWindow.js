const path = require('path');
const { BrowserWindow, ipcMain } = require('electron');
const { getSettings, saveSettings } = require('../config/settings');
const { logger } = require('../utils/logger');

let settingsWindow = null;
let ipcRegistered = false;

function registerSettingsIpc() {
  if (ipcRegistered) {
    return;
  }

  ipcMain.handle('settings:get', () => {
    return getSettings();
  });

  ipcMain.handle('settings:save', (_event, nextSettings) => {
    const saved = saveSettings(nextSettings);
    if (saved) {
      logger('Settings updated');
    }

    return saved;
  });

  ipcRegistered = true;
}

function createSettingsWindow() {
  registerSettingsIpc();

  if (settingsWindow && !settingsWindow.isDestroyed()) {
    settingsWindow.focus();
    return settingsWindow;
  }

  settingsWindow = new BrowserWindow({
    width: 420,
    height: 380,
    resizable: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  settingsWindow.loadFile(path.join(__dirname, 'settings.html'));

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });

  return settingsWindow;
}

module.exports = {
  createSettingsWindow,
};
