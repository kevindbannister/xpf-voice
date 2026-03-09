import React, { useMemo, useState } from "react";
import Sidebar, { PageKey } from "./Sidebar";
import TopBar from "./TopBar";
import Home from "../../pages/Home";
import Dictionary from "../../pages/Dictionary";
import Snippets from "../../pages/Snippets";
import Style from "../../pages/Style";
import History from "../../pages/History";
import Settings from "../../pages/Settings";

export default function MainLayout() {
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
    <div className="app-shell">
      <TopBar />
      <div className="content-row">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <main className="main-content">{page}</main>
      </div>
    </div>
  );
}
