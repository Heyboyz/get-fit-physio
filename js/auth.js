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
    if (!window.GFP_UTILS?.syncServer) throw new Error('Sistem belum siap.');
    
    const res = await window.GFP_UTILS.syncServer('login', { username: email, password });
    
    if (res && res.success) {
      const user = res.user || { name: 'Admin', role: 'Administrator' };
      const session = { email, name: user.nama || user.name, role: user.role, avatar: 'AD' };
      saveSession(session);
      return session;
    } else {
      throw new Error(res?.message || 'Email atau password salah.');
    }
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
