const fs = require('fs');
const record = require('node-record-lpcm16');
const { logger } = require('../utils/logger');

const OUTPUT_FILE = '/tmp/xproflow-voice.wav';

let recordingProcess = null;
let outputStream = null;

function startRecording() {
  if (recordingProcess) {
    logger('Recording already in progress');
    return;
  }

  outputStream = fs.createWriteStream(OUTPUT_FILE, { flags: 'w' });

  recordingProcess = record.record({
    sampleRate: 16000,
    channels: 1,
    audioType: 'wav',
  });

  recordingProcess.stream().pipe(outputStream);
  logger('Recording started');
}

function stopRecording() {
  if (!recordingProcess) {
    logger('Recording is not in progress');
    return;
  }

  recordingProcess.stop();
  recordingProcess = null;

  if (outputStream) {
    outputStream.end(() => {
      logger('Recording stopped');
      logger(`Recording saved: ${OUTPUT_FILE}`);
    });
    outputStream = null;
    return;
  }

  logger('Recording stopped');
  logger(`Recording saved: ${OUTPUT_FILE}`);
}

module.exports = {
  startRecording,
  stopRecording,
};
