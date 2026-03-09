import React from "react";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";

export default function Style() {
  return (
    <div>
      <TopBar title="Style" subtitle="Configure writing style and formatting defaults." />
      <Card>
        <p style={{ margin: 0 }}>Style presets will appear here for tone, punctuation, and formatting preferences.</p>
      </Card>
    </div>
  );
}
