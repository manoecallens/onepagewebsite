(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.site-nav a');

  /* Schaduw onder de header zodra je scrolt */
  let ticking = false;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* Mobiel menu */
  const setMenu = (open) => {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => {
    setMenu(!document.body.classList.contains('nav-open'));
  });
  navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* Eén trek: de waaier gaat open zodra de pagina geladen is */
  const fan = document.querySelector('.fan');
  requestAnimationFrame(() => requestAnimationFrame(() => fan.classList.add('is-ready')));

  /* Actieve staalkaart: navigatie markeren en zijn strook uit de waaier schuiven */
  const pages = [...document.querySelectorAll('.page')];
  const setActive = (id) => {
    navLinks.forEach((link) => {
      const active = link.hash === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    fan.dataset.active = pages.findIndex((page) => page.id === id);
    // Bij de periodeopdracht klapt de waaier weer dicht
    fan.classList.toggle('is-closed', id === 'periodeopdracht');
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('.masthead, .intro, .page, .closing').forEach((section) => observer.observe(section));
})();
