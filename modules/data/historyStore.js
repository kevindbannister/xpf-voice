const path = require('path');
const { randomUUID } = require('crypto');
const { APP_SUPPORT_DIR, readJsonFile, writeJsonFile } = require('./storageUtils');

const HISTORY_PATH = path.join(APP_SUPPORT_DIR, 'history.json');

function addHistory(entry) {
  const history = readJsonFile(HISTORY_PATH, []);

  const normalizedEntry = {
    id: entry.id || randomUUID(),
    createdAt: entry.createdAt || new Date().toISOString(),
    route: entry.route || 'UNKNOWN',
    mode: entry.mode || 'local',
    rawTranscript: entry.rawTranscript || '',
    selectedText: entry.selectedText || '',
    finalText: entry.finalText || '',
    pasted: Boolean(entry.pasted),
  };

  history.unshift(normalizedEntry);
  writeJsonFile(HISTORY_PATH, history);

  return normalizedEntry;
}

function getHistory(limit = 50) {
  const history = readJsonFile(HISTORY_PATH, []);
  return history.slice(0, limit);
}

function clearHistory() {
  writeJsonFile(HISTORY_PATH, []);
}

module.exports = {
  addHistory,
  getHistory,
  clearHistory,
};
