// Supabase helper
async function sbFetch(path, opts = {}) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + path, {
    ...opts,
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': opts.prefer || 'return=representation', ...opts.headers }
  });
  if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.message || res.statusText); }
  return res.json();
}

// Toast
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#1a1a1a;color:#fff;padding:12px 24px;border-radius:8px;font-size:13px;z-index:9999;opacity:0;transition:opacity .3s;'; document.body.appendChild(t); }
  t.textContent = msg; t.style.opacity = '1';
  setTimeout(() => t.style.opacity = '0', 3000);
}

// Auth check
const user = JSON.parse(localStorage.getItem('lml_user') || 'null');
if (user) {
  document.querySelectorAll('.auth-gate').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.auth-content').forEach(el => el.style.display = 'block');
}
