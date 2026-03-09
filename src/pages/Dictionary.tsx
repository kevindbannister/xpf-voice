import React from "react";
import Card from "../components/ui/Card";

export default function Dictionary() {
  return (
    <div className="page-frame">
      <h2>Dictionary</h2>
      <Card style={{ padding: 18 }}>
        <p className="muted">Manage custom replacements and vocabulary used during transcription.</p>
      </Card>
    </div>
  );
}
