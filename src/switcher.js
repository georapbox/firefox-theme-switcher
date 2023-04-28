(async function () {
  const themesList = document.getElementById('themes-list');
  const searchInput = document.getElementById('search');

  const extensions = await browser.management.getAll() || [];
  const allThemes = extensions.filter(extension => extension.type === 'theme');
  const systemThemeIds = ['default-theme@mozilla.org', 'firefox-compact-light@mozilla.org', 'firefox-compact-dark@mozilla.org'];
  const systemThemes = allThemes.filter(theme => systemThemeIds.includes(theme.id));
  const userThemes = allThemes.filter(theme => !systemThemeIds.includes(theme.id));

  userThemes.sort((a, b) => a.name.localeCompare(b.name));

  const themes = [...systemThemes, ...userThemes];

  const createTheme = theme => {
    const li = document.createElement('li');
    const themeButton = document.createElement('button');

    themeButton.type = 'button';
    themeButton.textContent = theme.name;
    themeButton.title = theme.description;
    themeButton.setAttribute('data-id', theme.id);
    themeButton.toggleAttribute('data-enabled', !!theme.enabled);

    if (systemThemeIds.includes(theme.id)) {
      const em = document.createElement('em');
      em.style.opacity = 0.7;
      em.textContent = ' (system theme)';
      themeButton.appendChild(em);
    }

    li.appendChild(themeButton);
    themesList.appendChild(li);
  };

  // Sort themes in place by enabled status.
  // This puts the enabled theme at the top of the list.
  themes.sort((a, b) => {
    if (a.enabled && !b.enabled) {
      return -1;
    } else if (!a.enabled && b.enabled) {
      return 1;
    }
  });

  for (const theme of themes) {
    createTheme(theme);
  }

  const onSelect = evt => {
    evt.preventDefault();

    const themeButton = evt.target.closest('button');

    if (themeButton) {
      browser.management.setEnabled(themeButton.getAttribute('data-id'), true);

      themesList.querySelectorAll('button[data-enabled]').forEach(btn => {
        btn.removeAttribute('data-enabled');
        btn.querySelector('.icon')?.remove();
      });

      themeButton.setAttribute('data-enabled', '');
    }
  };

  const onSearch = evt => {
    const value = evt.target.value.trim();

    themesList.replaceChildren();

    const filteredThemes = themes.filter(theme => {
      return theme.name.toLowerCase().includes(value.toLowerCase());
    });

    for (const theme of filteredThemes) {
      createTheme(theme);
    }
  };

  themesList.addEventListener('click', onSelect);
  searchInput.addEventListener('input', onSearch);
}());

