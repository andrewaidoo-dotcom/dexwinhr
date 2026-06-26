import { Link } from "react-router-dom";

/**
 * Fixed 600px marketing panel shared by Sign Up and Login.
 * Brand photo + gradient overlay, headline, and 5-star social proof.
 */
export default function AuthMarketingPanel() {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "url(/assets/signup-gradient.png), url(/assets/signup-couple.png)",
        backgroundSize: "cover, cover",
        backgroundPosition: "center top, center top",
        backgroundRepeat: "no-repeat, no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 48,
        minHeight: "100vh",
      }}
    >
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "flex-start",
          gap: 5,
          textDecoration: "none",
          alignSelf: "flex-start",
        }}
      >
        <img src="/assets/dexwin-logo-onphoto.svg" alt="Dexwin" style={{ height: 30 }} />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: "0.04em",
            color: "#fff",
            marginTop: 3,
          }}
        >
          PAY
        </span>
      </Link>

      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            color: "#fff",
            fontSize: 52,
            lineHeight: "60px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
            maxWidth: 560,
            textWrap: "balance",
          }}
        >
          Comprehensive HR and Payroll Management from One Platform
        </h2>
        <p
          style={{
            color: "rgba(210,230,220,0.88)",
            fontSize: 20,
            lineHeight: "30px",
            margin: "0 0 36px",
            fontWeight: 500,
          }}
        >
          Designed to streamline your administrative processes
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src="/assets/signup-avatars.png" alt="Customers" style={{ height: 48 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "var(--warning-400)", letterSpacing: 2, fontSize: 18 }}>
              ★★★★★
            </span>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>5.0</span>
          </div>
        </div>
        <div
          style={{
            color: "var(--warning-400)",
            fontWeight: 600,
            fontSize: 15,
            marginTop: 6,
          }}
        >
          from 200+ reviews
        </div>
      </div>
    </div>
  );
}
