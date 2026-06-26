import type { SelectHTMLAttributes } from "react";
import "./ui.css";

type Size = "md" | "lg";

const SIZE_HEIGHT: Record<Size, number> = { md: 44, lg: 48 };

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: Size;
}

export default function Select({ size = "lg", style, children, ...rest }: SelectProps) {
  return (
    <select
      className="dxp-select"
      style={{
        height: SIZE_HEIGHT[size],
        padding: "0 38px 0 14px",
        ...style,
      }}
      {...rest}
    >
      {children}
    </select>
  );
}
