import React, { useState } from "react";
import HistorySettings from "../settings/HistorySettings";
import DictionarySettings from "../settings/DictionarySettings";
import SnippetSettings from "../settings/SnippetSettings";
import Settings from "../../pages/Settings";

export default function MainLayout() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    if (page === "history") return <HistorySettings />;
    if (page === "dictionary") return <DictionarySettings />;
    if (page === "snippets") return <SnippetSettings />;
    if (page === "settings") return <Settings />;

    return (
      <div style={{ padding: 30 }}>
        <h1>Welcome back, Kev</h1>
        <p>XProFlow Voice is ready.</p>

        <h2>Recent Voice Activity</h2>
        <HistorySettings />
      </div>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: 220,
          background: "#f5f5f5",
          padding: 20,
        }}
      >
        <h2>XProFlow</h2>

        <div style={{ marginTop: 30 }}>
          <button onClick={() => setPage("home")}>Home</button>
          <br />
          <br />
          <button onClick={() => setPage("history")}>History</button>
          <br />
          <br />
          <button onClick={() => setPage("dictionary")}>Dictionary</button>
          <br />
          <br />
          <button onClick={() => setPage("snippets")}>Snippets</button>
          <br />
          <br />
          <button onClick={() => setPage("settings")}>Settings</button>
        </div>
      </div>

      <div style={{ flex: 1, background: "#ffffff" }}>{renderPage()}</div>
    </div>
  );
}
