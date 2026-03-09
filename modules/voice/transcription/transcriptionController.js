const { getSettings } = require('../../../config/settings');
const { transcribeCloud } = require('./cloudTranscribe');
const { transcribeLocal } = require('./localTranscribe');
const { sendLocalTranscript } = require('../../../api/client');

async function transcribe(audioFile, selectedText = '') {
  const settings = getSettings();

  if (settings.transcriptionMode === 'local') {
    const transcript = await transcribeLocal(audioFile, selectedText);

    console.log('[XPROFLOW VOICE] Sending transcript to backend');
    console.log('[XPROFLOW VOICE] Transcript:', transcript);

    const processedText = await sendLocalTranscript(transcript, selectedText);

    console.log('[XPROFLOW VOICE] n8n transcript response received');

    return processedText;
  }

  return transcribeCloud(audioFile, selectedText);
}

module.exports = {
  transcribe,
};
