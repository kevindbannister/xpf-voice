const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const config = require('../config/config');
const { logger } = require('../utils/logger');

const client = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
});

async function sendVoice(filePath) {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const response = await client.post('/voice/transcribe', form, {
      headers: form.getHeaders(),
    });

    return response?.data?.text ?? response?.data ?? '';
  } catch (error) {
    logger(`Failed to upload voice file: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

module.exports = {
  sendVoice,
  client,
};
