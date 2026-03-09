const { getSettings } = require('../../../config/settings');
const { transcribeCloud } = require('./cloudTranscribe');
const { transcribeLocal } = require('./localTranscribe');

async function transcribe(audioFile, selectedText = '') {
  const settings = getSettings();

  if (settings.transcriptionMode === 'local') {
    return transcribeLocal(audioFile, selectedText);
  }

  return transcribeCloud(audioFile, selectedText);
}

module.exports = {
  transcribe,
};
