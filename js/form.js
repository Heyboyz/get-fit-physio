/**
 * GET FIT PHYSIO — Form Module
 * Patient intake form: validation, submission, success state
 */

const FormModule = (() => {

  let isSubmitting = false;

  // ─── Validation rules ─────────────────────────────────────────────────────
  const RULES = {
    nama_pasien:     { required: true, label: 'Nama Pasien', minLen: 3 },
    umur:            { required: true, label: 'Umur', type: 'number', min: 0, max: 120 },
    nama_orang_tua:  { required: false, label: 'Nama Orang Tua / Wali' },
    no_whatsapp:     { required: true, label: 'No. WhatsApp', pattern: /^[0-9+\-\s]{8,15}$/ },
    layanan:         { required: true, label: 'Layanan' },
    keluhan_utama:   { required: true, label: 'Keluhan Utama', minLen: 10 },
    preferensi_hari: { required: true, label: 'Preferensi Hari' },
    preferensi_jam:  { required: true, label: 'Preferensi Jam' },
  };

  // ─── Validate a single field ──────────────────────────────────────────────
  function validateField(name, value) {
    const rule = RULES[name];
    if (!rule) return null;

    const v = value?.toString().trim();

    if (rule.required && !v) {
      return `${rule.label} wajib diisi.`;
    }
    if (!rule.required && !v) return null;

    if (rule.minLen && v.length < rule.minLen) {
      return `${rule.label} minimal ${rule.minLen} karakter.`;
    }
    if (rule.type === 'number') {
      const num = Number(v);
      if (isNaN(num)) return `${rule.label} harus berupa angka.`;
      if (rule.min !== undefined && num < rule.min) return `${rule.label} tidak valid.`;
      if (rule.max !== undefined && num > rule.max) return `${rule.label} tidak valid.`;
    }
    if (rule.pattern && !rule.pattern.test(v)) {
      return `${rule.label} tidak valid.`;
    }
    return null;
  }

  // ─── Show/clear field error ───────────────────────────────────────────────
  function showFieldError(name, msg) {
    const el = document.getElementById(`field-${name}`);
    const errEl = document.getElementById(`err-${name}`);
    if (!el || !errEl) return;

    if (msg) {
      el.classList.add('error');
      el.classList.remove('success');
      errEl.innerHTML = `
        <svg viewBox="0 0 20 20" fill="currentColor" style="width:12px;height:12px;display:inline;vertical-align:middle;margin-right:3px">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
        </svg>${msg}`;
    } else {
      el.classList.remove('error');
      el.classList.add('success');
      errEl.textContent = '';
    }
  }

  // ─── Validate full form ───────────────────────────────────────────────────
  function validateForm(formData) {
    let valid = true;
    for (const name of Object.keys(RULES)) {
      const err = validateField(name, formData[name]);
      showFieldError(name, err);
      if (err) valid = false;
    }
    return valid;
  }

  // ─── Collect form data ────────────────────────────────────────────────────
  function collectFormData() {
    const data = {};
    for (const name of Object.keys(RULES)) {
      const el = document.getElementById(`field-${name}`);
      if (el) data[name] = el.value;
    }
    return data;
  }

  // ─── Real-time validation on blur ─────────────────────────────────────────
  function initRealtime() {
    for (const name of Object.keys(RULES)) {
      const el = document.getElementById(`field-${name}`);
      if (!el) continue;

      el.addEventListener('blur', () => {
        const err = validateField(name, el.value);
        showFieldError(name, err);
      });

      el.addEventListener('input', () => {
        if (el.classList.contains('error')) {
          const err = validateField(name, el.value);
          showFieldError(name, err);
        }
      });
    }

    // Special: show/hide orang tua field based on layanan
    const layananSel = document.getElementById('field-layanan');
    if (layananSel) {
      layananSel.addEventListener('change', () => {
        const isAnak = layananSel.value === 'Fisioterapi Anak';
        const otGroup = document.getElementById('group-nama_orang_tua');
        if (otGroup) {
          otGroup.style.display = 'flex';
          const label = otGroup.querySelector('.form-label');
          const req   = otGroup.querySelector('.required');
          if (isAnak) {
            RULES.nama_orang_tua.required = true;
            if (label && !req) label.insertAdjacentHTML('beforeend', '<span class="required">*</span>');
          } else {
            RULES.nama_orang_tua.required = false;
            if (req) req.remove();
          }
        }
      });
    }
  }

  // ─── Build payload ────────────────────────────────────────────────────────
  function buildPayload(formData) {
    const id = window.GFP_UTILS?.generatePatientId?.() || 'GFP-NEW';
    return {
      patient_id:      id,
      tanggal_input:   window.GFP_UTILS?.todayStr?.() || new Date().toISOString().split('T')[0],
      nama_pasien:     formData.nama_pasien,
      umur:            formData.umur,
      nama_orang_tua:  formData.nama_orang_tua || '-',
      no_whatsapp:     formData.no_whatsapp,
      layanan:         formData.layanan,
      keluhan_utama:   formData.keluhan_utama,
      preferensi_hari: formData.preferensi_hari,
      preferensi_jam:  formData.preferensi_jam,
      terapis:         '',
      tanggal_jadwal:  '',
      jam_jadwal:      '',
      status:          'Menunggu Penjadwalan',
      catatan_terapi:  '',
      follow_up:       '',
    };
  }

  // ─── Submit to endpoint ───────────────────────────────────────────────────
  async function submitToEndpoint(payload) {
    const endpoint = window.GFP_CONFIG?.FORM_ENDPOINT;
    if (!endpoint) {
      // Demo mode: simulate success
      await new Promise(r => setTimeout(r, 1200));
      return { success: true, patient_id: payload.patient_id };
    }

    const res = await fetch(endpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Gagal mengirim data. Coba lagi.');
    return res.json();
  }

  // ─── Show success state ───────────────────────────────────────────────────
  function showSuccess(patientId) {
    const formCard = document.getElementById('intake-form-card');
    if (!formCard) return;

    formCard.innerHTML = `
      <div class="form-success">
        <div class="form-success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 class="form-success-title">Data Berhasil Dikirim!</h2>
        <p class="form-success-msg">
          Terima kasih telah mendaftarkan diri di <strong>Get Fit Physio</strong>.
          Data Anda sedang direview oleh tim admin kami.
          Kami akan menghubungi Anda via WhatsApp untuk konfirmasi jadwal terapi.
        </p>
        <div class="form-success-ref">${patientId}</div>
        <p style="font-size:var(--text-xs);color:var(--color-text-muted);margin-bottom:var(--space-6);">
          Simpan nomor referensi di atas untuk keperluan selanjutnya.
        </p>
        <div class="flex gap-3 justify-center flex-wrap">
          <button class="btn btn-primary" onclick="window.GFP_App?.showView('landing')">
            Kembali ke Beranda
          </button>
          <button class="btn btn-secondary" onclick="location.reload()">
            Daftar Pasien Lain
          </button>
        </div>
      </div>
    `;
  }

  // ─── Handle submit ────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    const formData = collectFormData();
    if (!validateForm(formData)) {
      // Scroll to first error
      const firstError = document.querySelector('.form-control.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      window.GFP_Toast?.show('Harap lengkapi semua field yang wajib diisi.', 'error');
      return;
    }

    isSubmitting = true;
    const submitBtn = document.getElementById('form-submit-btn');
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    }

    try {
      const payload = buildPayload(formData);
      await submitToEndpoint(payload);

      // Add to local dummy data (for dashboard preview)
      if (window.GFP_PATIENTS) window.GFP_PATIENTS.push(payload);

      showSuccess(payload.patient_id);
      window.GFP_Toast?.show('Data pasien berhasil dikirim!', 'success', 'Berhasil');
    } catch (err) {
      window.GFP_Toast?.show(err.message || 'Terjadi kesalahan. Coba lagi.', 'error', 'Error');
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    } finally {
      isSubmitting = false;
    }
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  function init() {
    const form = document.getElementById('intake-form');
    if (form) form.addEventListener('submit', handleSubmit);
    initRealtime();
  }

  return { init };
})();

window.GFP_Form = FormModule;
