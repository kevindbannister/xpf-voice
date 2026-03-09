const { spawn } = require('child_process');

async function localTranscribe(audioFile) {
  return new Promise((resolve, reject) => {
    console.log('[XPROFLOW VOICE] Running whisper-cli transcription');

    const whisper = spawn('/opt/homebrew/bin/whisper-cli', [
      '-m',
      'models/base.en.bin',
      '-f',
      audioFile,
      '--threads',
      '8',
      '--no-timestamps',
      '--language',
      'en',
    ]);

    let stdout = '';
    let stderr = '';

    whisper.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    whisper.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    whisper.on('close', () => {
      if (stderr.trim()) {
        console.log('[XPROFLOW VOICE] Whisper stderr:');
        console.log(stderr);
      }

      console.log('[XPROFLOW VOICE] Whisper stdout:');
      console.log(stdout);

      const transcript = stdout.trim();

      if (!transcript) {
        reject(new Error('Local transcription produced an empty transcript'));
        return;
      }

      resolve(transcript);
    });

    whisper.on('error', reject);
  });
}

module.exports = localTranscribe;
module.exports.transcribeLocal = localTranscribe;
