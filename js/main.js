document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initHeader();
  initThemeToggle();
});

function initHeader() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header')) {
        navLinks.classList.remove('show');
      }
    });
  }

  const langBtn = document.querySelector('.lang-btn');
  const langDropdown = document.querySelector('.lang-dropdown');

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('show');
    });

    langDropdown.querySelectorAll('button[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        setLang(btn.getAttribute('data-lang'));
        langDropdown.classList.remove('show');
      });
    });
  }

  updateLangUI();
}

function updateLangUI() {
  const lang = document.documentElement.lang || 'en';
  document.querySelectorAll('.lang-dropdown button[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

function initThemeToggle() {
  const themeKey = 'site_theme';
  const savedTheme = localStorage.getItem(themeKey) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) {
    updateThemeIcon(savedTheme);
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(themeKey, next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
  }
}
