/** Café Bloom - page interactions */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const gallery = document.querySelector('.instagram-gallery');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (gallery && !reduceMotion && 'IntersectionObserver' in window) {
    const galleryItems = gallery.querySelectorAll('.insta-item');
    galleryItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
    });
    gallery.classList.add('is-stagger-ready');

    const galleryObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        gallery.classList.add('is-visible');
        observer.unobserve(gallery);
      }
    }, { threshold: 0.15 });

    galleryObserver.observe(gallery);
  }

  const conceptText = document.querySelector('.concept-text-col');
  if (conceptText && !reduceMotion && 'IntersectionObserver' in window) {
    const conceptObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        conceptText.classList.add('is-visible');
        observer.unobserve(conceptText);
      }
    }, { threshold: 0.2 });

    conceptObserver.observe(conceptText);
    conceptText.classList.add('is-reveal-ready');
  }

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-navigation');
  const backToTopButton = document.querySelector('.back-to-top');

  const setMenuOpen = (isOpen) => {
    menuToggle?.setAttribute('aria-expanded', String(isOpen));
    menuToggle?.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    navigation?.classList.toggle('is-open', isOpen);
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  navigation?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  const updateHeader = () => {
    const isVisible = window.scrollY > 40;
    header?.classList.toggle('is-visible', isVisible);
    backToTopButton?.classList.toggle('is-visible', isVisible);
    if (header) {
      header.style.boxShadow = isVisible ? '0 3px 12px rgba(61, 43, 31, 0.07)' : 'none';
    }
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  backToTopButton?.addEventListener('click', () => {
    if (reduceMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const headerHeight = header?.classList.contains('is-visible') ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});
