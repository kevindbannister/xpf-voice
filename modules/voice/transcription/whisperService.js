const { spawn } = require('child_process');

let whisperProcess = null;
let stdoutBuffer = '';
const pending = [];

function resolveNextTranscript(line) {
  const trimmed = line.trim();

  if (!trimmed || pending.length === 0) {
    return;
  }

  const next = pending.shift();
  clearTimeout(next.timeout);
  next.resolve(trimmed);
}

function rejectAllPending(error) {
  while (pending.length > 0) {
    const next = pending.shift();
    clearTimeout(next.timeout);
    next.reject(error);
  }
}

function startWhisper() {
  if (whisperProcess) {
    return;
  }

  console.log('[XPROFLOW VOICE] Starting persistent whisper engine');

  whisperProcess = spawn('/opt/homebrew/bin/whisper-cli', [
    '-m',
    'models/base.en.bin',
    '--threads',
    '8',
    '--no-timestamps',
    '--language',
    'en',
    '--stdin',
  ]);

  whisperProcess.stdout.on('data', (data) => {
    stdoutBuffer += data.toString();

    const lines = stdoutBuffer.split('\n');
    stdoutBuffer = lines.pop() || '';

    lines.forEach((line) => resolveNextTranscript(line));
  });

  whisperProcess.stderr.on('data', (data) => {
    const message = data.toString().trim();
    if (message) {
      console.log('[XPROFLOW VOICE] Whisper stderr:', message);
    }
  });

  whisperProcess.on('error', (error) => {
    console.log('[XPROFLOW VOICE] Whisper engine error:', error.message);
    rejectAllPending(error);
    whisperProcess = null;
  });

  whisperProcess.on('close', (code) => {
    const error = new Error(`Whisper engine exited with code ${code}`);
    console.log('[XPROFLOW VOICE] Whisper engine stopped');
    rejectAllPending(error);
    whisperProcess = null;
  });
}

function transcribe(audioFile) {
  return new Promise((resolve, reject) => {
    if (!whisperProcess) {
      reject(new Error('Whisper engine not started'));
      return;
    }

    const timeout = setTimeout(() => {
      const index = pending.findIndex((item) => item.resolve === resolve);
      if (index >= 0) {
        pending.splice(index, 1);
      }
      reject(new Error('Timed out waiting for Whisper transcript'));
    }, 45000);

    pending.push({ resolve, reject, timeout });
    whisperProcess.stdin.write(`${audioFile}\n`);
  });
}

module.exports = {
  startWhisper,
  transcribe,
};
