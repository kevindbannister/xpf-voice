import React, { CSSProperties, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

export default function Card({ children, style, className = "" }: CardProps) {
  return (
    <section
      className={className}
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: 14,
        ...style,
      }}
    >
      {children}
    </section>
  );
}
