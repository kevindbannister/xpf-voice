const fs = require('fs');
const os = require('os');
const path = require('path');

const APP_SUPPORT_DIR = path.join(os.homedir(), 'Library', 'Application Support', 'XProFlow');

function ensureDataDir() {
  if (!fs.existsSync(APP_SUPPORT_DIR)) {
    fs.mkdirSync(APP_SUPPORT_DIR, { recursive: true });
  }
}

function ensureJsonFile(filePath, defaultValue) {
  ensureDataDir();

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
  }
}

function readJsonFile(filePath, fallback) {
  ensureJsonFile(filePath, fallback);

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (_error) {
    return fallback;
  }
}

function writeJsonFile(filePath, value) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

module.exports = {
  APP_SUPPORT_DIR,
  ensureJsonFile,
  readJsonFile,
  writeJsonFile,
};
