(() => {
  const menu = document.querySelector('.menu-toggle');
  const mobile = document.getElementById('mobile-nav');
  if (menu && mobile) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      menu.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      mobile.hidden = open;
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobile.hidden = true;
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open menu');
    }));
  }
  document.getElementById('year').textContent = String(new Date().getFullYear());
  const form = document.getElementById('inquiry-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const brand = String(fields.get('brand') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const type = String(fields.get('type') || '').trim();
    const message = String(fields.get('message') || '').trim();
    const subject = `Collaboration inquiry — ${brand}`;
    const body = `Hi Mommy Jai,\n\nI'd love to explore a collaboration.\n\nBrand / business: ${brand}\nContact email: ${email}\nCollaboration type: ${type}\n\nCampaign details:\n${message}\n\nThank you!`;
    const mailto = `mailto:mommyjaiferrer@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email app should open with the prepared message. Please send it there to complete the inquiry. If nothing opens, email mommyjaiferrer@gmail.com directly.';
    window.location.href = mailto;
  });

  // Motion effects enhance rather than gate the content; respect reduced motion.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bar = document.querySelector('.scroll-progress span');
  const header = document.querySelector('.site-header');
  const track = () => {
    const distance = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (distance > 0 ? Math.min(100,scrollY / distance * 100) : 0) + '%';
    header?.classList.toggle('is-scrolled', scrollY > 10);
  };
  track();
  addEventListener('scroll', track, {passive:true});
  addEventListener('resize', track);
  if (!reduced && 'IntersectionObserver' in window) {
    const items = [...document.querySelectorAll('.hero-copy > *, .section-heading > *, .work-card, .service-card, .about-art, .about-copy > *, .brand-content > *, .contact-heading > *, .inquiry-form > *')];
    document.body.classList.add('js-motion');
    items.forEach((el,i) => { el.classList.add('reveal-item'); el.style.transitionDelay = (i%4)*90+'ms'; });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, {threshold:0.08,rootMargin:'0px 0px 30px 0px'});
    items.forEach(el => observer.observe(el));
  }
})();
