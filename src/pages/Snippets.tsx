import React, { useState } from "react";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { colors } from "../theme/colors";

type SnippetRow = { trigger: string; text: string };

export default function Snippets() {
  const [rows, setRows] = useState<SnippetRow[]>([
    { trigger: "linkedin", text: "https://linkedin.com/in/kevindbannister" },
  ]);

  const updateRow = (index: number, key: keyof SnippetRow, value: string) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  return (
    <div>
      <TopBar title="Snippets" subtitle="Create reusable blocks of text." />
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: `1px solid ${colors.border}`, padding: 8 }}>Trigger</th>
              <th style={{ textAlign: "left", borderBottom: `1px solid ${colors.border}`, padding: 8 }}>Text block</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={`${row.trigger}-${idx}`}>
                <td style={{ borderBottom: `1px solid ${colors.border}`, padding: 8 }}>
                  <input value={row.trigger} onChange={(e) => updateRow(idx, "trigger", e.target.value)} style={{ width: "100%", padding: 8 }} />
                </td>
                <td style={{ borderBottom: `1px solid ${colors.border}`, padding: 8 }}>
                  <input value={row.text} onChange={(e) => updateRow(idx, "text", e.target.value)} style={{ width: "100%", padding: 8 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 12 }}>
          <Button variant="secondary" onClick={() => setRows((prev) => [...prev, { trigger: "", text: "" }])}>
            Add Row
          </Button>
        </div>
      </Card>
    </div>
  );
}
