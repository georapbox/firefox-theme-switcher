const themeSelect = document.getElementById('theme-select');

function enableTheme(evt) {
  evt.preventDefault();
  browser.management.setEnabled(evt.target.value, true);
  window.close();
}

browser.management.getAll().then((extensions) => {
  for (let extension of extensions) {
    if (extension.type === 'theme') {
      let option = document.createElement('option');

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
