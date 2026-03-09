import React from "react";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

type TopBarProps = {
  title: string;
  subtitle?: string;
};

export default function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header style={{ marginBottom: 24 }}>
      <h1
        style={{
          margin: 0,
          color: colors.text,
          fontSize: typography.heading.h1,
          fontWeight: 700,
        }}
      >
        {title}
      </h1>
      {subtitle ? <p style={{ margin: "8px 0 0 0", color: colors.mutedText }}>{subtitle}</p> : null}
    </header>
  );
}
