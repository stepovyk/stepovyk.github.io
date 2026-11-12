// Stepovyk: поява блоків, «Поділитися» і підкреслення розділу в меню.
(() => {
  const io = 'IntersectionObserver' in window && new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0 });
  document.querySelectorAll('.rise').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  const toast = document.querySelector('.toast');
  const say = t => { toast.textContent = t; toast.classList.add('on'); setTimeout(() => toast.classList.remove('on'), 2200); };
  const share = document.querySelector('[data-share]');
  if (share && toast) share.addEventListener('click', async () => {
    const data = { title: 'Ігри українською', text: 'Безкоштовні українські локалізації ігор', url: 'https://stepovyk.github.io/' };
    if (navigator.share) { try { await navigator.share(data); } catch (_) {} return; }
    try { await navigator.clipboard.writeText(data.url); say('Посилання скопійовано'); }
    catch (_) { say('stepovyk.github.io'); }
  });

  // меню: пензель підкреслює розділ, який зараз на екрані
  const links = new Map([...document.querySelectorAll('.nav a[href^="#"]')].map(a => [a.hash.slice(1), a]));
  const spy = 'IntersectionObserver' in window && new IntersectionObserver(es => es.forEach(e => {
    const a = links.get(e.target.id);
    if (!a) return;
    a.classList.toggle('on', e.isIntersecting);
    e.isIntersecting ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current');
  }), { rootMargin: '-45% 0px -50% 0px' });
  if (spy) links.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
})();
