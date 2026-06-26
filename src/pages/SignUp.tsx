import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import AuthMarketingPanel from "../components/AuthMarketingPanel";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import EyeToggle from "../components/ui/EyeToggle";
import AppState, { type Account } from "../lib/appState";

type Step = "form" | "verify" | "activated";
type FieldErrors = Partial<Record<keyof Account, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_LEN = 6;

const ArrowRight = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const ArrowLeft = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const headingStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  color: "var(--fg-primary)",
} as const;

export default function SignUp() {
  const [step, setStep] = useState<Step>("form");
  const [account, setAccount] = useState<Account>(() => AppState.getAccount());
  const [errors, setErrors] = useState<FieldErrors>({});
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [otp, setOtp] = useState<string[]>(() => Array(OTP_LEN).fill(""));
  const [resendMsg, setResendMsg] = useState("");
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Hydrate from saved account state once on mount (parity with the prototype,
  // which polls for window.AppState before reading the account).
  useEffect(() => {
    setAccount(AppState.getAccount());
  }, []);

  function saveField(name: keyof Account, value: string) {
    setAccount((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    AppState.setAccount({ [name]: value });
  }

  function goVerify() {
    const next: FieldErrors = {};
    if (!account.firstName.trim()) next.firstName = "First name is required";
    if (!account.lastName.trim()) next.lastName = "Last name is required";
    if (!account.company.trim()) next.company = "Company name is required";
    if (!account.email.trim()) next.email = "Email is required";
    else if (!EMAIL_RE.test(account.email.trim())) next.email = "Enter a valid email";

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    // Fresh signup → reset all onboarding actions to their default "to do" state.
    AppState.set({ employees: "todo", payroll: "locked", wallet: "none" });
    AppState.clearEmployees();

    setErrors({});
    setOtp(Array(OTP_LEN).fill(""));
    setResendMsg("");
    setStep("verify");
  }

  // Focus the first OTP box when the verify step appears.
  useEffect(() => {
    if (step === "verify") otpRefs.current[0]?.focus();
  }, [step]);

  function onOtpChange(index: number, e: ChangeEvent<HTMLInputElement>) {
    const digit = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < OTP_LEN - 1) otpRefs.current[index + 1]?.focus();
  }

  function onOtpKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function onOtpPaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const digits = (e.clipboardData.getData("text") || "")
      .replace(/[^0-9]/g, "")
      .slice(0, OTP_LEN);
    if (!digits) return;
    const next = Array(OTP_LEN).fill("");
    for (let i = 0; i < digits.length; i++) next[i] = digits[i];
    setOtp(next);
    const focusIndex = Math.min(digits.length, OTP_LEN - 1);
    otpRefs.current[focusIndex]?.focus();
  }

  function onResend(e: React.MouseEvent) {
    e.preventDefault();
    setResendMsg("  Code resent ✓");
    window.setTimeout(() => setResendMsg(""), 3000);
  }

  const otpFilled = otp.every((d) => d !== "");
  const email = account.email || "your email";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "600px 1fr",
        minHeight: "100vh",
        background: "var(--bg-primary)",
        fontFamily: "var(--font-body)",
        color: "var(--fg-primary)",
      }}
    >
      <AuthMarketingPanel />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 56px",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: 520 }}>
          {step === "form" && (
            <>
              <h1 style={{ ...headingStyle, fontSize: 34, lineHeight: "42px", margin: "0 0 8px" }}>
                Create your account
              </h1>
              <p style={{ fontSize: 16, lineHeight: "24px", color: "var(--fg-tertiary)", margin: "0 0 36px" }}>
                Sign up as an administrator account for your company
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                <Input
                  label="First Name"
                  required
                  value={account.firstName}
                  onChange={(e) => saveField("firstName", e.target.value)}
                  error={errors.firstName}
                  placeholder={'eg. "Seth"'}
                />
                <Input
                  label="Last Name"
                  required
                  value={account.lastName}
                  onChange={(e) => saveField("lastName", e.target.value)}
                  error={errors.lastName}
                  placeholder={'eg. "Walker"'}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <Input
                  label="Company Name"
                  required
                  value={account.company}
                  onChange={(e) => saveField("company", e.target.value)}
                  error={errors.company}
                  placeholder={'eg. "Dexwin Company Ltd"'}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <Input
                  label="Email"
                  type="email"
                  required
                  value={account.email}
                  onChange={(e) => saveField("email", e.target.value)}
                  error={errors.email}
                  placeholder={'eg. "admin@dexwin.net"'}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--fg-secondary)",
                    marginBottom: 6,
                  }}
                >
                  Phone Number <span style={{ color: "var(--brand-600)" }}>*</span>
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "132px 1fr", gap: 12 }}>
                  <Select
                    defaultValue={account.dial || "gh"}
                    onChange={(e) => saveField("dial", e.target.value)}
                  >
                    <option value="gh">GH(+233)</option>
                    <option value="ng">NG(+234)</option>
                    <option value="uk">UK(+44)</option>
                    <option value="us">US(+1)</option>
                  </Select>
                  <Input
                    type="tel"
                    value={account.phone}
                    onChange={(e) => saveField("phone", e.target.value)}
                    placeholder={'eg. "(54) 000-0000"'}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <Input
                  label="Create Password"
                  required
                  type={show1 ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a secure password"
                  hint="Use 8 characters with letters, numbers, and symbols."
                  iconTrailing={<EyeToggle open={show1} onToggle={() => setShow1((v) => !v)} />}
                />
              </div>

              <div style={{ marginBottom: 32 }}>
                <Input
                  label="Confirm Password"
                  required
                  type={show2 ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  iconTrailing={<EyeToggle open={show2} onToggle={() => setShow2((v) => !v)} />}
                />
              </div>

              <Button fullWidth size="xl" onClick={goVerify}>
                Continue
              </Button>

              <p style={{ fontSize: 15, color: "var(--fg-tertiary)", margin: "28px 0 0" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "var(--brand-700)", fontWeight: 700, textDecoration: "none" }}>
                  Sign in
                </Link>
              </p>
            </>
          )}

          {step === "verify" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <svg width={56} height={56} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="vm_mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="56" height="56">
                    <rect width="56" height="56" fill="url(#vm_grad)" />
                  </mask>
                  <g mask="url(#vm_mask)">
                    <circle cx="28" cy="28" r="27.5" fill="#ECFDF3" stroke="#ABEFC6" />
                  </g>
                  <rect x="10" y="10" width="36" height="36" rx="18" fill="#079455" />
                  <path
                    d="M19.6667 23.8334L26.4708 28.5962C27.0218 28.9819 27.2973 29.1748 27.5969 29.2495C27.8616 29.3154 28.1384 29.3154 28.4031 29.2495C28.7028 29.1748 28.9783 28.9819 29.5293 28.5962L36.3334 23.8334M23.6667 34.6667H32.3334C33.7335 34.6667 34.4335 34.6667 34.9683 34.3942C35.4387 34.1545 35.8212 33.7721 36.0609 33.3017C36.3334 32.7669 36.3334 32.0668 36.3334 30.6667V25.3334C36.3334 23.9332 36.3334 23.2332 36.0609 22.6984C35.8212 22.228 35.4387 21.8455 34.9683 21.6059C34.4335 21.3334 33.7335 21.3334 32.3334 21.3334H23.6667C22.2666 21.3334 21.5665 21.3334 21.0317 21.6059C20.5613 21.8455 20.1789 22.228 19.9392 22.6984C19.6667 23.2332 19.6667 23.9332 19.6667 25.3334V30.6667C19.6667 32.0668 19.6667 32.7669 19.9392 33.3017C20.1789 33.7721 20.5613 34.1545 21.0317 34.3942C21.5665 34.6667 22.2666 34.6667 23.6667 34.6667Z"
                    stroke="white"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="vm_grad" x1="28" y1="0" x2="28" y2="56" gradientUnits="userSpaceOnUse">
                      <stop />
                      <stop offset="1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <h1 style={{ ...headingStyle, fontSize: 30, lineHeight: "38px", margin: "0 0 12px" }}>
                Verify your email
              </h1>
              <p style={{ fontSize: 16, lineHeight: "24px", color: "var(--fg-tertiary)", margin: "0 auto 28px", maxWidth: 380 }}>
                We've sent a 6-digit code to {email}. Enter the code to verify your email
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 14 }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      otpRefs.current[i] = el;
                    }}
                    className={`otp-box${digit ? " filled" : ""}`}
                    inputMode="numeric"
                    maxLength={1}
                    placeholder="0"
                    value={digit}
                    onChange={(e) => onOtpChange(i, e)}
                    onKeyDown={(e) => onOtpKeyDown(i, e)}
                    onPaste={onOtpPaste}
                  />
                ))}
              </div>

              <p style={{ fontSize: 14, color: "var(--fg-tertiary)", margin: "0 0 28px" }}>
                Didn't get a code?{" "}
                <a
                  href="#"
                  className="resend-link"
                  onClick={onResend}
                  style={{
                    color: "var(--fg-secondary)",
                    fontWeight: 500,
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                  }}
                >
                  Click to resend
                </a>
                .<span style={{ color: "var(--brand-600)", fontWeight: 600 }}>{resendMsg}</span>
              </p>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  disabled={!otpFilled}
                  onClick={() => otpFilled && setStep("activated")}
                  trailingIcon={<ArrowRight />}
                  style={{ width: 340, maxWidth: "100%", padding: "14px 24px" }}
                >
                  Verify &amp; continue
                </Button>
              </div>

              <p style={{ fontSize: 14, color: "var(--fg-tertiary)", margin: "24px 0 0" }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep("form");
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--brand-700)",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <ArrowLeft />
                  Back to sign up
                </a>
              </p>
            </div>
          )}

          {step === "activated" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <svg width={56} height={56} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="aa_mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="56" height="56">
                    <rect width="56" height="56" fill="url(#aa_grad)" />
                  </mask>
                  <g mask="url(#aa_mask)">
                    <circle cx="28" cy="28" r="27.5" fill="#ECFDF3" stroke="#ABEFC6" />
                  </g>
                  <rect x="10" y="10" width="36" height="36" rx="18" fill="#079455" />
                  <path
                    d="M28.0001 30.9167H24.2501C23.0871 30.9167 22.5056 30.9167 22.0325 31.0602C20.9671 31.3834 20.1334 32.217 19.8103 33.2824C19.6667 33.7555 19.6667 34.337 19.6667 35.5M31.3334 33L33.0001 34.6667L36.3334 31.3333M30.0834 24.25C30.0834 26.3211 28.4045 28 26.3334 28C24.2623 28 22.5834 26.3211 22.5834 24.25C22.5834 22.1789 24.2623 20.5 26.3334 20.5C28.4045 20.5 30.0834 22.1789 30.0834 24.25Z"
                    stroke="white"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="aa_grad" x1="28" y1="0" x2="28" y2="56" gradientUnits="userSpaceOnUse">
                      <stop />
                      <stop offset="1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <h1 style={{ ...headingStyle, fontSize: 30, lineHeight: "38px", margin: "0 0 12px" }}>
                Account activated
              </h1>
              <p style={{ fontSize: 16, lineHeight: "24px", color: "var(--fg-tertiary)", margin: "0 auto 32px", maxWidth: 360 }}>
                Your account has been successfully activated. Please sign in to continue.
              </p>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button trailingIcon={<ArrowRight />} style={{ width: 340, maxWidth: "100%", padding: "14px 24px" }}>
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
