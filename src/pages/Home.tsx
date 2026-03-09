import React from "react";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { colors } from "../theme/colors";
import { historyStore } from "../stores/historyStore";

const stats = [
  { label: "Words processed", value: "12,480" },
  { label: "Voice sessions", value: "38" },
  { label: "Average WPM", value: "132" },
];

export default function Home() {
  return (
    <div>
      <TopBar title="Welcome back, Kevin" subtitle="Here is your XProFlow Voice dashboard overview." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, marginBottom: 24 }}>
        {stats.map((item) => (
          <Card key={item.label}>
            <p style={{ margin: 0, color: colors.mutedText, fontSize: 14 }}>{item.label}</p>
            <p style={{ margin: "8px 0 0 0", color: colors.text, fontSize: 28, fontWeight: 700 }}>{item.value}</p>
          </Card>
        ))}
      </div>

      <Card title="Recent Activity">
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {historyStore.map((item) => (
            <li
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr auto",
                gap: 12,
                padding: "12px 0",
                borderBottom: `1px solid ${colors.border}`,
                alignItems: "center",
              }}
            >
              <span style={{ color: colors.mutedText, fontWeight: 600 }}>{item.timestamp}</span>
              <span style={{ color: colors.text }}>{item.transcript}</span>
              <Badge>AI Ready</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
