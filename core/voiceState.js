const EventEmitter = require('events');

const VALID_STATES = new Set(['idle', 'recording', 'processing']);

class VoiceState extends EventEmitter {
  constructor() {
    super();
    this.state = 'idle';
  }

  setState(newState) {
    if (!VALID_STATES.has(newState)) {
      return;
    }

    if (this.state === newState) {
      return;
    }

    this.state = newState;
    this.emit('change', newState);
  }

  getState() {
    return this.state;
  }
}

module.exports = new VoiceState();
