import React from "react";
import Card from "../components/ui/Card";

export default function Style() {
  return (
    <div className="page-frame">
      <h2>Style</h2>
      <Card style={{ padding: 18 }}>
        <p className="muted">Tune tone, punctuation, and formatting for your generated writing style.</p>
      </Card>
    </div>
  );
}
