module.exports = {
  API_URL: process.env.XPROFLOW_API_URL || 'http://localhost:3001/api',
  TEMP_AUDIO_FILE: '/tmp/xproflow-voice.wav',
  RECORD_MODE: process.env.RECORD_MODE || 'toggle',
};
