const axios = require('axios');
const config = require('../config/config');
const { log } = require('../utils/logger');

const client = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
});

function sendVoice(audioPath) {
  log('Sending audio to API...');
  return { client, audioPath };
}

module.exports = {
  sendVoice,
  client,
};
