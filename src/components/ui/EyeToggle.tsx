interface EyeToggleProps {
  open: boolean;
  onToggle: () => void;
}

/** Eye / eye-off icon used to show or hide a password field's value. */
export default function EyeToggle({ open, onToggle }: EyeToggleProps) {
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={open ? "Hide password" : "Show password"}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      style={{ cursor: "pointer", display: "inline-flex", color: "var(--fg-quaternary)" }}
    >
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {open ? (
          <>
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19" />
            <path d="M6.61 6.61A18.5 18.5 0 0 0 2 12s3.5 8 10 8a9.12 9.12 0 0 0 5.39-1.61" />
            <line x1={2} y1={2} x2={22} y2={22} />
          </>
        ) : (
          <>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
            <circle cx={12} cy={12} r={3} />
          </>
        )}
      </svg>
    </span>
  );
}
