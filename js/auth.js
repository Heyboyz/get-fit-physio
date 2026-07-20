/**
 * GET FIT PHYSIO — Auth Module
 * Demo login. Structure is ready to plug in a real backend.
 */

const AUTH = (() => {
  // ─── Demo credentials ─────────────────────────────────────────────────────
  const DEMO_USERS = [
    {
      email:    'admin@getfitphysio.com',
      password: 'admin123',
      name:     'Admin GFP',
      role:     'Administrator',
      avatar:   'AG',
    },
    {
      email:    'dewi@getfitphysio.com',
      password: 'terapis123',
      name:     'Dewi Rahayu',
      role:     'Terapis',
      avatar:   'DR',
    },
  ];

  const SESSION_KEY = 'gfp_session';

  // ─── Login ────────────────────────────────────────────────────────────────
  async function login(email, password) {
    // Simulate API call delay
    await sleep(900);

    // If a real endpoint is configured, use it:
    if (window.GFP_CONFIG?.AUTH_ENDPOINT) {
      const res = await fetch(window.GFP_CONFIG.AUTH_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Login gagal. Periksa email dan password.');
      const user = await res.json();
      saveSession(user);
      return user;
    }

    // Demo mode
    const user = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) throw new Error('Email atau password tidak valid.');
    const session = { email: user.email, name: user.name, role: user.role, avatar: user.avatar };
    saveSession(session);
    return session;
  }

  // ─── Logout ───────────────────────────────────────────────────────────────
  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  // ─── Session helpers ──────────────────────────────────────────────────────
  function saveSession(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  function isLoggedIn() {
    return !!sessionStorage.getItem(SESSION_KEY);
  }

  function getCurrentUser() {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  // ─── Utility ─────────────────────────────────────────────────────────────
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return { login, logout, isLoggedIn, getCurrentUser };
})();

window.GFP_AUTH = AUTH;
