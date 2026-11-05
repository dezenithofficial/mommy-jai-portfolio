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
  // Set the form's data-formspree-endpoint to its verified Formspree URL.
  const endpoint = (form?.dataset.formspreeEndpoint || '').trim();
  const endpointReady = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint);
  const setStatus = (message, state) => {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state;
  };
  const makeEmailDraft = () => {
    if (!form) return '';
    const fields = new FormData(form);
    const brand = String(fields.get('brand') || '').trim();
    const subject = 'Collaboration inquiry — ' + (brand || 'Website visitor');
    const body = [
      'Hi Mommy Jai,',
      '',
      "I'd love to explore a collaboration.",
      '',
      'Contact name: ' + String(fields.get('contact_name') || '').trim(),
      'Brand / business: ' + brand,
      'Contact email: ' + String(fields.get('email') || '').trim(),
      'Collaboration type: ' + String(fields.get('type') || '').trim(),
      '',
      'Campaign details:',
      String(fields.get('message') || '').trim(),
      '',
      'Thank you!'
    ].join('\n');
    const url = 'mailto:mommyjaiferrer@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    if (fallbackLink) {
      fallbackLink.href = url;
      fallbackLink.hidden = false;
    }
    return url;
  };
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || submitButton?.disabled) return;
    const fields = new FormData(form);
    if (String(fields.get('_gotcha') || '').trim()) return;
    if (fallbackLink) fallbackLink.hidden = true;
    if (!endpointReady) {
      const emailLink = makeEmailDraft();
      setStatus('An email draft has been prepared with your details. Please press Send in your email app; the inquiry has not been submitted yet.', 'sending');
      if (emailLink) window.location.href = emailLink;
      return;
    }
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Sending inquiry…';
    setStatus('Sending your inquiry securely…', 'sending');
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 12000);
      let response;
      try {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: fields,
          signal: controller.signal
        });
      } finally {
        clearTimeout(timer);
      }
      if (!response.ok) {
        let details = '';
        try {
          const data = await response.json();
          details = Array.isArray(data?.errors)
            ? data.errors.map(item => String(item.message || '')).filter(Boolean).slice(0, 2).join(' ')
            : '';
        } catch (_) { /* Use the generic error message if the provider returned no JSON. */ }
        throw new Error(details || 'Your inquiry was not accepted by the form service.');
      }
      form.reset();
      setStatus('Thank you! Your inquiry was submitted successfully. Mommy Jai will review your details and reply by email.', 'success');
    } catch (error) {
      makeEmailDraft();
      const providerError = error instanceof Error && !/abort|network|failed to fetch/i.test(error.message)
        ? error.message + ' '
        : '';
      setStatus(providerError + 'Online delivery could not be confirmed. Your details are still here. Use the email option below to send them instead.', 'error');
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

  // In-page featured campaign viewer (V1.4). Loads official embeds only after click.
  const viewer = document.getElementById('campaign-viewer');
  const projects = [...document.querySelectorAll('.campaign-item[data-embed-kind]')];
  if (viewer && typeof viewer.showModal === 'function' && projects.length) {
    const frame = document.getElementById('viewer-frame');
    const title = document.getElementById('viewer-title');
    const caption = document.getElementById('viewer-caption');
    const category = document.getElementById('viewer-category');
    const facts = document.getElementById('viewer-facts');
    const original = document.getElementById('viewer-original');
    const fallback = document.getElementById('viewer-fallback');
    const close = document.getElementById('viewer-close');
    const previous = document.getElementById('viewer-prev');
    const next = document.getElementById('viewer-next');
    const count = document.getElementById('viewer-count');
    let active = -1;
    let origin = null;

    const getEmbed = project => {
      const kind = project.dataset.embedKind;
      const ref = project.dataset.embedRef || '';
      if (kind === 'tiktok' && /^[0-9]{15,22}$/.test(ref)) {
        return 'https://www.tiktok.com/player/v1/' + ref + '?controls=1&autoplay=0&description=0&music_info=0&rel=0';
      }
      if ((kind === 'facebook-video' || kind === 'facebook-post') && ref.startsWith('https://www.facebook.com/')) {
        const route = kind === 'facebook-video' ? 'video.php' : 'post.php';
        const url = new URL('https://www.facebook.com/plugins/' + route);
        url.searchParams.set('href', ref);
        url.searchParams.set('width', '500');
        url.searchParams.set('show_text', kind === 'facebook-post' ? 'true' : 'false');
        return url.toString();
      }
      return '';
    };

    const display = index => {
      if (index < 0 || index >= projects.length) return;
      active = index;
      const project = projects[index];
      const link = project.querySelector('.work-card');
      const cardTitle = project.querySelector('.card-info h3')?.textContent?.trim() || 'Campaign';
      title.textContent = cardTitle;
      caption.textContent = project.querySelector('.card-info p')?.textContent?.trim() || '';
      category.textContent = project.querySelector('.card-type')?.textContent?.trim() || 'Creator work';
      original.href = link.href;
      fallback.href = link.href;
      count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(projects.length).padStart(2, '0');
      previous.disabled = index === 0;
      next.disabled = index === projects.length - 1;
      facts.replaceChildren();
      project.querySelectorAll('.campaign-facts > div').forEach(node => facts.appendChild(node.cloneNode(true)));
      frame.src = 'about:blank'; // Stop sound from the previous campaign.
      frame.title = 'Embedded ' + cardTitle + ' on ' + (project.dataset.embedKind === 'tiktok' ? 'TikTok' : 'Facebook');
      const src = getEmbed(project);
      if (src) frame.src = src;
    };

    projects.forEach((project,index) => {
      [project.querySelector('.work-card'),project.querySelector('.case-source')].forEach(link => {
        link?.addEventListener('click', event => {
          if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          origin = link;
          display(index);
          if (!viewer.open) viewer.showModal();
          document.body.classList.add('viewer-open');
          close.focus({preventScroll:true});
        });
      });
    });
    close.addEventListener('click', () => viewer.close());
    previous.addEventListener('click', () => display(active - 1));
    next.addEventListener('click', () => display(active + 1));
    viewer.addEventListener('click', event => {
      if (event.target === viewer) viewer.close();
    });
    viewer.addEventListener('close', () => {
      frame.src = 'about:blank';
      document.body.classList.remove('viewer-open');
      origin?.focus({preventScroll:true});
      origin = null;
      active = -1;
    });
  }

})();
