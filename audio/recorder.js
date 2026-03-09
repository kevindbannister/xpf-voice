const fs = require('fs');
const record = require('node-record-lpcm16');
const { logger } = require('../utils/logger');
const { sendVoice } = require('../api/client');
const { pasteText } = require('../utils/paste');
const { getSettings } = require('../config/settings');
const voiceState = require('../core/voiceState');

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
  voiceState.setState('recording');
  logger('Recording started');
}

function stopRecording() {
  if (!recordingProcess) {
    logger('Recording is not in progress');
    return;
  }

  recordingProcess.stop();
  recordingProcess = null;
  voiceState.setState('processing');

  const finalizeRecording = async () => {
    try {
      logger('Recording stopped');
      logger(`Recording saved: ${OUTPUT_FILE}`);
      const text = await sendVoice(OUTPUT_FILE);
      const settings = getSettings();
      await pasteText(text, { autoPaste: Boolean(settings.autoPaste) });
      logger(settings.autoPaste ? 'Text pasted into active app' : 'Clipboard updated without auto-paste');
      voiceState.setState('idle');
    } catch (error) {
      logger(`Error while processing recording: ${error instanceof Error ? error.message : String(error)}`);
      voiceState.setState('idle');
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
