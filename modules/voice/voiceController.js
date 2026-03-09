const recorder = require('./recorder');
const voiceState = require('./voiceState');
const { createIndicatorWindow } = require('./indicator');

function start() {
  createIndicatorWindow();
  voiceState.setState('recording');
  recorder.startRecording();
}

function stop() {
  if (voiceState.getState() !== 'recording') {
    recorder.stopRecording();
    return;
  }

  voiceState.setState('processing');
  recorder.stopRecording();
}

module.exports = {
  start,
  stop,
};
