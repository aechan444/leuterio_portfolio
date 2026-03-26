"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("admin_setup_complete");
    setSetupComplete(stored === "true");

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        localStorage.setItem("admin_setup_complete", "true");
        setSetupComplete(true);
        router.push("/admin");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.push("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      localStorage.setItem("admin_setup_complete", "true");
      router.push("/admin");
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: "admin" },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      localStorage.setItem("admin_setup_complete", "true");
      setSetupComplete(true);
      if (data.session) {
        router.push("/admin");
      } else {
        setSuccess("Account created! Check your email to confirm, then sign in.");
        setIsSignUp(false);
      }
      setPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#05070A",
        position: "relative",
        overflowY: "auto",
        padding: "40px 20px",
      }}
    >
      {/* 1. LAYERED DEPTH */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 20% 20%, rgba(155, 17, 30, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* 2. THE CRYSTAL SLAB */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "460px",
          background: "rgba(11, 15, 25, 0.85)",
          backdropFilter: "blur(40px) saturate(150%) contrast(110%)",
          WebkitBackdropFilter: "blur(40px) saturate(150%)",
          borderRadius: "32px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.7)",
          padding: "40px 35px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          animation: "monolith-entry 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Branding */}
        <div style={{ textAlign: "center" }}>
          <img
            src="/imgs/al_brokerage_gold_logo.png"
            alt="Anthony Leuterio"
            style={{
              height: "45px",
              width: "auto",
              marginBottom: "16px",
              mixBlendMode: "lighten",
              filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.2))",
            }}
          />
          <h1
            className="font-cinzel"
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: "0.9",
              margin: 0,
            }}
          >
            ADMIN<br />
            <span style={{ color: "var(--gold-majestic)", fontSize: "0.4em", letterSpacing: "0.5em", fontWeight: 400, textTransform: "uppercase", display: "block", marginTop: "8px" }}>
              Secure Gateway
            </span>
          </h1>
        </div>

        {/* Feedback Area */}
        {(error || success) && (
          <div
            className="font-mono"
            style={{
              background: error ? "rgba(155, 17, 30, 0.15)" : "rgba(212, 175, 55, 0.1)",
              border: `1px solid ${error ? "rgba(155, 17, 30, 0.3)" : "rgba(212, 175, 55, 0.3)"}`,
              color: error ? "#FF9999" : "var(--gold-majestic)",
              padding: "14px",
              borderRadius: "12px",
              fontSize: "0.7rem",
              textAlign: "center",
            }}
          >
            {error || success}
          </div>
        )}

        {/* Form Fields */}
        <form
          onSubmit={isSignUp ? handleSignUp : handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label className="font-mono" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Identifier
            </label>
            <input
              type="email"
              placeholder="admin@leuterio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "14px",
                borderRadius: "12px",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold-majestic)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label className="font-mono" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Security Cipher
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "14px",
                borderRadius: "12px",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold-majestic)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
            />
          </div>

          {isSignUp && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label className="font-mono" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Confirm Cipher
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "14px",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold-majestic)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
              />
            </div>
          )}

          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "var(--gold-majestic)",
                color: "black",
                padding: "16px",
                borderRadius: "100px",
                border: "none",
                fontWeight: 800,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.3s ease",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 10px 30px rgba(212, 175, 55, 0.2)",
              }}
            >
              {loading ? "AUTHENTICATING..." : isSignUp ? "INITIALIZE ADMIN" : "AUTHORIZE ACCESS"}
            </button>

            {!setupComplete && (
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "0.65rem",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
              >
                {isSignUp ? "← RETURN TO LOGIN" : "INITIALIZE NEW IDENTITY →"}
              </button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <a
            href="/"
            className="font-mono"
            style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", textDecoration: "none", letterSpacing: "0.1em" }}
          >
            RETURN_TO_ECOSYSTEM
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes monolith-entry {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
