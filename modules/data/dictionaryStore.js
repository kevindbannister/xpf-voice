const path = require('path');
const { APP_SUPPORT_DIR, readJsonFile, writeJsonFile } = require('./storageUtils');

const DICTIONARY_PATH = path.join(APP_SUPPORT_DIR, 'dictionary.json');

function normalize(entry) {
  return {
    trigger: (entry.trigger || '').trim(),
    replacement: entry.replacement || '',
  };
}

function getDictionary() {
  return readJsonFile(DICTIONARY_PATH, []);
}

function addDictionaryEntry(trigger, replacement) {
  const dictionary = getDictionary();
  const normalized = normalize({ trigger, replacement });

  if (!normalized.trigger) {
    return dictionary;
  }

  const deduped = dictionary.filter((item) => item.trigger !== normalized.trigger);
  deduped.push(normalized);
  writeJsonFile(DICTIONARY_PATH, deduped);

  return deduped;
}

function removeDictionaryEntry(trigger) {
  const dictionary = getDictionary();
  const next = dictionary.filter((item) => item.trigger !== trigger);
  writeJsonFile(DICTIONARY_PATH, next);
  return next;
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function applyDictionary(text) {
  let nextText = text || '';
  const dictionary = getDictionary();

  dictionary.forEach((entry) => {
    if (!entry.trigger) {
      return;
    }

    const pattern = new RegExp(escapeRegExp(entry.trigger), 'gi');
    nextText = nextText.replace(pattern, entry.replacement || '');
  });

  return nextText;
}

module.exports = {
  getDictionary,
  addDictionaryEntry,
  removeDictionaryEntry,
  applyDictionary,
};
