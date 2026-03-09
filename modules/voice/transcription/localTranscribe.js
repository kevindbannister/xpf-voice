const { sendTranscript } = require('../../../api/client');
const { logger } = require('../../../utils/logger');
const whisperService = require('./whisperService');

async function transcribeLocal(audioFile, selectedText = '') {
  logger('Starting local transcription');
  const transcript = await whisperService.transcribe(audioFile);
  console.log(`[XPROFLOW VOICE] Transcript: ${transcript}`);

  if (!transcript) {
    throw new Error('Local transcription produced an empty transcript');
  }

  logger('Sending local transcript text to backend');
  return sendTranscript(transcript, selectedText);
}

module.exports = {
  transcribeLocal,
};
