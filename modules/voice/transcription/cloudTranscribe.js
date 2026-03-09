const { sendVoice } = require('../../../api/client');

async function transcribeCloud(audioFile, selectedText = '') {
  return sendVoice(audioFile, selectedText);
}

module.exports = {
  transcribeCloud,
};
