/**
 * GET FIT PHYSIO — App Router & Bootstrap
 * Controls view switching, login modal, toast notifications, dark mode
 */

const App = (() => {

  const VIEWS = ['landing', 'form', 'dashboard'];
  let currentView = 'landing';

  // ─── Toast system ─────────────────────────────────────────────────────────
  const Toast = {
    show(message, type = 'info', title = '') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const icons = {
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
        error:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
        warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        info:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`,
      };
      const defaultTitles = { success: 'Berhasil', error: 'Error', warning: 'Perhatian', info: 'Info' };

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
        <div class="toast-icon">${icons[type] || icons.info}</div>
        <div class="toast-body">
          <div class="toast-title">${title || defaultTitles[type] || ''}</div>
          <div class="toast-msg">${message}</div>
        </div>
        <button onclick="this.closest('.toast').remove()" style="color:var(--color-text-muted);flex-shrink:0;width:1.25rem;height:1.25rem;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:none;border:none;cursor:pointer;font-size:1rem;line-height:1;">×</button>
      `;

      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('removing');
        toast.addEventListener('animationend', () => toast.remove());
      }, 4500);
    }
  };

  // ─── Dark mode ────────────────────────────────────────────────────────────
  const DarkMode = {
    init() {
      const saved = localStorage.getItem('gfp_theme');
      if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    },
    toggle() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('gfp_theme', next);
    }
  };

  // ─── Show / hide view ─────────────────────────────────────────────────────
  function showView(viewName) {
    if (!VIEWS.includes(viewName)) return;

    // Auth guard: dashboard requires login
    if (viewName === 'dashboard' && !window.GFP_AUTH?.isLoggedIn()) {
      showLoginModal();
      return;
    }

    currentView = viewName;
    VIEWS.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.classList.toggle('hidden', v !== viewName);
    });

    // Show/hide main nav
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.toggle('hidden', viewName === 'dashboard');

    // Init view-specific modules
    if (viewName === 'landing') {
      window.GFP_Landing?.init();
      window.scrollTo({ top: 0 });
    } else if (viewName === 'form') {
      window.scrollTo({ top: 0 });
      setTimeout(() => window.GFP_Form?.init(), 50);
    } else if (viewName === 'dashboard') {
      setTimeout(() => window.GFP_Dashboard?.init(), 50);
    }
  }

  // ─── Login modal ──────────────────────────────────────────────────────────
  function showLoginModal() {
    const existing = document.getElementById('login-modal-backdrop');
    if (existing) { existing.classList.remove('hidden'); return; }

    const backdrop = document.createElement('div');
    backdrop.id = 'login-modal-backdrop';
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <div class="modal" role="dialog" aria-labelledby="login-title">
        <button class="modal-close" id="login-close-btn" aria-label="Tutup">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.125rem;height:1.125rem;">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-6);">
          <div style="width:2.75rem;height:2.75rem;background:linear-gradient(135deg,var(--clr-primary-500),var(--clr-primary-700));border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-teal);">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:1.25rem;height:1.25rem;">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div>
            <div id="login-title" class="modal-title" style="margin-bottom:0;">Login Admin</div>
            <div class="modal-subtitle" style="margin-bottom:0;">Get Fit Physio Dashboard</div>
          </div>
        </div>



        <form id="login-form" novalidate>
          <div style="display:flex;flex-direction:column;gap:var(--space-4);margin-bottom:var(--space-5);">
            <div class="form-group">
              <label class="form-label" for="login-email">Email Admin</label>
              <input
                id="login-email"
                class="form-control"
                type="email"
                placeholder="Masukkan email"
                autocomplete="email"
              >
              <div id="login-email-err" class="form-error-msg"></div>
            </div>
            <div class="form-group">
              <label class="form-label" for="login-password">Password</label>
              <div style="position:relative;">
                <input
                  id="login-password"
                  class="form-control"
                  type="password"
                  placeholder="Masukkan password"
                  autocomplete="current-password"
                >
                <button type="button" id="toggle-password" style="position:absolute;right:var(--space-3);top:50%;transform:translateY(-50%);color:var(--color-text-muted);background:none;border:none;cursor:pointer;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem;">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <div id="login-pass-err" class="form-error-msg"></div>
            </div>
          </div>
          <div id="login-global-err" class="form-error-msg" style="margin-bottom:var(--space-3);"></div>
          <button type="submit" id="login-submit-btn" class="btn btn-primary btn-lg" style="width:100%;">
            Masuk ke Dashboard
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(backdrop);

    // Close handlers
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeLoginModal(); });
    document.getElementById('login-close-btn')?.addEventListener('click', closeLoginModal);

    // Toggle password
    document.getElementById('toggle-password')?.addEventListener('click', () => {
      const inp = document.getElementById('login-password');
      if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
    });

    // Form submit
    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('login-submit-btn');
      const errEl     = document.getElementById('login-global-err');
      const emailVal  = document.getElementById('login-email')?.value?.trim();
      const passVal   = document.getElementById('login-password')?.value;

      // Basic client validation
      let ok = true;
      if (!emailVal) {
        document.getElementById('login-email-err').textContent = 'Email wajib diisi.';
        ok = false;
      } else {
        document.getElementById('login-email-err').textContent = '';
      }
      if (!passVal) {
        document.getElementById('login-pass-err').textContent = 'Password wajib diisi.';
        ok = false;
      } else {
        document.getElementById('login-pass-err').textContent = '';
      }
      if (!ok) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      if (errEl) errEl.textContent = '';

      try {
        await window.GFP_AUTH.login(emailVal, passVal);
        closeLoginModal();
        showView('dashboard');
        Toast.show('Login berhasil! Selamat datang di dashboard.', 'success', 'Berhasil');
      } catch (err) {
        if (errEl) errEl.textContent = err.message || 'Login gagal.';
        document.getElementById('login-email')?.classList.add('error');
        document.getElementById('login-password')?.classList.add('error');
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });
  }

  function closeLoginModal() {
    document.getElementById('login-modal-backdrop')?.remove();
  }

  // ─── Logout ───────────────────────────────────────────────────────────────
  function logout() {
    window.GFP_AUTH?.logout();
    showView('landing');
    Toast.show('Anda berhasil logout.', 'info', 'Logout');
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  function init() {
    // Dark mode
    DarkMode.init();
    document.querySelectorAll('.dark-toggle').forEach(btn => {
      btn.addEventListener('click', DarkMode.toggle.bind(DarkMode));
    });

    // CTA buttons
    document.getElementById('cta-daftar')?.addEventListener('click', () => showView('form'));
    document.getElementById('cta-login')?.addEventListener('click', () => {
      if (window.GFP_AUTH?.isLoggedIn()) showView('dashboard');
      else showLoginModal();
    });
    document.getElementById('nav-cta-daftar')?.addEventListener('click', () => showView('form'));
    document.getElementById('nav-cta-login')?.addEventListener('click', () => {
      if (window.GFP_AUTH?.isLoggedIn()) showView('dashboard');
      else showLoginModal();
    });

    // Expose to dashboard back button
    document.getElementById('back-to-landing')?.addEventListener('click', () => showView('landing'));

    // Expose toast globally
    window.GFP_Toast = Toast;

    // Initial view
    const hash = window.location.hash.replace('#', '');
    if (VIEWS.includes(hash) && hash !== 'dashboard') showView(hash);
    else showView('landing');
  }

  return { init, showView, showLoginModal, logout };
})();

window.GFP_App = App;

// Auto-init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init.bind(App));
} else {
  App.init();
}
