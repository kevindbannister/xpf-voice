const { ipcMain } = require('electron');
const dictionaryStore = require('../../modules/data/dictionaryStore');
const snippetStore = require('../../modules/data/snippetStore');
const historyStore = require('../../modules/data/historyStore');
const settings = require('../../config/settings');

ipcMain.handle('dictionary:getAll', async () => {
  return dictionaryStore.getDictionary();
});

ipcMain.handle('dictionary:add', async (_event, rule = {}) => {
  const { trigger = '', replacement = '' } = rule;
  return dictionaryStore.addDictionaryEntry(trigger, replacement);
});

ipcMain.handle('dictionary:remove', async (_event, trigger) => {
  return dictionaryStore.removeDictionaryEntry(trigger);
});

ipcMain.handle('snippet:getAll', async () => {
  return snippetStore.getSnippets();
});

ipcMain.handle('snippet:add', async (_event, snippet = {}) => {
  const { trigger = '', output = '' } = snippet;
  return snippetStore.addSnippet(trigger, output);
});

ipcMain.handle('snippet:remove', async (_event, trigger) => {
  return snippetStore.removeSnippet(trigger);
});

ipcMain.handle('history:getAll', async (_event, limit = 50) => {
  return historyStore.getHistory(limit);
});

ipcMain.handle('history:clear', async () => {
  historyStore.clearHistory();
  return [];
});

ipcMain.handle('settings:get', async () => {
  return settings.getSettings();
});

ipcMain.handle('settings:update', async (_event, nextSettings = {}) => {
  return settings.saveSettings(nextSettings);
});
