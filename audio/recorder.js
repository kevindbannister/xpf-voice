const { log } = require('../utils/logger');

function startRecording() {
  log('Recording started');
}

function stopRecording() {
  log('Recording stopped');
}

module.exports = {
  startRecording,
  stopRecording,
};
