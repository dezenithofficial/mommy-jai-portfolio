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
  const submitButton = form?.querySelector('.submit-button');
  const originalButtonMarkup = submitButton?.innerHTML;
  const fallbackLink = document.getElementById('inquiry-email-fallback');
  const createFallbackLink = () => {
    if (!fallbackLink || !form) return;
    const fields = new FormData(form);
    const brand = String(fields.get('brand') || '').trim();
    const subject = `Collaboration inquiry — ${brand || 'Website visitor'}`;
    const body = [
      'Hi Mommy Jai,',
      '',
      'I tried sending an inquiry through your website form.',
      '',
      `Contact name: ${String(fields.get('contact_name') || '').trim()}`,
      `Brand / business: ${brand}`,
      `Contact email: ${String(fields.get('email') || '').trim()}`,
      `Collaboration type: ${String(fields.get('type') || '').trim()}`,
      '',
      'Campaign details:',
      String(fields.get('message') || '').trim(),
      '',
      'Thank you!'
    ].join('\n');
    fallbackLink.href = `mailto:mommyjaiferrer@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    fallbackLink.hidden = false;
  };

  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || submitButton?.disabled) return;

    const payload = Object.fromEntries(new FormData(form));
    if (String(payload._honey || '').trim()) return;
    const setStatus = (message, type) => {
      if (!status) return;
      status.textContent = message;
      status.dataset.state = type;
    };

    if (fallbackLink) fallbackLink.hidden = true;
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Sending inquiry…';
    setStatus('Submitting your inquiry securely…', 'sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/mommyjaiferrer@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      let result = null;
      try { result = await response.json(); } catch (_) { /* invalid provider response */ }

      // Some providers encode boolean outcomes as strings. Never treat "false" as truthy.
      const accepted = response.ok && (result?.success === true || result?.success === 'true');
      if (!accepted) {
        const message = String(result?.message || '');
        if (/activat/i.test(message)) {
          throw new Error('This form needs one-time email activation. Please email Mommy Jai directly until activation is complete.');
        }
        throw new Error('The inquiry could not be delivered. Please email Mommy Jai directly at mommyjaiferrer@gmail.com.');
      }

      form.reset();
      setStatus('Inquiry submitted! Your details have been accepted for email delivery to Mommy Jai. Thank you for reaching out.', 'success');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Online submission is temporarily unavailable. Use the prefilled email option below.', 'error');
      createFallbackLink();
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = originalButtonMarkup;
    }
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

  // Context-aware mobile conversion dock. Only appears when the hero CTA has
  // scrolled out, and disappears near the contact form or while using inputs.
  const dock = document.getElementById('mobile-cta');
  const heroActions = document.querySelector('.hero-actions');
  const contact = document.getElementById('contact');
  const mobileViewport = window.matchMedia('(max-width: 767px)');
  let formFocused = false;
  const updateDock = () => {
    if (!dock || !heroActions || !contact) return;
    const heroBelowHeader = heroActions.getBoundingClientRect().bottom < 80;
    const contactNotYetReached = contact.getBoundingClientRect().top > window.innerHeight * 0.78;
    const menuOpen = menu?.getAttribute('aria-expanded') === 'true';
    const vv = window.visualViewport;
    const keyboardOpen = !!vv && vv.height < window.innerHeight * 0.72;
    const show = mobileViewport.matches && heroBelowHeader &&
      contactNotYetReached && !formFocused && !keyboardOpen && !menuOpen;
    dock.classList.toggle('is-visible', show);
    dock.setAttribute('aria-hidden', String(!show));
    dock.inert = !show;
  };
  document.addEventListener('focusin', e => {
    if (e.target.matches('input, textarea, select')) { formFocused = true; updateDock(); }
  });
  document.addEventListener('focusout', e => {
    if (e.target.matches('input, textarea, select')) {
      formFocused = false;
      requestAnimationFrame(updateDock);
    }
  });
  dock?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    dock.classList.remove('is-visible');
    dock.setAttribute('aria-hidden','true');
    dock.inert=true;
  }));
  menu?.addEventListener('click', updateDock);
  window.addEventListener('scroll', updateDock, {passive:true});
  window.addEventListener('resize', updateDock);
  window.visualViewport?.addEventListener('resize', updateDock);
  mobileViewport.addEventListener?.('change', updateDock);
  requestAnimationFrame(updateDock);
})();
