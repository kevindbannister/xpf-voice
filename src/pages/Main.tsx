import React from 'react';

export default function Main() {
  return (
    <div style={{ padding: 30 }}>
      <h1>XProFlow Voice</h1>

      <p>Main control panel for voice features.</p>

      <h2>History</h2>
      <div id="history-panel"></div>

      <h2>Dictionary</h2>
      <div id="dictionary-panel"></div>

      <h2>Snippets</h2>
      <div id="snippet-panel"></div>

      <h2>Settings</h2>
      <div id="settings-panel"></div>
    </div>
  );
}
