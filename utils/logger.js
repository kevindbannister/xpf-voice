const PREFIX = '[XPROFLOW VOICE]';

function log(message) {
  if (message.startsWith(PREFIX)) {
    console.log(message);
    return;
  }

  console.log(`${PREFIX} ${message}`);
}

module.exports = {
  logger: log,
  log,
};
