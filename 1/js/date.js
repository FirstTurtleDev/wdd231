(function() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const last = document.getElementById('lastModified');
  if (last) last.textContent = 'Last modified: ' + document.lastModified;
})();
