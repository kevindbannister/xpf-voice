const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('xpf', {
  getDictionary: () => ipcRenderer.invoke('dictionary:getAll'),
  addDictionary: (rule) => ipcRenderer.invoke('dictionary:add', rule),
  removeDictionary: (trigger) => ipcRenderer.invoke('dictionary:remove', trigger),

  getSnippets: () => ipcRenderer.invoke('snippet:getAll'),
  addSnippet: (snippet) => ipcRenderer.invoke('snippet:add', snippet),
  removeSnippet: (trigger) => ipcRenderer.invoke('snippet:remove', trigger),

  getHistory: (limit) => ipcRenderer.invoke('history:getAll', limit),
  clearHistory: () => ipcRenderer.invoke('history:clear'),

  getSettings: () => ipcRenderer.invoke('settings:get'),
  updateSettings: (nextSettings) => ipcRenderer.invoke('settings:update', nextSettings),
});
