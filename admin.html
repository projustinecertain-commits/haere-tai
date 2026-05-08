const ADMIN_PASSWORD = 'haere2024';
let selectedRarete = 0;
let selectedDanger = '';
let photoFile = null;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-btn').addEventListener('click', tryLogin);
  document.getElementById('password-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') tryLogin(); });
});

function tryLogin() {
  const val = document.getElementById('password-input').value;
  if (val === ADMIN_PASSWORD) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    document.addEventListener('supabase-ready', initAdmin);
    if (window._supabase) initAdmin();
  } else {
    document.getElementById('login-error').classList.remove('hidden');
    document.getElementById('password-input').value = '';
  }
}

function initAdmin() {
  setupPhotoUpload();
  setupStars();
  setupDanger();
  setupSubmit();
  loadAdminList();
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
}

function setupPhotoUpload() {
  const input = document.getElementById('photo-input');
  const preview = document.getElementById('photo-preview');
  const placeholder = document.getElementById('photo-placeholder');
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    photoFile = file;
    preview.src = URL.createObjectURL(file);
    preview.classList.remove('hidden');
    placeholder.classList.add('hidden');
  });
}

function setupStars() {
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRarete = parseInt(star.dataset.value);
      document.getElementById('rarete').value = selectedRarete;
      updateStars();
    });
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.value);
      stars.forEach(s => { s.style.color = parseInt(s.dataset.value) <= val ? 'var(--gold)' : 'var(--star-off)'; });
    });
    star.addEventListener('mouseleave', updateStars);
  });
}

function updateStars() {
  document.querySelectorAll('.star').forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRarete);
    s.style.color = '';
  });
}

function setupDanger() {
  document.querySelectorAll('.danger-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.danger-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedDanger = btn.dataset.value;
      document.getElementById('dangerosite').value = selectedDanger;
    });
  });
}

function setupSubmit() {
  document.getElementById('submit-btn').addEventListener('click', submitSpecies);
}

async function submitSpecies() {
  clearMessages();
  const nomCommun = document.getElementById('nom-commun').value.trim();
  const famille   = document.getElementById('famille').value;
  const lieu      = document.getElementById('lieu').value.trim();
  const date      = document.getElementById('date').value;
  if (!nomCommun || !famille || !lieu || !date) { showError('Merci de remplir les champs obligatoires (*)'); return; }
  if (!photoFile) { showError("Merci d'ajouter une photo"); return; }
  setLoading(true);
  try {
    const ext = photoFile.name.split('.').pop();
    const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: uploadError } = await window._supabase.storage.from(STORAGE_BUCKET).upload(filename, photoFile, { contentType: photoFile.type });
    if (uploadError) throw uploadError;
    const { error: insertError } = await window._supabase.from(TABLE_NAME).insert({
      nom_commun: nomCommun,
      nom_scientifique: document.getElementById('nom-scientifique').value.trim() || null,
      famille, lieu,
      date_observation: date,
      profondeur: document.getElementById('profondeur').value || null,
      rarete: selectedRarete || null,
      dangerosite: selectedDanger || null,
      anecdote: document.getElementById('anecdote').value.trim() || null,
      photo_path: filename,
    });
    if (insertError) throw insertError;
    showSuccess();
    resetForm();
    loadAdminList();
  } catch (err) {
    showError('Erreur : ' + err.message);
  } finally {
    setLoading(false);
  }
}

async function loadAdminList() {
  const listEl = document.getElementById('admin-list');
  listEl.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">Chargement…</p>';
  const { data } = await window._supabase.from(TABLE_NAME).select('*').order('created_at', { ascending: false });
  if (!data || data.length === 0) { listEl.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">Aucune espèce pour l\'instant.</p>'; return; }
  listEl.innerHTML = data.map(s => {
    const imgUrl = getPhotoUrl(s.photo_path);
    return `<div class="admin-list-item">
      ${imgUrl ? `<img class="admin-list-thumb" src="${imgUrl}" alt="${s.nom_commun}" />` : `<div class="admin-list-thumb"></div>`}
      <div class="admin-list-info"><div class="admin-list-name">${s.nom_commun}</div>${s.nom_scientifique ? `<div class="admin-list-sci">${s.nom_scientifique}</div>` : ''}</div>
      <button class="admin-delete-btn" onclick="deleteSpecies(${s.id}, '${s.photo_path}')">Supprimer</button>
    </div>`;
  }).join('');
}

async function deleteSpecies(id, photoPath) {
  if (!confirm('Supprimer cette espèce ?')) return;
  if (photoPath && !photoPath.startsWith('http')) { await window._supabase.storage.from(STORAGE_BUCKET).remove([photoPath]); }
  const { error } = await window._supabase.from(TABLE_NAME).delete().eq('id', id);
  if (!error) loadAdminList();
}

function resetForm() {
  ['nom-commun','nom-scientifique','lieu','profondeur','anecdote'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('famille').value = '';
  document.getElementById('photo-preview').classList.add('hidden');
  document.getElementById('photo-placeholder').classList.remove('hidden');
  document.getElementById('photo-input').value = '';
  photoFile = null; selectedRarete = 0; selectedDanger = '';
  updateStars();
  document.querySelectorAll('.danger-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('date').value = new Date().toISOString().split('T')[0];
}

function setLoading(on) {
  document.getElementById('submit-label').classList.toggle('hidden', on);
  document.getElementById('submit-loading').classList.toggle('hidden', !on);
  document.getElementById('submit-btn').disabled = on;
}

function clearMessages() {
  document.getElementById('submit-error').classList.add('hidden');
  document.getElementById('submit-success').classList.add('hidden');
}

function showError(msg) { const el = document.getElementById('submit-error'); el.textContent = msg; el.classList.remove('hidden'); }
function showSuccess() { document.getElementById('submit-success').classList.remove('hidden'); setTimeout(() => document.getElementById('submit-success').classList.add('hidden'), 4000); }
