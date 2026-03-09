import React, { ButtonHTMLAttributes } from "react";
import { colors } from "../../theme/colors";
import { radius } from "../../theme/spacing";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({ variant = "primary", style, ...props }: ButtonProps) {
  const isPrimary = variant === "primary";
  return (
    <button
      {...props}
      style={{
        border: `1px solid ${isPrimary ? colors.primary : colors.border}`,
        background: isPrimary ? colors.primary : "#FFFFFF",
        color: isPrimary ? "#FFFFFF" : colors.text,
        borderRadius: radius.md,
        padding: "8px 12px",
        fontWeight: 600,
        cursor: "pointer",
        ...style,
      }}
    />
  );
}
