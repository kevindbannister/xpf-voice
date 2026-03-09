const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const { logger } = require('../utils/logger');

async function sendVoice(filePath) {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    logger('[XPROFLOW VOICE] Uploading audio to n8n');

    const response = await axios.post('https://n8n.xproflow.com/webhook/voice-cleanup-only-voice', form, {
      headers: form.getHeaders(),
    });

    logger('[XPROFLOW VOICE] n8n response received');

    return response.data;
  } catch (error) {
    logger(`Failed to upload voice file: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

module.exports = {
  sendVoice,
};
