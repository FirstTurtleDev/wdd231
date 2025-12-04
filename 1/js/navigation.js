(function() {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'block';
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 700) {
      nav.style.display = 'block';
      btn.setAttribute('aria-expanded', 'false');
    } else {
      nav.style.display = 'none';
    }
  });
})();
