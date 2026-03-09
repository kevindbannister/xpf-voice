const { spawn } = require('child_process');
const { sendTranscript } = require('../../../api/client');
const { logger } = require('../../../utils/logger');

const DEFAULT_WHISPER_MODEL = process.env.WHISPER_MODEL_PATH || 'models/base.en.bin';

function runWhisper(audioFile) {
  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';

    const whisperProcess = spawn('whisper-cli', ['-m', DEFAULT_WHISPER_MODEL, '-f', audioFile]);

    whisperProcess.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    whisperProcess.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    whisperProcess.on('error', (error) => {
      reject(error);
    });

    whisperProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`whisper-cli exited with code ${code}: ${stderr || 'unknown error'}`));
        return;
      }

      resolve(stdout.trim());
    });
  });
}

async function transcribeLocal(audioFile, selectedText = '') {
  logger('Running local transcription with whisper.cpp');
  const transcript = await runWhisper(audioFile);

  if (!transcript) {
    throw new Error('Local transcription produced an empty transcript');
  }

  logger('Sending local transcript text to backend');
  return sendTranscript(transcript, selectedText);
}

module.exports = {
  transcribeLocal,
};
