import React, { CSSProperties, ReactNode } from "react";
import { colors } from "../../theme/colors";
import { radius, shadows } from "../../theme/spacing";

type CardProps = {
  title?: string;
  children: ReactNode;
  style?: CSSProperties;
};

export default function Card({ title, children, style }: CardProps) {
  return (
    <section
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        boxShadow: shadows.soft,
        padding: 16,
        ...style,
      }}
    >
      {title ? <h3 style={{ margin: "0 0 12px 0", color: colors.text }}>{title}</h3> : null}
      {children}
    </section>
  );
}
