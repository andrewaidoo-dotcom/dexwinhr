import { Link } from "react-router-dom";
import AuthMarketingPanel from "../components/AuthMarketingPanel";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

/**
 * Minimal Login placeholder. The Sign Up flow links here ("Already have an
 * account? Sign in" and the "Sign in" CTA on the activated step); the full
 * Login screen (Login.dc.html) is a separate handoff to be built out.
 */
export default function Login() {
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
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 34,
              lineHeight: "42px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              margin: "0 0 8px",
            }}
          >
            Welcome back
          </h1>
          <p style={{ fontSize: 16, lineHeight: "24px", color: "var(--fg-tertiary)", margin: "0 0 36px" }}>
            Sign in to your DexwinPay account
          </p>

          <div style={{ marginBottom: 24 }}>
            <Input label="Email or phone" type="email" placeholder={'eg. "admin@dexwin.net"'} />
          </div>
          <div style={{ marginBottom: 32 }}>
            <Input label="Password" type="password" placeholder="Enter your password" />
          </div>

          <Button fullWidth size="xl">
            Sign in
          </Button>

          <p style={{ fontSize: 15, color: "var(--fg-tertiary)", margin: "28px 0 0" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "var(--brand-700)", fontWeight: 700, textDecoration: "none" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
