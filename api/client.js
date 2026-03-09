const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const { getSettings } = require('../config/settings');
const { logger } = require('../utils/logger');

const LOCAL_WEBHOOK = 'https://n8n.xproflow.com/webhook/voice-local';
const CLOUD_WEBHOOK = 'https://n8n.xproflow.com/webhook/voice-cleanup-only-voice';

function getWebhookUrl() {
  const settings = getSettings();

  if (settings.transcriptionMode === 'local') {
    return LOCAL_WEBHOOK;
  }

  return CLOUD_WEBHOOK;
}

async function sendVoice(filePath, selectedText = '') {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('selectedText', selectedText || '');
    form.append('source', 'desktop');

    const url = getWebhookUrl();
    console.log('[XPROFLOW VOICE] Using webhook:', url);
    logger('Uploading audio to n8n');

    const response = await axios.post(url, form, {
      headers: form.getHeaders(),
    });

    logger('n8n response received');

    return response.data;
  } catch (error) {
    logger(`Failed to upload voice file: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

async function sendLocalTranscript(text, selectedText = '') {
  console.log('[XPROFLOW VOICE] Sending transcript to backend');
  console.log('[XPROFLOW VOICE] Webhook URL:', LOCAL_WEBHOOK);

  const response = await axios.post(LOCAL_WEBHOOK, {
    text,
    selectedText,
    source: 'desktop-local',
  });

  return response.data;
}

module.exports = {
  sendVoice,
  sendLocalTranscript,
};
