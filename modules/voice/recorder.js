const fs = require('fs');
const { spawn } = require('child_process');
const { logger } = require('../../utils/logger');
const { pasteText } = require('../../utils/paste');
const { getSettings } = require('../../config/settings');
const voiceState = require('./voiceState');

const OUTPUT_FILE = '/tmp/xproflow-voice.wav';

let recordingProcess = null;
let currentSelectionText = '';
let transcribeHandler = null;
let recordingStartedAt = null;
let maxDurationTimeout = null;

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

  recordingProcess = spawn('rec', [
    '-c', '1',
    '-r', '16000',
    '-b', '16',
    '-e', 'signed-integer',
    OUTPUT_FILE,
  ]);

  recordingStartedAt = Date.now();

  recordingProcess.on('error', (error) => {
    logger(`Recording process error: ${error instanceof Error ? error.message : String(error)}`);
  });

  maxDurationTimeout = setTimeout(() => {
    if (recordingProcess) {
      logger('Max recording length reached');
      recordingProcess.kill('SIGINT');
    }
  }, 60000);

  voiceState.setState('recording');
  logger('Recording started');
}

async function stopRecording() {
  if (!recordingProcess) {
    logger('Recording is not in progress');
    return;
  }

  const processToStop = recordingProcess;

  if (maxDurationTimeout) {
    clearTimeout(maxDurationTimeout);
    maxDurationTimeout = null;
  }

  processToStop.kill('SIGINT');

  await new Promise((resolve) => {
    processToStop.once('close', resolve);
  });

  recordingProcess = null;

  const durationSeconds = recordingStartedAt ? ((Date.now() - recordingStartedAt) / 1000).toFixed(2) : '0.00';
  recordingStartedAt = null;

  let fileSizeKB = null;
  if (fs.existsSync(OUTPUT_FILE)) {
    fileSizeKB = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2);
  }

  logger(`Recording duration: ${durationSeconds} seconds`);
  if (fileSizeKB !== null) {
    logger(`Audio file size: ${fileSizeKB} KB`);
  }

  voiceState.setState('processing');

  try {
    if (!transcribeHandler) {
      throw new Error('No transcription handler configured');
    }

    logger('Recording stopped');
    logger(`Recording saved: ${OUTPUT_FILE}`);
    logger('Processing transcription request');

    const text = await transcribeHandler(OUTPUT_FILE, currentSelectionText);
    if (!text) {
      logger('No transcript produced');
      voiceState.setState('idle');
      currentSelectionText = '';
      return;
    }

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
}

module.exports = {
  startRecording,
  stopRecording,
  setSelectedText,
  setTranscribeHandler,
};
