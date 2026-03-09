import React, { useMemo, useState } from "react";
import Sidebar, { PageKey } from "./Sidebar";
import Home from "../../pages/Home";
import Dictionary from "../../pages/Dictionary";
import Snippets from "../../pages/Snippets";
import Style from "../../pages/Style";
import History from "../../pages/History";
import Settings from "../../pages/Settings";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

export default function Dashboard() {
  const [activePage, setActivePage] = useState<PageKey>("home");

  const page = useMemo(() => {
    if (activePage === "dictionary") return <Dictionary />;
    if (activePage === "snippets") return <Snippets />;
    if (activePage === "style") return <Style />;
    if (activePage === "history") return <History />;
    if (activePage === "settings") return <Settings />;
    return <Home />;
  }, [activePage]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: colors.background,
        color: colors.text,
        fontFamily: typography.fontFamily,
      }}
    >
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main style={{ flex: 1, padding: 24 }}>{page}</main>
    </div>
  );
}
