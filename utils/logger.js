const PREFIX = '[XPROFLOW VOICE]';

function logger(message) {
  console.log(`${PREFIX} ${message}`);
}

module.exports = {
  logger,
  log: logger,
};
