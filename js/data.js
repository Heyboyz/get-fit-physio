/**
 * GET FIT PHYSIO — Dummy Data & Schema
 * Ready for Google Sheets / Antigravity integration
 */

// ─── Configuration (swap these for real endpoints) ───────────────────────────
const CONFIG = {
  FORM_ENDPOINT:      '/api/submit', // Cloudflare Pages Function Proxy
  DATA_SOURCE_URL:    '', // e.g. Google Sheets JSON endpoint
  CALENDAR_WEBHOOK:   '', // e.g. Apps Script calendar webhook
  REMINDER_WEBHOOK:   '', // e.g. Apps Script Gmail/WhatsApp webhook
  AUTH_ENDPOINT:      '', // e.g. backend auth endpoint
  CLINIC_NAME:        'Get Fit Physio',
  CLINIC_PHONE:       '08122759784',
  CLINIC_WA:          '628122759784',
  CLINIC_EMAIL:       'info@getfitphysio.com',
  CLINIC_ADDRESS:     'Jl. Sehat No. 12, Jakarta Selatan',
  CLINIC_HOURS_WEEKDAY: '08.00 – 17.00',
  CLINIC_HOURS_SAT:     '08.00 – 13.00',
};

// ─── Status Definitions ───────────────────────────────────────────────────────
const STATUS = {
  MENUNGGU:     'Menunggu Penjadwalan',
  NEED_REVIEW:  'Need Review',
  TERJADWAL:    'Terjadwal',
  SELESAI:      'Selesai',
  TIDAK_HADIR:  'Tidak Hadir',
  FOLLOW_UP:    'Follow-up',
};

const STATUS_BADGE = {
  [STATUS.MENUNGGU]:    'badge-info',
  [STATUS.NEED_REVIEW]: 'badge-warning',
  [STATUS.TERJADWAL]:   'badge-primary',
  [STATUS.SELESAI]:     'badge-success',
  [STATUS.TIDAK_HADIR]: 'badge-error',
  [STATUS.FOLLOW_UP]:   'badge-neutral',
};

// ─── Layanan Options ──────────────────────────────────────────────────────────
const LAYANAN_OPTIONS = [
  'Fisioterapi Anak',
  'Fisioterapi Neuromuskular',
  'Fisioterapi Muskuloskeletal',
];

// ─── Terapis Options ──────────────────────────────────────────────────────────
const default_TERAPIS = [
  'Dewi Rahayu, S.Ft',
  'Ahmad Fauzi, S.Ft',
  'Siti Nurhaliza, S.Ft',
  'Rizky Pratama, S.Ft',
];
let TERAPIS_LIST = default_TERAPIS;

// ─── Hari Options ─────────────────────────────────────────────────────────────
const HARI_OPTIONS = ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];

// ─── JAM Options ──────────────────────────────────────────────────────────────
const JAM_OPTIONS = [
  '08:00','09:00','10:00','11:00','13:00','14:00','15:00','16:00'
];

// ─── Dummy Patient Data ───────────────────────────────────────────────────────
const DUMMY_PATIENTS = [
  {
    patient_id:      'GFP-2025-001',
    tanggal_input:   '2025-07-14',
    nama_pasien:     'Budi Santoso',
    umur:            8,
    nama_orang_tua:  'Ahmad Santoso',
    no_whatsapp:     '0812-3456-7890',
    layanan:         'Fisioterapi Anak',
    keluhan_utama:   'Keterlambatan motorik kasar dan keseimbangan',
    preferensi_hari: 'Senin',
    preferensi_jam:  '09:00',
    terapis:         'Dewi Rahayu, S.Ft',
    tanggal_jadwal:  '2025-07-17',
    jam_jadwal:      '09:00',
    status:          STATUS.TERJADWAL,
    catatan_terapi:  'Sesi pertama: evaluasi postur dan kekuatan ekstremitas bawah.',
    follow_up:       '',
  },
  {
    patient_id:      'GFP-2025-002',
    tanggal_input:   '2025-07-15',
    nama_pasien:     'Sari Dewi',
    umur:            35,
    nama_orang_tua:  '-',
    no_whatsapp:     '0856-7890-1234',
    layanan:         'Fisioterapi Muskuloskeletal',
    keluhan_utama:   'Nyeri punggung bawah kronis sejak 6 bulan',
    preferensi_hari: 'Selasa',
    preferensi_jam:  '10:00',
    terapis:         'Ahmad Fauzi, S.Ft',
    tanggal_jadwal:  '2025-07-17',
    jam_jadwal:      '10:00',
    status:          STATUS.TERJADWAL,
    catatan_terapi:  '',
    follow_up:       '',
  },
  {
    patient_id:      'GFP-2025-003',
    tanggal_input:   '2025-07-15',
    nama_pasien:     'Rizal Maulana',
    umur:            45,
    nama_orang_tua:  '-',
    no_whatsapp:     '0878-1234-5678',
    layanan:         'Fisioterapi Neuromuskular',
    keluhan_utama:   'Kelemahan anggota gerak pasca stroke ringan',
    preferensi_hari: 'Rabu',
    preferensi_jam:  '11:00',
    terapis:         'Siti Nurhaliza, S.Ft',
    tanggal_jadwal:  '2025-07-16',
    jam_jadwal:      '11:00',
    status:          STATUS.SELESAI,
    catatan_terapi:  'Sesi ke-3: peningkatan grip strength 20%. Lanjut program ROM.',
    follow_up:       'Jadwalkan sesi 4 minggu depan.',
  },
  {
    patient_id:      'GFP-2025-004',
    tanggal_input:   '2025-07-16',
    nama_pasien:     'Anisa Putri',
    umur:            6,
    nama_orang_tua:  'Hendra Wijaya',
    no_whatsapp:     '0821-5678-9012',
    layanan:         'Fisioterapi Anak',
    keluhan_utama:   'Speech delay dan gangguan koordinasi',
    preferensi_hari: 'Jumat',
    preferensi_jam:  '09:00',
    terapis:         '',
    tanggal_jadwal:  '',
    jam_jadwal:      '',
    status:          STATUS.MENUNGGU,
    catatan_terapi:  '',
    follow_up:       '',
  },
  {
    patient_id:      'GFP-2025-005',
    tanggal_input:   '2025-07-16',
    nama_pasien:     'Doni Prasetyo',
    umur:            28,
    nama_orang_tua:  '-',
    no_whatsapp:     '0813-9012-3456',
    layanan:         'Fisioterapi Muskuloskeletal',
    keluhan_utama:   'Cedera lutut pasca olahraga futsal',
    preferensi_hari: 'Kamis',
    preferensi_jam:  '14:00',
    terapis:         '',
    tanggal_jadwal:  '',
    jam_jadwal:      '',
    status:          STATUS.NEED_REVIEW,
    catatan_terapi:  '',
    follow_up:       '',
  },
  {
    patient_id:      'GFP-2025-006',
    tanggal_input:   '2025-07-13',
    nama_pasien:     'Marlina Sari',
    umur:            52,
    nama_orang_tua:  '-',
    no_whatsapp:     '0819-3456-7890',
    layanan:         'Fisioterapi Neuromuskular',
    keluhan_utama:   'Tremor dan kekakuan tungkai (Parkinson dini)',
    preferensi_hari: 'Senin',
    preferensi_jam:  '13:00',
    terapis:         'Rizky Pratama, S.Ft',
    tanggal_jadwal:  '2025-07-14',
    jam_jadwal:      '13:00',
    status:          STATUS.TIDAK_HADIR,
    catatan_terapi:  '',
    follow_up:       'Hubungi via WA untuk reschedule.',
  },
  {
    patient_id:      'GFP-2025-007',
    tanggal_input:   '2025-07-12',
    nama_pasien:     'Fajar Nugroho',
    umur:            38,
    nama_orang_tua:  '-',
    no_whatsapp:     '0857-2345-6789',
    layanan:         'Fisioterapi Muskuloskeletal',
    keluhan_utama:   'Frozen shoulder kiri, ROM sangat terbatas',
    preferensi_hari: 'Rabu',
    preferensi_jam:  '15:00',
    terapis:         'Ahmad Fauzi, S.Ft',
    tanggal_jadwal:  '2025-07-17',
    jam_jadwal:      '15:00',
    status:          STATUS.TERJADWAL,
    catatan_terapi:  '',
    follow_up:       '',
  },
  {
    patient_id:      'GFP-2025-008',
    tanggal_input:   '2025-07-17',
    nama_pasien:     'Nadia Kusuma',
    umur:            10,
    nama_orang_tua:  'Budi Kusuma',
    no_whatsapp:     '0822-6789-0123',
    layanan:         'Fisioterapi Anak',
    keluhan_utama:   'Gangguan sensorik dan hipotonia',
    preferensi_hari: 'Sabtu',
    preferensi_jam:  '08:00',
    terapis:         '',
    tanggal_jadwal:  '',
    jam_jadwal:      '',
    status:          STATUS.NEED_REVIEW,
    catatan_terapi:  '',
    follow_up:       '',
  },
];

// ─── Dummy Reminders ──────────────────────────────────────────────────────────
const DUMMY_REMINDERS = [
  {
    id:         'REM-001',
    patient_id: 'GFP-2025-001',
    nama:       'Budi Santoso',
    jenis:      'H-1 Reminder',
    jadwal:     'Besok, 17 Jul 2025 – 09:00',
    via:        'WhatsApp',
    status:     'Terkirim',
    color:      'green',
  },
  {
    id:         'REM-002',
    patient_id: 'GFP-2025-002',
    nama:       'Sari Dewi',
    jenis:      'H-1 Reminder',
    jadwal:     'Besok, 17 Jul 2025 – 10:00',
    via:        'WhatsApp',
    status:     'Terkirim',
    color:      'green',
  },
  {
    id:         'REM-003',
    patient_id: 'GFP-2025-007',
    nama:       'Fajar Nugroho',
    jenis:      'H-1 Reminder',
    jadwal:     'Besok, 17 Jul 2025 – 15:00',
    via:        'WhatsApp',
    status:     'Pending',
    color:      'amber',
  },
  {
    id:         'REM-004',
    patient_id: 'GFP-2025-006',
    nama:       'Marlina Sari',
    jenis:      'Follow-up No-show',
    jadwal:     'Hari ini',
    via:        'WhatsApp + Email',
    status:     'Belum Dikirim',
    color:      'red',
  },
];

// ─── Today's Schedule ─────────────────────────────────────────────────────────
const TODAY = '2025-07-17';

function getTodaySchedule() {
  return DUMMY_PATIENTS
    .filter(p => p.tanggal_jadwal === TODAY)
    .sort((a, b) => a.jam_jadwal.localeCompare(b.jam_jadwal));
}

// ─── Follow-up list ───────────────────────────────────────────────────────────
function getFollowUpList() {
  return DUMMY_PATIENTS.filter(p =>
    p.status === STATUS.TIDAK_HADIR || p.status === STATUS.FOLLOW_UP
  );
}

// ─── Need Review list ─────────────────────────────────────────────────────────
function getNeedReviewList() {
  return DUMMY_PATIENTS.filter(p => p.status === STATUS.NEED_REVIEW);
}

// ─── KPIs ─────────────────────────────────────────────────────────────────────
function getKPIs() {
  const active    = DUMMY_PATIENTS.filter(p => p.status !== STATUS.SELESAI).length;
  const today     = getTodaySchedule().length;
  const review    = getNeedReviewList().length;
  const selesai   = DUMMY_PATIENTS.filter(p => p.status === STATUS.SELESAI).length;
  const followup  = getFollowUpList().length;
  const rate      = selesai > 0
    ? Math.round(((selesai - followup) / selesai) * 100)
    : 0;
  return { active, today, review, followupRate: rate };
}

// ─── Report Data (weekly) ─────────────────────────────────────────────────────
const REPORT_WEEKLY = [
  { hari: 'Sen', pasien: 4, selesai: 3 },
  { hari: 'Sel', pasien: 5, selesai: 5 },
  { hari: 'Rab', pasien: 6, selesai: 5 },
  { hari: 'Kam', pasien: 3, selesai: 3 },
  { hari: 'Jum', pasien: 4, selesai: 4 },
  { hari: 'Sab', pasien: 2, selesai: 2 },
  { hari: 'Min', pasien: 0, selesai: 0 },
];

// ─── Helper: Generate patient ID ──────────────────────────────────────────────
function generatePatientId() {
  const year = new Date().getFullYear();
  const max  = DUMMY_PATIENTS.reduce((mx, p) => {
    const n = parseInt(p.patient_id.split('-')[2]) || 0;
    return Math.max(mx, n);
  }, 0);
  return `GFP-${year}-${String(max + 1).padStart(3, '0')}`;
}

// ─── Helper: Format date (ID) ─────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ─── Helper: Today's date string ─────────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// ─── Server Sync Helper ──────────────────────────────────────────────────────
async function syncServer(action, payload = null) {
  const endpoint = CONFIG.FORM_ENDPOINT;
  if (!endpoint) return null;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload })
    });
    const data = await res.json();
    return data;
  } catch(e) {
    console.error('Server sync failed:', e);
    return null;
  }
}

// ─── Helper: Initials from name ───────────────────────────────────────────────
function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

// ─── Make config accessible globally ─────────────────────────────────────────
window.GFP_CONFIG  = CONFIG;
window.GFP_STATUS  = STATUS;
window.GFP_STATUS_BADGE = STATUS_BADGE;
window.GFP_PATIENTS = DUMMY_PATIENTS;
window.GFP_REMINDERS = DUMMY_REMINDERS;
window.GFP_REPORT_WEEKLY = REPORT_WEEKLY;
window.GFP_LAYANAN = LAYANAN_OPTIONS;
window.GFP_HARI    = HARI_OPTIONS;
window.GFP_JAM     = JAM_OPTIONS;
window.GFP_TERAPIS = TERAPIS_LIST;
window.GFP_UTILS   = {
  getTodaySchedule,
  getFollowUpList,
  getNeedReviewList,
  getKPIs,
  generatePatientId,
  formatDate,
  todayStr,
  getInitials,
  syncServer,
};
