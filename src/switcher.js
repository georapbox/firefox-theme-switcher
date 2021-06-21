const themeSelect = document.getElementById('theme-select');

function enableTheme(evt) {
  evt.preventDefault();
  browser.management.setEnabled(evt.target.value, true);
}

browser.management.getAll().then(extensions => {
  for (const extension of extensions) {
    if (extension.type === 'theme') {
      const option = document.createElement('option');

      option.textContent = extension.name;
      option.title = extension.description;
      option.value = extension.id;

      if (extension.enabled) {
        option.selected = true;
      }

      themeSelect.appendChild(option);
    }
  }
});

themeSelect.addEventListener('change', enableTheme);
