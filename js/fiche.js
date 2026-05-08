document.addEventListener('supabase-ready', init);

async function init() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) { window.location.href = 'index.html'; return; }
  const content = document.getElementById('fiche-content');
  try {
    const { data, error } = await window._supabase
      .from(TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) throw error || new Error('Espèce introuvable');
    document.title = `Haere Tai — ${data.nom_commun}`;
    renderFiche(data, content);
  } catch (err) {
    content.innerHTML = `<div class="loading-state"><p>Espèce introuvable</p><a href="index.html" class="back-link">← Retour</a></div>`;
  }
}

function renderFiche(s, container) {
  const imgUrl  = getPhotoUrl(s.photo_path);
  const stars   = getStarsHTML(s.rarete);
  const danger  = getDangerClass(s.dangerosite);
  const dangerL = getDangerLabel(s.dangerosite);
  container.innerHTML = `
    ${imgUrl ? `<div class="fiche-hero"><img src="${imgUrl}" alt="${s.nom_commun}" /><div class="fiche-hero-overlay"></div></div>` : ''}
    <div class="fiche-header">
      ${s.famille ? `<div class="fiche-famille">${s.famille}</div>` : ''}
      <h1 class="fiche-nom">${s.nom_commun || ''}</h1>
      ${s.nom_scientifique ? `<div class="fiche-sci">${s.nom_scientifique}</div>` : ''}
      <div class="fiche-badges">
        ${s.rarete ? `<div class="fiche-stars">${stars}</div>` : ''}
        ${danger ? `<div class="fiche-danger-badge"><div class="danger-dot-lg ${danger}"></div><span>${dangerL}</span></div>` : ''}
      </div>
    </div>
    <div class="fiche-meta-grid">
      ${s.lieu ? `<div class="fiche-meta-item"><div class="meta-label">Lieu</div><div class="meta-value">${s.lieu}</div></div>` : ''}
      ${s.date_observation ? `<div class="fiche-meta-item"><div class="meta-label">Date</div><div class="meta-value">${formatDate(s.date_observation)}</div></div>` : ''}
      ${s.profondeur ? `<div class="fiche-meta-item"><div class="meta-label">Profondeur</div><div class="meta-value">${s.profondeur} m</div></div>` : ''}
    </div>
    ${s.anecdote ? `<div class="fiche-anecdote"><div class="anecdote-label">Observation</div><div class="anecdote-text">${s.anecdote}</div></div>` : ''}
  `;
}
