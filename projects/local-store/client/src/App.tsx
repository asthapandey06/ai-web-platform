import { FormEvent, useEffect, useState } from "react";

type Merchant = {
  displayName: string;
  email: string;
};

type AuthState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "signed-in"; merchant: Merchant }
  | { status: "error"; message: string };

const navigation = [
  { id: "inventory", label: "Inventory", description: "Manage merchant-entered stock.", available: true },
  { id: "scanner", label: "Scanner", description: "Barcode capture will be available in a later unit.", available: true },
  { id: "settings", label: "Settings", description: "Merchant settings will be available in a later unit.", available: true },
];

export function App() {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });
  const [activeSection, setActiveSection] = useState("inventory");

  useEffect(() => {
    void fetch("/api/auth/session")
      .then(async (response) => {
        if (response.ok) {
          const body = (await response.json()) as { merchant: Merchant };
          setAuth({ status: "signed-in", merchant: body.merchant });
          return;
        }
        if (response.status === 401) {
          setAuth({ status: "signed-out" });
          return;
        }
        throw new Error("Unable to check the merchant session.");
      })
      .catch((error: unknown) => {
        setAuth({ status: "error", message: error instanceof Error ? error.message : "Unable to connect to the Local Store API." });
      });
  }, []);

  if (auth.status === "loading") {
    return <main className="centered-state">Checking merchant session...</main>;
  }
  if (auth.status === "error") {
    return <main className="centered-state error-state">{auth.message}</main>;
  }
  if (auth.status === "signed-out") {
    return <Login onSignedIn={(merchant) => setAuth({ status: "signed-in", merchant })} />;
  }

  const activeItem = navigation.find((item) => item.id === activeSection) ?? navigation[0];
  return (
    <div className="app-frame">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">LS</span>
          <span>Local Store</span>
        </div>
        <p className="eyebrow">Merchant app</p>
        <nav aria-label="Merchant navigation">
          {navigation.map((item) => (
            <button
              className={item.id === activeSection ? "nav-item active" : "nav-item"}
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p className="muted">{auth.merchant.displayName}</p>
          <button className="text-button" onClick={() => void logout(setAuth)} type="button">
            Log out
          </button>
        </div>
      </aside>
      <main className="content">
        <header className="content-header">
          <div>
            <p className="eyebrow">Merchant workspace</p>
            <h1>{activeItem.label}</h1>
          </div>
          <span className="status-pill">Signed in</span>
        </header>
        <section className="empty-panel" aria-labelledby="section-title">
          <div className="panel-icon" aria-hidden="true">○</div>
          <h2 id="section-title">{activeItem.label}</h2>
          <p>{activeItem.description}</p>
          <span className="pending-label">Coming in a later unit</span>
        </section>
      </main>
    </div>
  );
}

function Login({ onSignedIn }: { onSignedIn: (merchant: Merchant) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = (await response.json()) as { merchant?: Merchant; error?: { message: string } };
      if (!response.ok || !body.merchant) {
        setMessage(body.error?.message ?? "Unable to sign in.");
        return;
      }
      onSignedIn(body.merchant);
    } catch {
      setMessage("Unable to connect to the Local Store API.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Local Store</p>
        <h1>Merchant sign in</h1>
        <p className="muted">Access the protected merchant workspace.</p>
        <form onSubmit={submit}>
          <label>
            Email
            <input autoComplete="email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
          </label>
          <label>
            Password
            <input autoComplete="current-password" minLength={12} onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />
          </label>
          {message && <p className="form-error" role="alert">{message}</p>}
          <button className="primary-button" disabled={submitting} type="submit">
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="pending-note">Merchant registration and verification rules are <strong>NEEDS_CONFIRMATION</strong>.</p>
      </section>
    </main>
  );
}

async function logout(setAuth: (state: AuthState) => void) {
  try {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) {
      setAuth({ status: "error", message: "Unable to log out." });
      return;
    }
    setAuth({ status: "signed-out" });
  } catch {
    setAuth({ status: "error", message: "Unable to connect to the Local Store API." });
  }
}
