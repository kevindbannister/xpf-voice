import React from "react";
import Card from "../components/layout/Card";
import TopBar from "../components/layout/TopBar";
import { colors } from "../theme/colors";

const stats = [
  { label: "Words processed", value: "12,480" },
  { label: "Voice sessions", value: "38" },
  { label: "Avg WPM", value: "132" },
];

const activity = [
  { time: "09:42", text: "Meeting notes captured for Product Standup" },
  { time: "11:08", text: "Dictionary updated with client terminology" },
  { time: "14:15", text: "Drafted release summary using voice snippets" },
  { time: "16:03", text: "Follow-up email dictated and revised" },
];

export default function Home() {
  return (
    <div>
      <TopBar title="Welcome back, Kevin" subtitle="Here is your voice productivity overview." />

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
          {activity.map((item) => (
            <li
              key={`${item.time}-${item.text}`}
              style={{
                display: "grid",
                gridTemplateColumns: "88px 1fr",
                gap: 12,
                padding: "12px 0",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <span style={{ color: colors.mutedText, fontWeight: 600 }}>{item.time}</span>
              <span style={{ color: colors.text }}>{item.text}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
