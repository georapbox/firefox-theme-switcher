const themeSelect = document.getElementById('theme-select');

function enableTheme(evt) {
  evt.preventDefault();
  browser.management.setEnabled(evt.target.value, true);
}

browser.management.getAll().then(extensions => {
  const themes = extensions.filter(extension => extension.type === 'theme');

  // Sort themes in place by enabled status, then by name.
  // This puts the enabled theme at the top of the list
  // and sorts the rest of the themes alphabetically.
  themes.sort((a, b) => {
    if (a.enabled && !b.enabled) {
      return -1;
    } else if (!a.enabled && b.enabled) {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  for (const theme of themes) {
    const option = document.createElement('option');

    option.textContent = theme.name;
    option.title = theme.description;
    option.value = theme.id;
    option.selected = !!theme.enabled;

    themeSelect.appendChild(option);
  }
});

themeSelect.addEventListener('change', enableTheme);
