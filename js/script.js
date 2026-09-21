document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const menu = document.querySelector('#mainNav');
  const sections = document.querySelectorAll('main section[id]');
  const form = document.querySelector('#projectForm');

  const updatePageState = () => {
    header.classList.toggle('scrolled', window.scrollY > 30);

    let current = 'home';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', updatePageState, { passive: true });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const instance = window.bootstrap?.Collapse.getInstance(menu);
      if (instance) instance.hide();
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }
        );
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.case, .service-list article, .strength-grid article, .timeline div').forEach((element) => observer.observe(element));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = form.querySelectorAll('input, select, textarea');
    let isValid = true;

    fields.forEach((field) => {
      const fieldIsValid = field.checkValidity();
      field.closest('.form-row').classList.toggle('invalid', !fieldIsValid);
      isValid = isValid && fieldIsValid;
    });

    if (isValid) {
      form.querySelector('.form-success').classList.add('show');
      form.reset();
    }
  });

  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => field.closest('.form-row').classList.remove('invalid'));
  });

  updatePageState();
});
