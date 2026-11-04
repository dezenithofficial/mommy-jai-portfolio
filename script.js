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
})();
