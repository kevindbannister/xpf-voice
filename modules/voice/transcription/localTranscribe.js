const { spawn } = require('child_process');
const path = require('path');
const { sendTranscript } = require('../../../api/client');
const { logger } = require('../../../utils/logger');

function runWhisper(audioFile) {
  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';

    const whisperProcess = spawn('/opt/homebrew/bin/whisper-cli', [
      '-m', 'models/base.en.bin',
      '-f', audioFile,
      '--threads', '8',
      '--no-timestamps',
      '--language', 'en',
    ]);

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

      console.log('[XPROFLOW VOICE] Whisper stdout:');
      console.log(stdout);

      const transcript = stdout
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .pop();

      resolve(transcript || '');
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
  const originalFile = audioFile;
  const trimmedFile = await trimSilence(audioFile);

  // temporarily disable trimming
  audioFile = originalFile;

  logger(`Trimmed candidate (bypassed): ${trimmedFile}`);
  logger('Starting local transcription');
  const transcript = await runWhisper(audioFile);
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
