/* ═══════════════════════════════════════════════════
   app.js — Shared frontend utilities
   My Literary Space
   ═══════════════════════════════════════════════════ */

/* ── API URL ──
   window.LITERARY_API is injected by layout.njk from _data/config.json.
   Falls back to the admin-saved localStorage value so development still works. */
function getApiUrl() {
  var baked  = (typeof window.LITERARY_API !== 'undefined') ? window.LITERARY_API : '';
  var stored = localStorage.getItem('literary_api') || '';
  return (baked && baked.length > 10) ? baked : stored;
}

/* ── 5-minute cache ── */
var CACHE_TTL = 5 * 60 * 1000;

function getCached(key) {
  try {
    var raw = localStorage.getItem('lc_' + key);
    if (!raw) return null;
    var obj = JSON.parse(raw);
    if (Date.now() - obj.ts > CACHE_TTL) { localStorage.removeItem('lc_' + key); return null; }
    return obj.data;
  } catch (e) { return null; }
}

function setCached(key, data) {
  try { localStorage.setItem('lc_' + key, JSON.stringify({ data: data, ts: Date.now() })); } catch (e) {}
}

function clearAllCache() {
  Object.keys(localStorage)
    .filter(function(k) { return k.startsWith('lc_'); })
    .forEach(function(k) { localStorage.removeItem(k); });
}

/* ── HTML escape ── */
function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Navigate to single post ── */
function navigateToPost(id, sheet) {
  sessionStorage.setItem('post_id',    String(id));
  sessionStorage.setItem('post_sheet', String(sheet));
  window.location.href = '/post/';
}

/* ── Reading time ── */
function readingTime(text) {
  var words = String(text || '').trim().split(/\s+/).length;
  var mins  = Math.ceil(words / 200);
  return (mins < 1 ? 1 : mins) + ' min read';
}

/* ── Minimal Markdown → HTML renderer ── */
function md(text) {
  text = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  var blocks = text.split(/\n\n+/);
  return blocks.map(function(block) {
    block = block.trim();
    if (!block) return '';
    if (/^### /.test(block)) return '<h3>' + inlineMd(block.replace(/^### /, '')) + '</h3>';
    if (/^## /.test(block))  return '<h2>' + inlineMd(block.replace(/^## /,  '')) + '</h2>';
    if (/^# /.test(block))   return '<h1>' + inlineMd(block.replace(/^# /,   '')) + '</h1>';
    if (/^---+$/.test(block)) return '<hr/>';
    if (/^> /.test(block)) {
      var q = block.split('\n').map(function(l){ return l.replace(/^> ?/, ''); }).join('\n');
      return '<blockquote>' + inlineMd(q) + '</blockquote>';
    }
    if (/^</.test(block)) return block;
    return '<p>' + inlineMd(block.replace(/\n/g, '<br/>')) + '</p>';
  }).join('\n');
}

function inlineMd(t) {
  return String(t)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>')
    .replace(/_(.+?)_/g,       '<em>$1</em>');
}

/* ── Attach dynamic post links (used on listing pages) ── */
function attachPostLinks(container) {
  (container || document).querySelectorAll('[data-post-id]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      navigateToPost(this.dataset.postId, this.dataset.postSheet);
    });
  });
}
