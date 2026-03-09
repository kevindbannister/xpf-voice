import React from "react";
import Card from "../components/ui/Card";

export default function History() {
  return (
    <div className="page-frame">
      <h2>Scratchpad</h2>
      <Card style={{ padding: 18 }}>
        <p className="muted">Jot down rough notes before turning them into polished voice output.</p>
      </Card>
    </div>
  );
}
