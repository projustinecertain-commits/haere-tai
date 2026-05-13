const SUPABASE_URL    = 'https://obpnydjdhwtamxvdehju.supabase.co';
const SUPABASE_ANON   = 'sb_publishable_XPUqZNUp8TQfmuX1ajEhjw_DIJFX3o0';
const STORAGE_BUCKET  = 'species-photos';
const TABLE_NAME      = 'species';

// Client Supabase via CDN
(function loadSupabase() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/dist/umd/supabase.min.js';
  script.onload = () => {
    window._supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth: { persistSession: false }
    });
    document.dispatchEvent(new Event('supabase-ready'));
  };
  document.head.appendChild(script);
})();

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
