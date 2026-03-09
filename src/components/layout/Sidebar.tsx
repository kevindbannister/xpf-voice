import React from "react";
import { BookText, Home, PenSquare, Settings, Scissors, Type } from "lucide-react";

export type PageKey = "home" | "dictionary" | "snippets" | "style" | "history" | "settings";

type SidebarProps = {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
};

const navItems: Array<{ key: PageKey; label: string; icon: React.ReactNode }> = [
  { key: "home", label: "Home", icon: <Home size={18} /> },
  { key: "dictionary", label: "Dictionary", icon: <BookText size={18} /> },
  { key: "snippets", label: "Snippets", icon: <Scissors size={18} /> },
  { key: "style", label: "Style", icon: <Type size={18} /> },
  { key: "history", label: "Scratchpad", icon: <PenSquare size={18} /> },
  { key: "settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <nav>
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`nav-item ${activePage === item.key ? "active" : ""}`}
            onClick={() => onNavigate(item.key)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
