import type { InputHTMLAttributes, ReactNode } from "react";
import "./ui.css";

type Size = "md" | "lg";

const SIZE_PAD: Record<Size, { height: number; padX: number }> = {
  md: { height: 44, padX: 14 },
  lg: { height: 48, padX: 14 },
};

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  size?: Size;
  /** Trailing affordance (e.g. password show/hide eye toggle). */
  iconTrailing?: ReactNode;
}

export default function Input({
  label,
  required = false,
  error,
  hint,
  size = "lg",
  iconTrailing,
  id,
  style,
  ...rest
}: InputProps) {
  const { height, padX } = SIZE_PAD[size];
  const inputId = id ?? (label ? `in-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);

  return (
    <div style={{ width: "100%" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: "block",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--fg-secondary)",
            marginBottom: 6,
          }}
        >
          {label}
          {required && <span style={{ color: "var(--brand-600)" }}> *</span>}
        </label>
      )}

      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          id={inputId}
          className={`dxp-input${error ? " dxp-input--error" : ""}`}
          aria-invalid={error ? true : undefined}
          style={{
            height,
            padding: `0 ${iconTrailing ? 44 : padX}px 0 ${padX}px`,
            ...style,
          }}
          {...rest}
        />
        {iconTrailing && (
          <span
            style={{
              position: "absolute",
              right: 14,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {iconTrailing}
          </span>
        )}
      </div>

      {error ? (
        <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: "20px", color: "var(--fg-error)" }}>
          {error}
        </p>
      ) : hint ? (
        <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: "20px", color: "var(--fg-tertiary)" }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
