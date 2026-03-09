const { spawn } = require('child_process');
const path = require('path');
const { sendTranscript } = require('../../../api/client');
const { logger } = require('../../../utils/logger');

const DEFAULT_WHISPER_MODEL = process.env.WHISPER_MODEL_PATH || 'models/base.en.bin';

function runWhisper(audioFile) {
  return new Promise((resolve, reject) => {
    let output = '';

    const whisperProcess = spawn('/opt/homebrew/bin/whisper-cli', [
      '-m', DEFAULT_WHISPER_MODEL,
      '-f', audioFile,
      '--threads', '8',
    ]);

    whisperProcess.stderr.on('data', (chunk) => {
      output += chunk.toString();
    });

    whisperProcess.on('error', (error) => {
      reject(error);
    });

    whisperProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`whisper-cli exited with code ${code}: ${output || 'unknown error'}`));
        return;
      }

      console.log('[XPROFLOW VOICE] Raw whisper output:');
      console.log(output);

      const lines = output.split('\n');

      const transcript = lines
        .filter((line) => line.includes(']'))
        .map((line) => line.split(']').pop().trim())
        .join(' ')
        .trim();

      resolve(transcript);
    });
  });
}

function trimSilence(audioFile) {
  return new Promise((resolve) => {
    const parsedPath = path.parse(audioFile);
    const trimmedFile = path.join(parsedPath.dir, `${parsedPath.name}.trimmed${parsedPath.ext || '.wav'}`);

    const soxProcess = spawn('sox', [
      audioFile,
      trimmedFile,
      'silence',
      '1',
      '0.1',
      '1%',
      '-1',
      '0.5',
      '1%',
    ]);

    soxProcess.on('error', () => {
      resolve(audioFile);
    });

    soxProcess.on('close', (code) => {
      if (code === 0) {
        resolve(trimmedFile);
        return;
      }

      resolve(audioFile);
    });
  });
}

async function transcribeLocal(audioFile, selectedText = '') {
  const processedAudioFile = await trimSilence(audioFile);
  logger('Starting local transcription');
  const transcript = await runWhisper(processedAudioFile);
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
