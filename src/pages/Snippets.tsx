import React from "react";
import Card from "../components/ui/Card";

export default function Snippets() {
  return (
    <div className="page-frame">
      <h2>Snippets</h2>
      <Card style={{ padding: 18 }}>
        <p className="muted">Create reusable text snippets for common responses and templates.</p>
      </Card>
    </div>
  );
}
