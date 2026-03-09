import React from "react";
import Card from "../components/ui/Card";

export default function Settings() {
  return (
    <div className="page-frame">
      <h2>Settings</h2>
      <Card style={{ padding: 18 }}>
        <p className="muted">Manage account, notifications, and desktop application preferences.</p>
      </Card>
    </div>
  );
}
