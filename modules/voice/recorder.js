const fs = require('fs');
const record = require('node-record-lpcm16');
const { logger } = require('../../utils/logger');
const { pasteText } = require('../../utils/paste');
const { getSettings } = require('../../config/settings');
const voiceState = require('./voiceState');

const OUTPUT_FILE = '/tmp/xproflow-voice.wav';

let recordingProcess = null;
let outputStream = null;
let currentSelectionText = '';
let transcribeHandler = null;

function setSelectedText(selectedText) {
  currentSelectionText = selectedText || '';
}

function setTranscribeHandler(handler) {
  transcribeHandler = handler;
}

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
      if (!transcribeHandler) {
        throw new Error('No transcription handler configured');
      }

      logger('Recording stopped');
      logger(`Recording saved: ${OUTPUT_FILE}`);
      logger('Processing transcription request');

      const text = await transcribeHandler(OUTPUT_FILE, currentSelectionText);
      const settings = getSettings();
      await pasteText(text, { autoPaste: Boolean(settings.autoPaste) });

      logger(settings.autoPaste ? 'Text pasted into active app' : 'Clipboard updated without auto-paste');
      voiceState.setState('idle');
      currentSelectionText = '';
    } catch (error) {
      logger(`Error while processing recording: ${error instanceof Error ? error.message : String(error)}`);
      voiceState.setState('idle');
      currentSelectionText = '';
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
  setSelectedText,
  setTranscribeHandler,
};
