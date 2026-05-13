let allSpecies = [];
let currentFamille = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', init);

async function init() {
  await loadSpecies();
  setupFilters();
  setupSearch();
}

async function loadSpecies() {
  const grid = document.getElementById('gallery-grid');
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*&order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${SUPABASE_ANON}`
      }
    });
    const data = await res.json();
    allSpecies = data || [];
    document.getElementById('species-count').textContent = allSpecies.length;
    renderGallery();
  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><p>Erreur de chargement</p></div>`;
  }
}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  let filtered = allSpecies;
  if (currentFamille !== 'all') {
    filtered = filtered.filter(s => s.famille === currentFamille);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(s =>
      (s.nom_commun || '').toLowerCase().includes(q) ||
      (s.nom_scientifique || '').toLowerCase().includes(q) ||
      (s.lieu || '').toLowerCase().includes(q)
    );
  }
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state"><p>Aucune espèce trouvée</p></div>`;
    return;
  }
  grid.innerHTML = filtered.map((s, i) => {
    const imgUrl = getPhotoUrl(s.photo_path);
    const stars  = getStarsHTML(s.rarete);
    const danger = getDangerClass(s.dangerosite);
    const delay  = Math.min(i * 0.05, 0.5);
    return `
      <div class="species-card" onclick="goToFiche(${s.id})" style="animation-delay:${delay}s">
        ${imgUrl ? `<img class="card-img" src="${imgUrl}" alt="${s.nom_commun}" loading="lazy" />` : `<div class="card-img"></div>`}
        <div class="card-overlay">
          <div class="card-famille">${s.famille || ''}</div>
          <div class="card-nom">${s.nom_commun || ''}</div>
          ${s.nom_scientifique ? `<div class="card-sci">${s.nom_scientifique}</div>` : ''}
          <div class="card-meta">
            <div class="card-stars">${stars}</div>
            ${danger ? `<div class="card-danger ${danger}"></div>` : ''}
          </div>
        </div>
      </div>`;
  }).join('');
}

function goToFiche(id) {
  window.location.href = `fiche.html?id=${id}`;
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFamille = btn.dataset.famille;
      renderGallery();
    });
  });
}

function setupSearch() {
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderGallery();
  });
}
