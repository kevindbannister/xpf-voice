import React from "react";
import Card from "../components/ui/Card";
import DictionarySettings from "../components/settings/DictionarySettings";
import SnippetSettings from "../components/settings/SnippetSettings";
import HistorySettings from "../components/settings/HistorySettings";

export default function Settings() {
  return (
    <div className="page-frame">
      <h2>Settings</h2>
      <Card style={{ padding: 18 }}>
        <p className="muted">Manage account, notifications, and desktop application preferences.</p>
      </Card>

      <div className="settings-grid">
        <Card className="settings-card">
          <DictionarySettings />
        </Card>

        <Card className="settings-card">
          <SnippetSettings />
        </Card>
      </div>

      <Card className="settings-card">
        <HistorySettings />
      </Card>
    </div>
  );
}
