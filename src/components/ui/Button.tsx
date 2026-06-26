import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import "./ui.css";

type Size = "md" | "lg" | "xl";
type Variant = "primary" | "secondary";

const SIZE_STYLE: Record<Size, CSSProperties> = {
  md: { padding: "10px 16px", fontSize: 14, lineHeight: "20px" },
  lg: { padding: "12px 20px", fontSize: 16, lineHeight: "24px" },
  xl: { padding: "16px 28px", fontSize: 16, lineHeight: "24px" },
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  trailingIcon?: ReactNode;
  leadingIcon?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "lg",
  fullWidth = false,
  trailingIcon,
  leadingIcon,
  children,
  style,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`dxp-btn dxp-btn--${variant}`}
      style={{
        ...SIZE_STYLE[size],
        width: fullWidth ? "100%" : undefined,
        ...style,
      }}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
