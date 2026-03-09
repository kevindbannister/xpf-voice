const { clipboard } = require('electron');
const { logger } = require('./logger');

async function pasteText(text) {
  clipboard.writeText(text || '');

  try {
    // Loaded lazily so the app can still run in environments where robotjs is not installed yet.
    // eslint-disable-next-line global-require
    const robot = require('robotjs');
    robot.keyTap('v', 'command');
  } catch (error) {
    logger(`Unable to simulate paste: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

module.exports = {
  pasteText,
};
