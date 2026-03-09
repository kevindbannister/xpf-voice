import React, { useState } from "react";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { colors } from "../theme/colors";

type DictionaryRow = { trigger: string; replacement: string };

export default function Dictionary() {
  const [rows, setRows] = useState<DictionaryRow[]>([
    { trigger: "BTW", replacement: "by the way" },
  ]);

  const updateRow = (index: number, key: keyof DictionaryRow, value: string) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  };

  return (
    <div>
      <TopBar title="Dictionary" subtitle="Manage trigger words and replacements." />
      <Card>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: `1px solid ${colors.border}`, padding: 8 }}>Trigger word</th>
              <th style={{ textAlign: "left", borderBottom: `1px solid ${colors.border}`, padding: 8 }}>Replacement</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={`${row.trigger}-${idx}`}>
                <td style={{ borderBottom: `1px solid ${colors.border}`, padding: 8 }}>
                  <input value={row.trigger} onChange={(e) => updateRow(idx, "trigger", e.target.value)} style={{ width: "100%", padding: 8 }} />
                </td>
                <td style={{ borderBottom: `1px solid ${colors.border}`, padding: 8 }}>
                  <input value={row.replacement} onChange={(e) => updateRow(idx, "replacement", e.target.value)} style={{ width: "100%", padding: 8 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 12 }}>
          <Button variant="secondary" onClick={() => setRows((prev) => [...prev, { trigger: "", replacement: "" }])}>
            Add Row
          </Button>
        </div>
      </Card>
    </div>
  );
}
