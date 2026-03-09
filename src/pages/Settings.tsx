import React, { useState } from "react";
import DictionarySettings from "../components/settings/DictionarySettings";
import SnippetSettings from "../components/settings/SnippetSettings";
import HistorySettings from "../components/settings/HistorySettings";

function VoiceSettings() {
  return <div>Voice settings</div>;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("voice");

  return (
    <div>
      <h2>Settings</h2>

      <div className="settings-tabs">
        <button onClick={() => setActiveTab("voice")}>Voice</button>
        <button onClick={() => setActiveTab("dictionary")}>Dictionary</button>
        <button onClick={() => setActiveTab("snippets")}>Snippets</button>
        <button onClick={() => setActiveTab("history")}>History</button>
      </div>

      {activeTab === "voice" && <VoiceSettings />}
      {activeTab === "dictionary" && <DictionarySettings />}
      {activeTab === "snippets" && <SnippetSettings />}
      {activeTab === "history" && <HistorySettings />}
    </div>
  );
}
