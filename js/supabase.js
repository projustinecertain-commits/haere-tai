const SUPABASE_URL   = 'https://obpnydjdhwtamxvdehju.supabase.co';
const SUPABASE_ANON  = 'sb_publishable_XPUqZNUp8TQfmuX1ajEhjw_DIJFX3o0';
const STORAGE_BUCKET = 'species-photos';
const TABLE_NAME     = 'species';

function getStarsHTML(n) {
  if (!n) return '';
  let html = '';
  for (let i = 1; i <= 5; i++) { html += i <= n ? '★' : ''; }
  return html;
}

function getDangerClass(val) {
  if (val === 'vert')   return 'green';
  if (val === 'orange') return 'orange';
  if (val === 'rouge')  return 'red';
  return '';
}

function getDangerLabel(val) {
  if (val === 'vert')   return 'Sans danger';
  if (val === 'orange') return 'Prudence';
  if (val === 'rouge')  return 'Dangereux';
  return '';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getPhotoUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${path}`;
}

async function dbFetch(table, params = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`
    }
  });
  return res.json();
}

async function dbInsert(table, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erreur insertion');
  }
}

async function dbDelete(table, id) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`
    }
  });
  if (!res.ok) throw new Error('Erreur suppression');
}

async function storageUpload(bucket, filename, file) {
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${filename}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`,
      'Content-Type': file.type
    },
    body: file
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erreur upload');
  }
}

async function storageDelete(bucket, paths) {
  await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_ANON,
      'Authorization': `Bearer ${SUPABASE_ANON}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prefixes: paths })
  });
}
