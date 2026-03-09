import React from "react";
import { Bell, CircleUserRound, Workflow } from "lucide-react";

export default function TopBar() {
  return (
    <header className="top-bar">
      <div className="brand">
        <Workflow size={24} />
        Flow
        <small>Basic</small>
      </div>
      <div className="top-icons">
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button className="icon-button" type="button" aria-label="Profile">
          <CircleUserRound size={18} />
        </button>
      </div>
    </header>
  );
}
