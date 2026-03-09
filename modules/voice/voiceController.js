const fs = require('fs');
const recorder = require('./recorder');
const voiceState = require('./voiceState');
const { createIndicatorWindow } = require('./indicator');
const { captureSelectedText } = require('./selectionCapture');
const { getSettings } = require('../../config/settings');
const { transcribeLocal } = require('./transcription/localTranscribe');
const { transcribeCloud } = require('./transcription/cloudTranscribe');
const { sendLocalTranscript } = require('../../api/client');
const dictionary = require('../data/dictionaryStore');
const snippets = require('../data/snippetStore');
const history = require('../data/historyStore');
const { logger } = require('../../utils/logger');

const MAX_SELECTED_TEXT_LENGTH = 5000;
let currentSelectionText = '';

function getResponseText(response) {
  if (typeof response === 'string') {
    return response;
  }

  if (!response || typeof response !== 'object') {
    return '';
  }

  return response.finalText || response.text || response.output || '';
}

function getResponseRoute(response) {
  if (!response || typeof response !== 'object') {
    return 'UNKNOWN';
  }

  return response.route || response.intent || 'UNKNOWN';
}

async function processVoice(audioFile, selectedText) {
  const settings = getSettings();
  const mode = settings.transcriptionMode === 'local' ? 'local' : 'cloud';

  let rawTranscript = '';
  let transcript = '';
  let finalText = '';
  let route = 'UNKNOWN';

  if (mode === 'local') {
    rawTranscript = await transcribeLocal(audioFile);
    logger('[XPROFLOW VOICE] Applying dictionary replacements');
    transcript = dictionary.applyDictionary(rawTranscript);

    const snippet = snippets.matchSnippet(transcript);
    if (snippet) {
      logger('[XPROFLOW VOICE] Snippet triggered');
      finalText = snippet;
      route = 'SNIPPET';
    } else {
      const aiResponse = await sendLocalTranscript(transcript, selectedText);
      finalText = getResponseText(aiResponse);
      route = getResponseRoute(aiResponse);
    }
  } else {
    const aiResponse = await transcribeCloud(audioFile, selectedText);

    rawTranscript = typeof aiResponse === 'object' && aiResponse
      ? (aiResponse.transcript || aiResponse.rawTranscript || '')
      : '';

    if (rawTranscript) {
      logger('[XPROFLOW VOICE] Applying dictionary replacements');
      transcript = dictionary.applyDictionary(rawTranscript);
      const snippet = snippets.matchSnippet(transcript);

      if (snippet) {
        logger('[XPROFLOW VOICE] Snippet triggered');
        finalText = snippet;
        route = 'SNIPPET';
      }
    }

    if (!finalText) {
      finalText = getResponseText(aiResponse);
      route = getResponseRoute(aiResponse);
    }
  }

  history.addHistory({
    route,
    mode,
    rawTranscript: rawTranscript || transcript,
    selectedText,
    finalText,
    pasted: true,
  });
  logger('[XPROFLOW VOICE] History entry saved');

  return finalText;
}

async function start() {
  createIndicatorWindow();

  recorder.setTranscribeHandler(async (audioFile, selectedText) => {
    const stats = fs.statSync(audioFile);
    const maxBytes = 10 * 1024 * 1024;

    if (stats.size > maxBytes) {
      logger('Recording too large, aborting transcription');
      return '';
    }

    logger('Dispatching transcription pipeline');
    return processVoice(audioFile, selectedText);
  });

  try {
    const capturedText = await captureSelectedText();

    if (capturedText) {
      if (capturedText.length > MAX_SELECTED_TEXT_LENGTH) {
        currentSelectionText = capturedText.slice(0, MAX_SELECTED_TEXT_LENGTH);
        logger('Selected text truncated to 5000 characters');
      } else {
        currentSelectionText = capturedText;
      }
    } else {
      currentSelectionText = '';
    }
  } catch (error) {
    logger(`Failed to capture selected text: ${error instanceof Error ? error.message : String(error)}`);
    currentSelectionText = '';
  }

  recorder.setSelectedText(currentSelectionText);

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
