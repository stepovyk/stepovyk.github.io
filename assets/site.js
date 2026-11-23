(() => {
  const seen = 'IntersectionObserver' in window && new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); seen.unobserve(e.target); }
  }), { threshold: 0.05 });
  document.querySelectorAll('.rise, .section-head, .steps').forEach(el => seen ? seen.observe(el) : el.classList.add('in'));

  const toast = document.querySelector('.toast');
  const say = text => {
    toast.textContent = text;
    toast.classList.add('on');
    setTimeout(() => toast.classList.remove('on'), 2200);
  };
  document.querySelectorAll('[data-share]').forEach(button => button.addEventListener('click', async () => {
    const { title, text, url, copied } = button.dataset;
    if (navigator.share) {
      try { await navigator.share({ title, text, url }); } catch (_) {}
      return;
    }
    try { await navigator.clipboard.writeText(url); say(copied); } catch (_) { say(url); }
  }));

  document.querySelectorAll('[popover] a').forEach(a => a.addEventListener('click', () => a.closest('[popover]').hidePopover()));

  const links = new Map([...document.querySelectorAll('.nav a[href^="#"]')].map(a => [a.hash.slice(1), a]));
  const spy = links.size && 'IntersectionObserver' in window && new IntersectionObserver(entries => entries.forEach(e => {
    const a = links.get(e.target.id);
    if (e.isIntersecting) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  }), { rootMargin: '-45% 0px -50% 0px' });
  if (spy) links.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
})();
