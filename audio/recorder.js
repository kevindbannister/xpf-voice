const fs = require('fs');
const record = require('node-record-lpcm16');
const { logger } = require('../utils/logger');
const { showIndicator, hideIndicator } = require('../electron/indicator');
const { sendVoice } = require('../api/client');
const { pasteText } = require('../utils/paste');

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
  showIndicator();
  logger('Recording started');
}

function stopRecording() {
  if (!recordingProcess) {
    logger('Recording is not in progress');
    hideIndicator();
    return;
  }

  recordingProcess.stop();
  recordingProcess = null;

  const finalizeRecording = async () => {
    try {
      logger('Recording stopped');
      logger(`Recording saved: ${OUTPUT_FILE}`);
      logger('Uploading audio to API');
      const text = await sendVoice(OUTPUT_FILE);
      logger('API response received');
      await pasteText(text);
      logger('Text pasted into active app');
    } catch (error) {
      logger(`Error while processing recording: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      hideIndicator();
    }
  };

  if (outputStream) {
    outputStream.end(() => {
      finalizeRecording();
    });
    outputStream = null;
    return;
  }

  finalizeRecording();
}

module.exports = {
  startRecording,
  stopRecording,
};
