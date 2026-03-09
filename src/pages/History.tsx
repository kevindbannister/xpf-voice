import React from "react";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import { historyStore } from "../stores/historyStore";
import { colors } from "../theme/colors";

export default function History() {
  return (
    <div>
      <TopBar title="History" subtitle="Review previous transcripts and AI outputs." />
      <div style={{ display: "grid", gap: 16 }}>
        {historyStore.map((item) => (
          <Card key={item.id}>
            <p style={{ margin: "0 0 8px 0", color: colors.mutedText, fontSize: 12 }}>{item.timestamp}</p>
            <p style={{ margin: "0 0 8px 0", color: colors.text }}>
              <strong>Transcript:</strong> {item.transcript}
            </p>
            <p style={{ margin: 0, color: colors.text }}>
              <strong>AI Output:</strong> {item.aiOutput}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
