import React, { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: 999,
        background: "#F3F4F6",
        padding: "6px 10px",
        fontSize: 14,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {children}
    </span>
  );
}
