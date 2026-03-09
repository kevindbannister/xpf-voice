const path = require('path');
const { APP_SUPPORT_DIR, readJsonFile, writeJsonFile } = require('./storageUtils');

const SNIPPETS_PATH = path.join(APP_SUPPORT_DIR, 'snippets.json');

function normalize(entry) {
  return {
    trigger: (entry.trigger || '').trim(),
    output: entry.output || '',
  };
}

function getSnippets() {
  return readJsonFile(SNIPPETS_PATH, []);
}

function addSnippet(trigger, output) {
  const snippets = getSnippets();
  const normalized = normalize({ trigger, output });

  if (!normalized.trigger) {
    return snippets;
  }

  const deduped = snippets.filter((item) => item.trigger !== normalized.trigger);
  deduped.push(normalized);
  writeJsonFile(SNIPPETS_PATH, deduped);

  return deduped;
}

function removeSnippet(trigger) {
  const snippets = getSnippets();
  const next = snippets.filter((item) => item.trigger !== trigger);
  writeJsonFile(SNIPPETS_PATH, next);
  return next;
}

function matchSnippet(text) {
  const input = (text || '').trim();
  const snippets = getSnippets();
  const matched = snippets.find((item) => item.trigger === input);
  return matched ? matched.output : null;
}

module.exports = {
  getSnippets,
  addSnippet,
  removeSnippet,
  matchSnippet,
};
