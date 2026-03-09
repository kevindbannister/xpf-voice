import React from "react";
import { BookText, Clock3, Home, Palette, Scissors, Settings } from "lucide-react";
import { colors } from "../../theme/colors";
import { radius } from "../../theme/spacing";

export type PageKey = "home" | "dictionary" | "snippets" | "style" | "history" | "settings";

type SidebarProps = {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
};

const navItems: Array<{ key: PageKey; label: string; icon: React.ReactNode }> = [
  { key: "home", label: "Home", icon: <Home size={18} /> },
  { key: "dictionary", label: "Dictionary", icon: <BookText size={18} /> },
  { key: "snippets", label: "Snippets", icon: <Scissors size={18} /> },
  { key: "style", label: "Style", icon: <Palette size={18} /> },
  { key: "history", label: "History", icon: <Clock3 size={18} /> },
  { key: "settings", label: "Settings", icon: <Settings size={18} /> },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside
      style={{
        width: 240,
        background: colors.sidebar,
        borderRight: `1px solid ${colors.border}`,
        padding: 16,
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: colors.text }}>XProFlow Voice</div>
      <nav style={{ display: "grid", gap: 8 }}>
        {navItems.map((item) => {
          const isActive = activePage === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderRadius: radius.md,
                border: `1px solid ${isActive ? colors.primary : "transparent"}`,
                background: isActive ? colors.activeNav : "transparent",
                color: colors.text,
                fontWeight: isActive ? 600 : 500,
                padding: "12px",
                cursor: "pointer",
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
