/**
 * GET FIT PHYSIO — Dashboard Module
 * KPIs, tables, sidebar nav, sub-views, reports
 */

const Dashboard = (() => {

  let currentSubView = 'dashboard';
  const SUB_VIEWS = ['dashboard','pasien','jadwal','asesmen','laporan','pengaturan'];

  // ─── SVG Icons (inline) ───────────────────────────────────────────────────
  const ICONS = {
    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    trending: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.112 1.524 5.84L0 24l6.333-1.499A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.814 9.814 0 01-5.028-1.381l-.36-.213-3.762.889.926-3.651-.234-.374A9.804 9.804 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.77a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>`,
    save: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
    logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
  };

  function icon(name, cls = '') {
    const svg = ICONS[name] || '';
    return svg.replace('<svg ', `<svg class="${cls}" `);
  }

  // ─── Status badge HTML ────────────────────────────────────────────────────
  function statusBadge(status) {
    const cls = window.GFP_STATUS_BADGE?.[status] || 'badge-neutral';
    return `<span class="badge ${cls} badge-dot">${status}</span>`;
  }

  // ─── Settings / Update Credentials ─────────────────────────────────────────
  async function updateCredentials(btn) {
    const email = document.getElementById('cfg-admin-email')?.value?.trim();
    const pass = document.getElementById('cfg-admin-pass')?.value;
    
    if (!email || !pass) {
      window.GFP_Toast?.show('Email dan Password baru wajib diisi!', 'warning', 'Perhatian');
      return;
    }
    
    if (btn) btn.classList.add('loading');
    
    try {
      const res = await window.GFP_UTILS?.syncServer?.('update_credentials', { new_username: email, new_password: pass });
      if (res && res.success) {
        window.GFP_Toast?.show('Username dan Password berhasil diubah!', 'success', 'Berhasil');
        document.getElementById('cfg-admin-pass').value = '';
        // Update local session
        const sess = window.GFP_AUTH?.getCurrentUser();
        if (sess) {
          sess.email = email;
          sessionStorage.setItem('gfp_session', JSON.stringify(sess));
        }
      } else {
        window.GFP_Toast?.show(res?.message || 'Gagal menyimpan kredensial.', 'error', 'Error');
      }
    } catch (e) {
      window.GFP_Toast?.show('Terjadi kesalahan jaringan.', 'error', 'Error');
    } finally {
      if (btn) btn.classList.remove('loading');
    }
  }

  // ─── Delete Patient ───────────────────────────────────────────────────────
  async function deletePatient(patientId) {
    if (!confirm('Apakah Anda yakin ingin menghapus data pasien ini? Data yang dihapus tidak dapat dikembalikan.')) return;
    
    try {
      const res = await window.GFP_UTILS?.syncServer?.('delete_patient', { patient_id: patientId });
      if (res && res.success) {
        window.GFP_Toast?.show('Data pasien berhasil dihapus.', 'success', 'Terhapus');
        // Update local array
        window.GFP_PATIENTS = window.GFP_PATIENTS.filter(p => p.patient_id !== patientId);
        // Re-render
        switchSubView('pasien');
      } else {
        window.GFP_Toast?.show(res?.message || 'Gagal menghapus pasien.', 'error', 'Error');
      }
    } catch (e) {
      window.GFP_Toast?.show('Terjadi kesalahan jaringan.', 'error', 'Error');
    }
  }

  // ─── Render KPIs ──────────────────────────────────────────────────────────
  function renderKPIs() {
    const kpis = window.GFP_UTILS?.getKPIs?.() || { active:0, today:0, review:0, followupRate:0 };
    const container = document.getElementById('kpi-grid');
    if (!container) return;

    container.innerHTML = `
      <div class="stat-card stat-card-teal">
        <div class="stat-card-icon stat-icon-teal">${icon('users','sidebar-nav-icon')}</div>
        <div class="stat-card-value" data-count-to="${kpis.active}" data-count-suffix="">${kpis.active}</div>
        <div class="stat-card-label">Total Pasien Aktif</div>
        <div class="stat-card-change up">${icon('trending','sidebar-nav-icon')} +2 minggu ini</div>
      </div>
      <div class="stat-card stat-card-blue">
        <div class="stat-card-icon stat-icon-blue">${icon('calendar','sidebar-nav-icon')}</div>
        <div class="stat-card-value" data-count-to="${kpis.today}" data-count-suffix="">${kpis.today}</div>
        <div class="stat-card-label">Jadwal Hari Ini</div>
        <div class="stat-card-change up">${icon('clock','sidebar-nav-icon')} Hari ini</div>
      </div>
      <div class="stat-card stat-card-amber">
        <div class="stat-card-icon stat-icon-amber">${icon('alert','sidebar-nav-icon')}</div>
        <div class="stat-card-value" data-count-to="${kpis.review}" data-count-suffix="">${kpis.review}</div>
        <div class="stat-card-label">Need Review</div>
        <div class="stat-card-change down">${icon('alert','sidebar-nav-icon')} Perlu tindakan</div>
      </div>
      <div class="stat-card stat-card-green">
        <div class="stat-card-icon stat-icon-green">${icon('trending','sidebar-nav-icon')}</div>
        <div class="stat-card-value" data-count-to="${kpis.followupRate}" data-count-suffix="%">${kpis.followupRate}%</div>
        <div class="stat-card-label">Completion Rate</div>
        <div class="stat-card-change up">${icon('check','sidebar-nav-icon')} Sesi selesai</div>
      </div>
    `;
  }

  // ─── Render new patients table ────────────────────────────────────────────
  function renderNewPatients() {
    const container = document.getElementById('new-patients-table');
    if (!container) return;
    const patients = (window.GFP_PATIENTS || [])
      .filter(p => p.status === window.GFP_STATUS?.MENUNGGU || p.status === window.GFP_STATUS?.NEED_REVIEW)
      .slice(0, 5);

    if (!patients.length) {
      container.innerHTML = `<div class="table-empty">
        ${icon('users','empty-state-icon')}
        <p>Tidak ada pasien baru saat ini</p>
      </div>`;
      return;
    }

    container.innerHTML = `
      <div class="table-wrapper">
        <table class="table">
          <thead><tr>
            <th>Pasien</th><th>Layanan</th><th>Kontak</th><th>Tanggal</th><th>Status</th><th></th>
          </tr></thead>
          <tbody>
            ${patients.map(p => `
              <tr>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar avatar-sm">${window.GFP_UTILS?.getInitials(p.nama_pasien) || '?'}</div>
                    <div>
                      <div class="font-semibold text-sm">${p.nama_pasien}</div>
                      <div class="text-xs text-secondary">${p.umur} tahun · ${p.patient_id}</div>
                    </div>
                  </div>
                </td>
                <td><span class="text-sm">${p.layanan}</span></td>
                <td><span class="text-sm">${p.no_whatsapp}</span></td>
                <td><span class="text-sm">${window.GFP_UTILS?.formatDate(p.tanggal_input) || p.tanggal_input}</span></td>
                <td>${statusBadge(p.status)}</td>
                <td>
                  <button class="btn btn-sm btn-ghost" onclick="GFP_Dashboard.showPatientDetail('${p.patient_id}')" title="Detail">
                    ${icon('eye','sidebar-nav-icon')}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // ─── Render today's schedule ──────────────────────────────────────────────
  function renderTodaySchedule() {
    const container = document.getElementById('today-schedule');
    if (!container) return;
    const schedule = window.GFP_UTILS?.getTodaySchedule?.() || [];

    if (!schedule.length) {
      container.innerHTML = `<div class="table-empty">
        ${icon('calendar','empty-state-icon')}
        <p>Tidak ada jadwal hari ini</p>
      </div>`;
      return;
    }

    container.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:var(--space-2);">
        ${schedule.map(p => `
          <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--space-4);background:var(--color-bg);border-radius:var(--radius-md);border:1px solid var(--color-border);">
            <div style="width:4px;height:40px;background:var(--color-primary);border-radius:var(--radius-full);flex-shrink:0;"></div>
            <div style="width:3rem;text-align:center;flex-shrink:0;">
              <div style="font-size:var(--text-sm);font-weight:var(--font-bold);color:var(--color-primary);">${p.jam_jadwal}</div>
              <div style="font-size:10px;color:var(--color-text-muted);">WIB</div>
            </div>
            <div class="avatar avatar-sm">${window.GFP_UTILS?.getInitials(p.nama_pasien) || '?'}</div>
            <div style="flex:1;min-width:0;">
              <div class="font-semibold text-sm">${p.nama_pasien}</div>
              <div class="text-xs text-secondary">${p.layanan}</div>
            </div>
            <div style="text-align:right;flex-shrink:0;">
              <div class="text-xs font-medium text-secondary">${p.terapis || 'Belum ditetapkan'}</div>
              ${statusBadge(p.status)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ─── Render reminders ─────────────────────────────────────────────────────
  function renderReminders() {
    const container = document.getElementById('reminders-list');
    if (!container) return;
    const reminders = window.GFP_REMINDERS || [];

    container.innerHTML = `<div class="reminder-list">
      ${reminders.map(r => `
        <div class="reminder-item">
          <div class="reminder-icon ${r.color}">${icon('bell','')}</div>
          <div class="reminder-body">
            <div class="reminder-name">${r.nama}</div>
            <div class="reminder-detail">${r.jenis} · ${r.via} · <strong>${r.status}</strong></div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;">
            <div class="reminder-time">${r.jadwal}</div>
            <button class="btn btn-sm btn-outline-primary" style="font-size:10px;padding:2px 8px;">Kirim</button>
          </div>
        </div>
      `).join('')}
    </div>`;
  }

  // ─── Render follow-up / no-show ───────────────────────────────────────────
  function renderFollowUp() {
    const container = document.getElementById('followup-list');
    if (!container) return;
    const list = window.GFP_UTILS?.getFollowUpList?.() || [];

    if (!list.length) {
      container.innerHTML = `<div class="table-empty">${icon('check','empty-state-icon')}<p>Tidak ada pasien no-show</p></div>`;
      return;
    }

    container.innerHTML = `
      <div class="table-wrapper">
        <table class="table">
          <thead><tr>
            <th>Pasien</th><th>Jadwal</th><th>Status</th><th>Tindakan</th>
          </tr></thead>
          <tbody>
            ${list.map(p => `
              <tr>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar avatar-sm">${window.GFP_UTILS?.getInitials(p.nama_pasien) || '?'}</div>
                    <div>
                      <div class="font-semibold text-sm">${p.nama_pasien}</div>
                      <div class="text-xs text-secondary">${p.no_whatsapp}</div>
                    </div>
                  </div>
                </td>
                <td class="text-sm">${p.tanggal_jadwal ? `${window.GFP_UTILS?.formatDate(p.tanggal_jadwal)} · ${p.jam_jadwal}` : '-'}</td>
                <td>${statusBadge(p.status)}</td>
                <td>
                  <div class="flex gap-2">
                    <a href="https://wa.me/${p.no_whatsapp.replace(/\D/g,'').replace(/^0/,'62')}" target="_blank" class="btn btn-sm btn-primary" style="gap:4px;">
                      ${icon('whatsapp','')} WA
                    </a>
                    <button class="btn btn-sm btn-secondary">Reschedule</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // ─── Render Report Chart ──────────────────────────────────────────────────
  function renderReport() {
    const container = document.getElementById('report-chart');
    if (!container) return;
    const data = window.GFP_REPORT_WEEKLY || [];
    const maxVal = Math.max(...data.map(d => d.pasien), 1);

    container.innerHTML = `
      <div class="report-bar-chart">
        ${data.map(d => `
          <div class="report-bar-col">
            <div class="report-bar-value">${d.pasien}</div>
            <div class="report-bar-fill" style="height:${Math.round((d.pasien/maxVal)*80)+4}px;"></div>
            <div class="report-bar-label">${d.hari}</div>
          </div>
        `).join('')}
      </div>
      <div class="report-legend">
        <div class="report-legend-item">
          <div class="report-legend-dot" style="background:var(--color-primary);"></div>
          Pasien Hadir
        </div>
      </div>
    `;
  }

  // ─── Sub-view: Pasien ─────────────────────────────────────────────────────
  function renderPasienView() {
    const c = document.getElementById('sub-content');
    if (!c) return;
    const patients = window.GFP_PATIENTS || [];
    c.innerHTML = `
      <div class="sub-view">
        <div class="page-header">
          <div class="page-header-inner">
            <div>
              <h2 class="page-title">Daftar Pasien</h2>
              <p class="page-subtitle">Kelola semua data pasien klinik</p>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-primary btn-sm" onclick="GFP_App.showView('form')">
                ${icon('plus','sidebar-nav-icon')} Pasien Baru
              </button>
              <button class="btn btn-secondary btn-sm">${icon('download','sidebar-nav-icon')} Export</button>
            </div>
          </div>
        </div>
        <div class="table-action-row">
          <div class="search-input-wrapper">
            ${icon('users','')}
            <input class="form-control search-input" placeholder="Cari nama pasien..." style="max-width:260px;" id="search-patients" oninput="GFP_Dashboard.filterPatients(this.value)">
          </div>
          <div class="flex gap-2">
            <select class="form-control" style="width:auto;font-size:var(--text-sm);" id="filter-layanan">
              <option value="">Semua Layanan</option>
              ${(window.GFP_LAYANAN||[]).map(l=>`<option>${l}</option>`).join('')}
            </select>
            <select class="form-control" style="width:auto;font-size:var(--text-sm);" id="filter-status">
              <option value="">Semua Status</option>
              ${Object.values(window.GFP_STATUS||{}).map(s=>`<option>${s}</option>`).join('')}
            </select>
          </div>
        </div>
        <div id="patients-table-container">
          ${renderPatientsTable(patients)}
        </div>
      </div>
    `;
  }

  function renderPatientsTable(patients) {
    if (!patients.length) return `<div class="table-empty">${icon('users','empty-state-icon')}<h3>Belum ada data pasien</h3></div>`;
    return `
      <div class="table-wrapper">
        <table class="table">
          <thead><tr>
            <th>ID</th><th>Pasien</th><th>Layanan</th><th>Terapis</th><th>Jadwal</th><th>Status</th><th>Aksi</th>
          </tr></thead>
          <tbody>
            ${patients.map(p => `
              <tr>
                <td class="text-xs text-secondary font-semibold">${p.patient_id}</td>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar avatar-sm">${window.GFP_UTILS?.getInitials(p.nama_pasien)||'?'}</div>
                    <div>
                      <div class="font-semibold text-sm">${p.nama_pasien}</div>
                      <div class="text-xs text-secondary">${p.umur} tahun · ${p.no_whatsapp}</div>
                    </div>
                  </div>
                </td>
                <td class="text-sm">${p.layanan}</td>
                <td class="text-sm">${p.terapis || '<span class="text-muted">Belum</span>'}</td>
                <td class="text-sm">${p.tanggal_jadwal ? `${p.tanggal_jadwal} ${p.jam_jadwal}` : '<span class="text-muted">-</span>'}</td>
                <td>${statusBadge(p.status)}</td>
                <td>
                  <div class="flex gap-1">
                    <button class="btn btn-sm btn-ghost" onclick="GFP_Dashboard.showPatientDetail('${p.patient_id}')" title="Detail">${icon('eye','sidebar-nav-icon')}</button>
                    <button class="btn btn-sm btn-ghost" onclick="GFP_Dashboard.showEditPatient('${p.patient_id}')" title="Edit">${icon('edit','sidebar-nav-icon')}</button>
                    <a href="https://wa.me/${p.no_whatsapp.replace(/\D/g,'').replace(/^0/,'62')}" target="_blank" class="btn btn-sm btn-ghost" style="color:var(--color-success)" title="WhatsApp">${icon('phone','sidebar-nav-icon')}</a>
                    <button class="btn btn-sm btn-ghost" onclick="GFP_Dashboard.deletePatient('${p.patient_id}')" title="Hapus" style="color:var(--color-danger)">${icon('trash','sidebar-nav-icon')}</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function filterPatients(query) {
    const layanan = document.getElementById('filter-layanan')?.value || '';
    const status  = document.getElementById('filter-status')?.value  || '';
    let list = window.GFP_PATIENTS || [];
    if (query) list = list.filter(p => p.nama_pasien.toLowerCase().includes(query.toLowerCase()) || p.patient_id.toLowerCase().includes(query.toLowerCase()));
    if (layanan) list = list.filter(p => p.layanan === layanan);
    if (status)  list = list.filter(p => p.status === status);
    const tc = document.getElementById('patients-table-container');
    if (tc) tc.innerHTML = renderPatientsTable(list);
  }

  // ─── Sub-view: Jadwal ─────────────────────────────────────────────────────
  function renderJadwalView() {
    const c = document.getElementById('sub-content');
    if (!c) return;
    const scheduleAll = (window.GFP_PATIENTS||[]).filter(p=>p.tanggal_jadwal);
    c.innerHTML = `
      <div class="sub-view">
        <div class="page-header">
          <div class="page-header-inner">
            <div>
              <h2 class="page-title">Jadwal Terapi</h2>
              <p class="page-subtitle">Kelola jadwal sesi terapi pasien</p>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-secondary btn-sm">${icon('refresh','sidebar-nav-icon')} Sync Calendar</button>
            </div>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="table">
            <thead><tr>
              <th>Tanggal</th><th>Jam</th><th>Pasien</th><th>Layanan</th><th>Terapis</th><th>Status</th><th>Aksi</th>
            </tr></thead>
            <tbody>
              ${scheduleAll.length ? scheduleAll.sort((a,b)=>a.tanggal_jadwal.localeCompare(b.tanggal_jadwal)).map(p=>`
                <tr>
                  <td class="text-sm font-medium">${window.GFP_UTILS?.formatDate(p.tanggal_jadwal)||p.tanggal_jadwal}</td>
                  <td class="text-sm font-semibold" style="color:var(--color-primary)">${p.jam_jadwal}</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <div class="avatar avatar-sm">${window.GFP_UTILS?.getInitials(p.nama_pasien)||'?'}</div>
                      <span class="text-sm font-medium">${p.nama_pasien}</span>
                    </div>
                  </td>
                  <td class="text-sm">${p.layanan}</td>
                  <td class="text-sm">${p.terapis||'<span class="text-muted">-</span>'}</td>
                  <td>${statusBadge(p.status)}</td>
                  <td>
                    <div class="flex gap-1">
                      <button class="btn btn-sm btn-ghost" onclick="GFP_Dashboard.showEditPatient('${p.patient_id}')" title="Edit Jadwal">${icon('edit','sidebar-nav-icon')}</button>
                      <button class="btn btn-sm btn-ghost" style="color:var(--color-primary)">${icon('bell','sidebar-nav-icon')}</button>
                    </div>
                  </td>
                </tr>
              `).join('') : `<tr><td colspan="7" class="table-empty"><p>Belum ada jadwal</p></td></tr>`}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ─── Sub-view: Asesmen ────────────────────────────────────────────────────
  function renderAsesmenView() {
    const c = document.getElementById('sub-content');
    if (!c) return;
    const assessed = (window.GFP_PATIENTS||[]).filter(p=>p.catatan_terapi);
    c.innerHTML = `
      <div class="sub-view">
        <div class="page-header">
          <div class="page-header-inner">
            <div>
              <h2 class="page-title">Asesmen & Catatan Terapi</h2>
              <p class="page-subtitle">Rekam perkembangan dan catatan klinis pasien</p>
            </div>
          </div>
        </div>
        ${assessed.map(p=>`
          <div class="assessment-block" style="margin-bottom:var(--space-4);">
            <div class="flex items-center gap-3" style="margin-bottom:var(--space-4);">
              <div class="avatar avatar-md">${window.GFP_UTILS?.getInitials(p.nama_pasien)||'?'}</div>
              <div>
                <div class="font-semibold">${p.nama_pasien} <span class="text-muted text-xs">${p.patient_id}</span></div>
                <div class="text-sm text-secondary">${p.layanan} · ${p.terapis}</div>
              </div>
              <div style="margin-left:auto;">${statusBadge(p.status)}</div>
            </div>
            <div class="form-group">
              <label class="form-label">Catatan Terapi</label>
              <textarea class="form-control" rows="3" placeholder="Tambah catatan...">${p.catatan_terapi}</textarea>
            </div>
            ${p.follow_up ? `<div style="margin-top:var(--space-3);" class="alert alert-info"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1.25rem;height:1.25rem;flex-shrink:0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg><span>${p.follow_up}</span></div>` : ''}
            <div class="flex justify-end" style="margin-top:var(--space-3);">
              <button class="btn btn-primary btn-sm">${icon('save','sidebar-nav-icon')} Simpan</button>
            </div>
          </div>
        `).join('') || `<div class="table-empty">${icon('edit','empty-state-icon')}<h3>Belum ada catatan terapi</h3><p>Catatan akan muncul setelah sesi terapi berlangsung</p></div>`}
      </div>
    `;
  }

  // ─── Sub-view: Laporan ────────────────────────────────────────────────────
  function renderLaporanView() {
    const c = document.getElementById('sub-content');
    if (!c) return;
    const patients = window.GFP_PATIENTS || [];
    const totalByLayanan = {};
    (window.GFP_LAYANAN||[]).forEach(l => {
      totalByLayanan[l] = patients.filter(p=>p.layanan===l).length;
    });
    const kpis = window.GFP_UTILS?.getKPIs?.() || {};

    c.innerHTML = `
      <div class="sub-view">
        <div class="page-header">
          <div class="page-header-inner">
            <div>
              <h2 class="page-title">Laporan Operasional</h2>
              <p class="page-subtitle">Rekap data dan performa klinik</p>
            </div>
            <button class="btn btn-secondary btn-sm">${icon('download','sidebar-nav-icon')} Export PDF</button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-6);margin-bottom:var(--space-6);">
          <div class="card">
            <div class="card-header"><span class="card-title">Sesi Minggu Ini</span></div>
            <div id="report-chart-laporan" style="margin-top:var(--space-2);"></div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">Distribusi Layanan</span></div>
            ${Object.entries(totalByLayanan).map(([name,count])=>`
              <div style="margin-bottom:var(--space-3);">
                <div class="flex justify-between text-sm" style="margin-bottom:4px;">
                  <span>${name}</span><span class="font-semibold">${count}</span>
                </div>
                <div class="progress-bar"><div class="progress-bar-fill" style="width:${patients.length?Math.round((count/patients.length)*100):0}%"></div></div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Ringkasan Bulanan</span></div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-4);margin-top:var(--space-2);">
            <div style="text-align:center;">
              <div style="font-size:var(--text-3xl);font-weight:var(--font-extrabold);color:var(--color-primary);">${patients.length}</div>
              <div class="text-sm text-secondary">Total Pasien</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:var(--text-3xl);font-weight:var(--font-extrabold);color:var(--color-success);">${patients.filter(p=>p.status===window.GFP_STATUS?.SELESAI).length}</div>
              <div class="text-sm text-secondary">Sesi Selesai</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:var(--text-3xl);font-weight:var(--font-extrabold);color:var(--color-warning);">${patients.filter(p=>p.status===window.GFP_STATUS?.TIDAK_HADIR).length}</div>
              <div class="text-sm text-secondary">No-show</div>
            </div>
            <div style="text-align:center;">
              <div style="font-size:var(--text-3xl);font-weight:var(--font-extrabold);color:var(--color-text);">${kpis.followupRate || 0}%</div>
              <div class="text-sm text-secondary">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    `;
    // Render mini chart
    const rc = document.getElementById('report-chart-laporan');
    if (rc) {
      const data = window.GFP_REPORT_WEEKLY || [];
      const maxV = Math.max(...data.map(d=>d.pasien),1);
      rc.innerHTML = `<div class="report-bar-chart">
        ${data.map(d=>`
          <div class="report-bar-col">
            <div class="report-bar-value">${d.pasien}</div>
            <div class="report-bar-fill" style="height:${Math.round((d.pasien/maxV)*80)+4}px;"></div>
            <div class="report-bar-label">${d.hari}</div>
          </div>
        `).join('')}
      </div>`;
    }
  }

  // ─── Sub-view: Pengaturan ─────────────────────────────────────────────────
  function renderPengaturanView() {
    const c = document.getElementById('sub-content');
    if (!c) return;
    const cfg = window.GFP_CONFIG || {};
    c.innerHTML = `
      <div class="sub-view">
        <div class="page-header">
          <div class="page-header-inner">
            <div>
              <h2 class="page-title">Pengaturan</h2>
              <p class="page-subtitle">Konfigurasi klinik dan integrasi</p>
            </div>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">Profil Klinik</div>
          <div class="card" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
            <div class="form-group">
              <label class="form-label">Nama Klinik</label>
              <input class="form-control" value="${cfg.CLINIC_NAME||''}" placeholder="Nama klinik">
            </div>
            <div class="form-group">
              <label class="form-label">Nomor WhatsApp</label>
              <input class="form-control" value="${cfg.CLINIC_PHONE||''}" placeholder="081x-xxxx-xxxx">
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-control" value="${cfg.CLINIC_EMAIL||''}" placeholder="info@klinik.com">
            </div>
            <div class="form-group">
              <label class="form-label">Alamat</label>
              <input class="form-control" value="${cfg.CLINIC_ADDRESS||''}" placeholder="Alamat klinik">
            </div>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">Integrasi Google Antigravity / Workflow</div>
          <div class="card" style="display:flex;flex-direction:column;gap:var(--space-4);">
            <div class="alert alert-info">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              <div>Isi endpoint di bawah ini untuk menghubungkan website dengan Google Antigravity, Google Sheets, Calendar, dan Gmail.</div>
            </div>
            <div class="form-group">
              <label class="form-label">Form Endpoint (Google Form / Antigravity Webhook)</label>
              <input class="form-control" id="cfg-form-endpoint" value="${cfg.FORM_ENDPOINT||''}" placeholder="https://script.google.com/...">
            </div>
            <div class="form-group">
              <label class="form-label">Data Source URL (Google Sheets JSON)</label>
              <input class="form-control" value="${cfg.DATA_SOURCE_URL||''}" placeholder="https://docs.google.com/spreadsheets/...">
            </div>
            <div class="form-group">
              <label class="form-label">Calendar Webhook</label>
              <input class="form-control" value="${cfg.CALENDAR_WEBHOOK||''}" placeholder="https://...">
            </div>
            <div class="form-group">
              <label class="form-label">Reminder Webhook (Gmail / WA)</label>
              <input class="form-control" value="${cfg.REMINDER_WEBHOOK||''}" placeholder="https://...">
            </div>
            <div class="flex justify-end">
              <button class="btn btn-primary" onclick="GFP_Dashboard.saveConfig()">
                ${icon('save','sidebar-nav-icon')} Simpan Konfigurasi
              </button>
            </div>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title" style="display:flex;justify-content:space-between;align-items:center;">
            Manajemen Terapis
            <button class="btn btn-primary btn-sm" onclick="GFP_Dashboard.addTerapis()">
              ${icon('plus','sidebar-nav-icon')} Tambah Terapis
            </button>
          </div>
          <div class="card" style="display:flex;flex-direction:column;gap:var(--space-4);">
            <table class="table">
              <thead>
                <tr>
                  <th>Nama Terapis</th>
                  <th style="width:100px;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${(window.GFP_TERAPIS||[]).map((t, idx) => `
                  <tr>
                    <td style="font-weight:var(--font-medium);">${t}</td>
                    <td>
                      <div class="flex gap-1">
                        <button class="btn btn-sm btn-ghost" onclick="GFP_Dashboard.editTerapis(${idx})" title="Edit">${icon('edit','sidebar-nav-icon')}</button>
                        <button class="btn btn-sm btn-ghost" onclick="GFP_Dashboard.deleteTerapis(${idx})" title="Hapus" style="color:var(--color-error)">${icon('trash','sidebar-nav-icon')}</button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
                ${(window.GFP_TERAPIS||[]).length === 0 ? `<tr><td colspan="2" class="text-center" style="color:var(--color-text-muted);">Belum ada data terapis.</td></tr>` : ''}
              </tbody>
            </table>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">Akun Admin (Klinik)</div>
          <div class="card" style="display:flex;flex-direction:column;gap:var(--space-4);">
            <div class="alert alert-warning" style="margin-bottom:var(--space-2);font-size:var(--text-xs);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:1rem;height:1rem;flex-shrink:0"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              Ganti Email & Password ini jika Anda merasa kredensial lama sudah tidak aman. Data ini disimpan sangat aman di Cloud.
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="cfg-admin-email">Username (Email) Baru</label>
                <input id="cfg-admin-email" type="email" class="form-control" value="${window.GFP_AUTH?.getCurrentUser()?.email||'admin@getfitphysio.com'}">
              </div>
              <div class="form-group">
                <label class="form-label" for="cfg-admin-pass">Password Baru</label>
                <input id="cfg-admin-pass" type="password" class="form-control" placeholder="Biarkan kosong jika tidak ingin mengubah password">
              </div>
            </div>
            <div class="flex justify-end gap-2" style="margin-top:var(--space-2);">
              <button class="btn btn-outline btn-sm" onclick="GFP_App.logout()">
                ${icon('logout','sidebar-nav-icon')} Logout
              </button>
              <button class="btn btn-primary btn-sm" onclick="GFP_Dashboard.updateCredentials(this)">
                Simpan Akun
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Terapis Management Methods ───────────────────────────────────────────
  async function addTerapis() {
    const name = prompt('Masukkan nama terapis baru:');
    if (name && name.trim()) {
      if (!window.GFP_TERAPIS) window.GFP_TERAPIS = [];
      window.GFP_TERAPIS.push(name.trim());
      
      const btn = document.activeElement;
      if (btn) btn.classList.add('loading');
      
      const res = await window.GFP_UTILS?.syncServer?.('save_terapis', window.GFP_TERAPIS);
      if (btn) btn.classList.remove('loading');
      
      if (res && res.success) {
        window.GFP_Toast?.show('Terapis berhasil ditambahkan ke Cloud', 'success', 'Berhasil');
        switchSubView('pengaturan');
      } else {
        window.GFP_Toast?.show('Gagal menyimpan ke Cloud. Pastikan URL Apps Script & Secret benar.', 'error', 'Gagal');
        window.GFP_TERAPIS.pop(); // Revert
      }
    }
  }

  async function editTerapis(index) {
    if (!window.GFP_TERAPIS || !window.GFP_TERAPIS[index]) return;
    const currentName = window.GFP_TERAPIS[index];
    const newName = prompt('Edit nama terapis:', currentName);
    if (newName && newName.trim() && newName.trim() !== currentName) {
      window.GFP_TERAPIS[index] = newName.trim();
      
      const res = await window.GFP_UTILS?.syncServer?.('save_terapis', window.GFP_TERAPIS);
      
      if (res && res.success) {
        window.GFP_Toast?.show('Nama terapis diperbarui di Cloud', 'success', 'Tersimpan');
        switchSubView('pengaturan');
      } else {
        window.GFP_Toast?.show('Gagal menyimpan ke Cloud.', 'error', 'Gagal');
        window.GFP_TERAPIS[index] = currentName; // Revert
      }
    }
  }

  async function deleteTerapis(index) {
    if (!window.GFP_TERAPIS || !window.GFP_TERAPIS[index]) return;
    const currentName = window.GFP_TERAPIS[index];
    if (confirm(`Apakah Anda yakin ingin menghapus "${currentName}" dari daftar terapis?`)) {
      window.GFP_TERAPIS.splice(index, 1);
      
      const res = await window.GFP_UTILS?.syncServer?.('save_terapis', window.GFP_TERAPIS);
      
      if (res && res.success) {
        window.GFP_Toast?.show('Terapis dihapus dari Cloud', 'success', 'Dihapus');
        switchSubView('pengaturan');
      } else {
        window.GFP_Toast?.show('Gagal menghapus di Cloud.', 'error', 'Gagal');
        window.GFP_TERAPIS.splice(index, 0, currentName); // Revert
      }
    }
  }

  // ─── Patient detail modal ─────────────────────────────────────────────────
  function showPatientDetail(patientId) {
    const p = (window.GFP_PATIENTS||[]).find(x=>x.patient_id===patientId);
    if (!p) return;

    const existing = document.getElementById('patient-detail-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'patient-detail-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal" style="max-width:620px;">
        <button class="modal-close" onclick="document.getElementById('patient-detail-modal').remove()">
          ${icon('x','')}
        </button>
        <div class="flex items-center gap-3" style="margin-bottom:var(--space-6);">
          <div class="avatar avatar-lg">${window.GFP_UTILS?.getInitials(p.nama_pasien)||'?'}</div>
          <div>
            <div class="modal-title" style="margin-bottom:4px;">${p.nama_pasien}</div>
            <div class="flex gap-2 flex-wrap">
              <span class="badge badge-neutral">${p.patient_id}</span>
              ${statusBadge(p.status)}
            </div>
          </div>
        </div>
        <div class="detail-grid" style="margin-bottom:var(--space-5);">
          <div class="detail-field"><span class="detail-label">Umur</span><span class="detail-value">${p.umur} tahun</span></div>
          <div class="detail-field"><span class="detail-label">Nama Orang Tua / Wali</span><span class="detail-value">${p.nama_orang_tua}</span></div>
          <div class="detail-field"><span class="detail-label">WhatsApp</span><span class="detail-value">${p.no_whatsapp}</span></div>
          <div class="detail-field"><span class="detail-label">Layanan</span><span class="detail-value">${p.layanan}</span></div>
          <div class="detail-field"><span class="detail-label">Tipe Kunjungan</span><span class="detail-value">
            ${(p.tipe_kunjungan === 'Home Care') ? '<span class="badge badge-warning">Home Care</span>' : 'Klinik'}
          </span></div>
          <div class="detail-field"><span class="detail-label">Keluhan Utama</span><span class="detail-value">${p.keluhan_utama}</span></div>
          <div class="detail-field"><span class="detail-label">Preferensi</span><span class="detail-value">${p.preferensi_hari} · ${p.preferensi_jam}</span></div>
          <div class="detail-field"><span class="detail-label">Terapis</span><span class="detail-value">${p.terapis||'-'}</span></div>
          <div class="detail-field"><span class="detail-label">Jadwal</span><span class="detail-value">${p.tanggal_jadwal?`${p.tanggal_jadwal} · ${p.jam_jadwal}`:'-'}</span></div>
          
          ${p.tipe_kunjungan === 'Home Care' ? `
          <div class="detail-field" style="grid-column:1/-1;background:var(--color-bg-alt);padding:var(--space-3);border-radius:var(--radius-md);">
            <div style="font-size:0.875rem;font-weight:600;margin-bottom:4px;">📍 Alamat & Lokasi Visit</div>
            <div style="font-size:0.875rem;color:var(--color-text);margin-bottom:8px;">${p.alamat||'-'}</div>
            ${(p.maps_url && p.maps_url !== '-') ? `<a href="${p.maps_url}" target="_blank" class="btn btn-primary btn-sm" style="display:inline-flex;">Buka Navigasi Google Maps</a>` : `<span style="font-size:0.875rem;color:var(--color-text-muted);">Koordinat: ${p.koordinat||'-'}</span>`}
          </div>
          ` : ''}

          <div class="detail-field" style="grid-column:1/-1;"><span class="detail-label">Catatan Terapi</span><span class="detail-value">${p.catatan_terapi||'-'}</span></div>
          ${p.follow_up?`<div class="detail-field" style="grid-column:1/-1;"><span class="detail-label">Follow-up</span><span class="detail-value">${p.follow_up}</span></div>`:''}
        </div>
        <div class="flex justify-end gap-2">
          <a href="https://wa.me/${p.no_whatsapp.replace(/\D/g,'').replace(/^0/,'62')}" target="_blank" class="btn btn-primary btn-sm">
            ${icon('whatsapp','')} Hubungi WA
          </a>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('patient-detail-modal').remove()">Tutup</button>
        </div>
      </div>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }

  // ─── Edit patient modal ───────────────────────────────────────────────────
  function showEditPatient(patientId) {
    const idx = (window.GFP_PATIENTS||[]).findIndex(x => x.patient_id === patientId);
    if (idx === -1) return;
    const p = window.GFP_PATIENTS[idx];

    const existing = document.getElementById('edit-patient-modal');
    if (existing) existing.remove();

    const TERAPIS_LIST = window.GFP_TERAPIS || [];
    const STATUS_LIST  = Object.values(window.GFP_STATUS || {});

    const modal = document.createElement('div');
    modal.id = 'edit-patient-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal" style="max-width:640px;">
        <button class="modal-close" onclick="document.getElementById('edit-patient-modal').remove()">
          ${icon('x','')}
        </button>

        <div class="flex items-center gap-3" style="margin-bottom:var(--space-6);">
          <div class="avatar avatar-lg">${window.GFP_UTILS?.getInitials(p.nama_pasien)||'?'}</div>
          <div>
            <div class="modal-title" style="margin-bottom:4px;">Edit Data Pasien</div>
            <div style="font-size:var(--text-sm);color:var(--color-text-secondary);">${p.nama_pasien} · ${p.patient_id}</div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:var(--space-4);">

          <!-- Status & Terapis -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select class="form-control" id="edit-status">
                ${STATUS_LIST.map(s => `<option value="${s}" ${p.status===s?'selected':''}>${s}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Terapis</label>
              <select class="form-control" id="edit-terapis">
                <option value="">-- Belum ditetapkan --</option>
                ${TERAPIS_LIST.map(t => `<option value="${t}" ${p.terapis===t?'selected':''}>${t}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Jadwal -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Tanggal Jadwal</label>
              <input class="form-control" type="date" id="edit-tanggal" value="${p.tanggal_jadwal||''}">
            </div>
            <div class="form-group">
              <label class="form-label">Jam Jadwal</label>
              <select class="form-control" id="edit-jam">
                <option value="">-- Pilih jam --</option>
                ${['08:00','09:00','10:00','11:00','13:00','14:00','15:00','16:00'].map(j =>
                  `<option value="${j}" ${p.jam_jadwal===j?'selected':''}>${j}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Catatan -->
          <div class="form-group">
            <label class="form-label">Catatan Terapi</label>
            <textarea class="form-control" id="edit-catatan" rows="3" placeholder="Catatan perkembangan terapi...">${p.catatan_terapi||''}</textarea>
          </div>

          <!-- Follow-up -->
          <div class="form-group">
            <label class="form-label">Follow-up / Rencana Selanjutnya</label>
            <textarea class="form-control" id="edit-followup" rows="2" placeholder="Rencana sesi berikutnya, rekomendasi, dll...">${p.follow_up||''}</textarea>
          </div>

        </div>

        <div class="flex justify-end gap-2" style="margin-top:var(--space-6);padding-top:var(--space-4);border-top:1px solid var(--color-border);">
          <button class="btn btn-secondary" onclick="document.getElementById('edit-patient-modal').remove()">Batal</button>
          <button class="btn btn-primary" onclick="GFP_Dashboard.saveEditPatient('${p.patient_id}')">
            ${icon('save','sidebar-nav-icon')} Simpan Perubahan
          </button>
        </div>
      </div>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }

  // ─── Save edited patient data ──────────────────────────────────────────────
  function saveEditPatient(patientId) {
    const idx = (window.GFP_PATIENTS||[]).findIndex(x => x.patient_id === patientId);
    if (idx === -1) return;

    const status   = document.getElementById('edit-status')?.value;
    const terapis  = document.getElementById('edit-terapis')?.value;
    const tanggal  = document.getElementById('edit-tanggal')?.value;
    const jam      = document.getElementById('edit-jam')?.value;
    const catatan  = document.getElementById('edit-catatan')?.value;
    const followup = document.getElementById('edit-followup')?.value;

    // Update in-memory data
    window.GFP_PATIENTS[idx] = {
      ...window.GFP_PATIENTS[idx],
      status:          status   || window.GFP_PATIENTS[idx].status,
      terapis:         terapis  || window.GFP_PATIENTS[idx].terapis,
      tanggal_jadwal:  tanggal  || window.GFP_PATIENTS[idx].tanggal_jadwal,
      jam_jadwal:      jam      || window.GFP_PATIENTS[idx].jam_jadwal,
      catatan_terapi:  catatan,
      follow_up:       followup,
    };

    // Update badge count
    const reviewCount = window.GFP_PATIENTS.filter(p =>
      p.status === window.GFP_STATUS?.MENUNGGU || p.status === window.GFP_STATUS?.NEED_REVIEW
    ).length;
    const badge = document.getElementById('badge-pasien');
    if (badge) badge.textContent = reviewCount;

    document.getElementById('edit-patient-modal')?.remove();
    window.GFP_Toast?.show(`Data ${window.GFP_PATIENTS[idx].nama_pasien} berhasil diperbarui`, 'success', 'Tersimpan');

    // Re-render current sub-view
    const currentView = document.querySelector('.sidebar-nav-item.active')?.dataset.view || 'dashboard';
    switchSubView(currentView);
  }

  // ─── Save config (demo) ───────────────────────────────────────────────────
  function saveConfig() {
    const ep = document.getElementById('cfg-form-endpoint');
    if (ep && window.GFP_CONFIG) window.GFP_CONFIG.FORM_ENDPOINT = ep.value.trim();
    window.GFP_Toast?.show('Konfigurasi berhasil disimpan!', 'success', 'Tersimpan');
  }

  // ─── Switch sidebar sub-view ──────────────────────────────────────────────
  function switchSubView(view) {
    currentSubView = view;

    // Update sidebar active state
    document.querySelectorAll('.sidebar-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === view);
    });

    // Update topbar title
    const titles = {
      dashboard: 'Dashboard',
      pasien:    'Daftar Pasien',
      jadwal:    'Jadwal Terapi',
      asesmen:   'Asesmen & Catatan',
      laporan:   'Laporan',
      pengaturan:'Pengaturan',
    };
    const tb = document.getElementById('topbar-title');
    if (tb) tb.textContent = titles[view] || 'Dashboard';

    // Render sub-view content
    const map = {
      dashboard:  renderDashboardHome,
      pasien:     renderPasienView,
      jadwal:     renderJadwalView,
      asesmen:    renderAsesmenView,
      laporan:    renderLaporanView,
      pengaturan: renderPengaturanView,
    };
    (map[view] || renderDashboardHome)();
  }

  // ─── Main dashboard home ──────────────────────────────────────────────────
  function renderDashboardHome() {
    const c = document.getElementById('sub-content');
    if (!c) return;

    c.innerHTML = `
      <div class="sub-view">
        <div class="page-header">
          <div class="page-header-inner">
            <div>
              <h2 class="page-title">Selamat datang, ${window.GFP_AUTH?.getCurrentUser()?.name || 'Admin'} 👋</h2>
              <p class="page-subtitle">Ringkasan operasional klinik hari ini</p>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-primary btn-sm" onclick="GFP_App.showView('form')">
                ${icon('plus','sidebar-nav-icon')} Pasien Baru
              </button>
              <button class="btn btn-secondary btn-sm">${icon('refresh','sidebar-nav-icon')} Refresh</button>
            </div>
          </div>
        </div>

        <!-- KPIs -->
        <div class="kpi-grid" id="kpi-grid"></div>

        <!-- Main grid -->
        <div class="dashboard-grid">
          <!-- New patients -->
          <div class="card full-width">
            <div class="card-header">
              <span class="card-title">${icon('users','sidebar-nav-icon')} Pasien Baru & Need Review</span>
              <button class="btn btn-ghost btn-sm" onclick="GFP_Dashboard.switchSubView('pasien')">Lihat Semua →</button>
            </div>
            <div id="new-patients-table"></div>
          </div>

          <!-- Today schedule -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">${icon('calendar','sidebar-nav-icon')} Jadwal Hari Ini</span>
              <button class="btn btn-ghost btn-sm" onclick="GFP_Dashboard.switchSubView('jadwal')">Lihat Semua →</button>
            </div>
            <div id="today-schedule"></div>
          </div>

          <!-- Reminders -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">${icon('bell','sidebar-nav-icon')} Reminder Aktif</span>
            </div>
            <div id="reminders-list"></div>
          </div>

          <!-- Follow-up -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">${icon('alert','sidebar-nav-icon')} No-show & Follow-up</span>
            </div>
            <div id="followup-list"></div>
          </div>

          <!-- Report -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">📊 Sesi Minggu Ini</span>
              <button class="btn btn-ghost btn-sm" onclick="GFP_Dashboard.switchSubView('laporan')">Laporan →</button>
            </div>
            <div id="report-chart" style="margin-top:var(--space-2);"></div>
          </div>
        </div>
      </div>
    `;

    renderKPIs();
    renderNewPatients();
    renderTodaySchedule();
    renderReminders();
    renderFollowUp();
    renderReport();
  }

  // ─── Init dashboard ───────────────────────────────────────────────────────
  function init() {
    // Update user info in sidebar
    const user = window.GFP_AUTH?.getCurrentUser();
    if (user) {
      const nameEl = document.getElementById('sidebar-user-name');
      const roleEl = document.getElementById('sidebar-user-role');
      const avEl   = document.getElementById('sidebar-user-avatar');
      if (nameEl) nameEl.textContent = user.name;
      if (roleEl) roleEl.textContent = user.role;
      if (avEl)   avEl.textContent   = user.avatar;
    }

    // Sidebar nav click handlers
    document.querySelectorAll('.sidebar-nav-item').forEach(el => {
      el.addEventListener('click', () => {
        const view = el.dataset.view;
        if (view) switchSubView(view);
        // Close mobile sidebar
        if (window.innerWidth <= 1024) {
          document.getElementById('sidebar')?.classList.remove('open');
          document.getElementById('sidebar-overlay')?.classList.remove('visible');
        }
      });
    });

    // Mobile hamburger
    const menuBtn = document.getElementById('topbar-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    menuBtn?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('visible');
    });
    overlay?.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('visible');
    });

    renderDashboardHome();

    // Fetch data from server
    window.GFP_UTILS?.syncServer?.('get_data').then(serverData => {
      if (serverData && serverData.success && serverData.data?.terapis) {
        if (serverData.data.terapis.length > 0) {
          window.GFP_TERAPIS = serverData.data.terapis;
          if (currentSubView === 'pengaturan') switchSubView('pengaturan');
        }
      }
    });
  }

  return { 
    init, switchSubView, showPatientDetail, showEditPatient, saveEditPatient, 
    filterPatients, saveConfig, renderDashboardHome,
    addTerapis, editTerapis, deleteTerapis, updateCredentials, deletePatient
  };
})();

window.GFP_Dashboard = Dashboard;
