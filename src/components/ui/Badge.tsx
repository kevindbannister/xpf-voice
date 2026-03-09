import React, { ReactNode } from "react";
import { colors } from "../../theme/colors";
import { radius } from "../../theme/spacing";

type BadgeProps = {
  children: ReactNode;
};

export default function Badge({ children }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: colors.activeNav,
        color: colors.primary,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        padding: "4px 8px",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}
