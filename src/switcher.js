const themeSelect = document.getElementById('theme-select');

function enableTheme(evt) {
  evt.preventDefault();
  browser.management.setEnabled(evt.target.value, true);
}

browser.management.getAll().then(extensions => {
  var themes = [];
  
  for (const extension of extensions) {
    if (extension.type === 'theme') {
      if (extension.enabled) { // current theme at the top
        const option = document.createElement('option');

        option.textContent = extension.name;
        option.title = extension.description;
        option.value = extension.id;
        option.selected = true;
        
        themeSelect.appendChild(option);
      }
      else {
        themes.push([extension.name, extension.description, extension.id, extension.enabled]);
      }
    }
  }
  themes.sort();
  
  for (const theme of themes) {
    const option = document.createElement('option');

    option.textContent = theme[0];
    option.title = theme[1];
    option.value = theme[2];
    option.selected = theme[3];

    themeSelect.appendChild(option);
  }
});

themeSelect.addEventListener('change', enableTheme);
