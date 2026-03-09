const fs = require('fs');
const path = require('path');
const { logger } = require('../utils/logger');

const SETTINGS_PATH = path.join(__dirname, 'settings.json');
const DEFAULT_SETTINGS = {
  recordMode: 'toggle',
  autoPaste: true,
  silenceAutoStop: false,
  showIndicator: true,
  transcriptionMode: 'local',
  smartFormatting: true,
  soundEffects: true,
  launchOnLogin: false,
  showInMenuBar: true,
  showInDock: false,
  language: 'en',
  microphone: 'default',
};

function ensureSettingsFile() {
  if (fs.existsSync(SETTINGS_PATH)) {
    return;
  }

  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(DEFAULT_SETTINGS, null, 2));
}

function getSettings() {
  try {
    ensureSettingsFile();
    const raw = fs.readFileSync(SETTINGS_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (error) {
    logger(`Failed to load settings, using defaults: ${error instanceof Error ? error.message : String(error)}`);
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(nextSettings) {
  try {
    const merged = { ...DEFAULT_SETTINGS, ...nextSettings };
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(merged, null, 2));
    return merged;
  } catch (error) {
    logger(`Failed to save settings: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

module.exports = {
  getSettings,
  saveSettings,
};
