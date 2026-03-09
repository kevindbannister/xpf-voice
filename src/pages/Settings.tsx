import React from "react";
import TopBar from "../components/layout/TopBar";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Settings() {
  return (
    <div>
      <TopBar title="Settings" subtitle="Adjust global application preferences." />
      <Card>
        <p style={{ marginTop: 0 }}>XProFlow Voice desktop settings and integrations are managed here.</p>
        <Button>Save Preferences</Button>
      </Card>
    </div>
  );
}
