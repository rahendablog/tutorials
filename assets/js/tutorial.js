(function () {
  var KEY = 'tutorial:' + location.pathname;

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  var state = load();

  // Theme toggle (shared by every page of the site)
  var THEME_KEY = 'tutorial-theme';
  var root = document.documentElement;
  var savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  var toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  });

  // Step completion and progress bar
  var stepBoxes = Array.prototype.slice.call(document.querySelectorAll('input[data-step]'));
  var bar = document.getElementById('progressBar');
  var label = document.getElementById('progressLabel');

  function render() {
    if (!bar || !label) return;
    var done = 0;
    stepBoxes.forEach(function (box) {
      var id = box.getAttribute('data-step');
      var section = document.getElementById(id);
      var link = document.querySelector('.toc a[href="#' + id + '"]');
      section.classList.toggle('is-done', box.checked);
      if (link) link.classList.toggle('is-done', box.checked);
      if (box.checked) done++;
    });
    bar.style.width = (stepBoxes.length ? done / stepBoxes.length * 100 : 0) + '%';
    label.textContent = done + ' of ' + stepBoxes.length + ' steps';
  }

  stepBoxes.forEach(function (box) {
    var id = box.getAttribute('data-step');
    box.checked = !!(state.steps && state.steps[id]);
    box.addEventListener('change', function () {
      state.steps = state.steps || {};
      state.steps[id] = box.checked;
      save(state);
      render();
    });
  });

  // Checklist items that remember their state
  document.querySelectorAll('input[data-persist]').forEach(function (box) {
    box.checked = !!(state.checks && state.checks[box.id]);
    box.addEventListener('change', function () {
      state.checks = state.checks || {};
      state.checks[box.id] = box.checked;
      save(state);
    });
  });

  render();

  // Highlight the current section in the table of contents
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    links.forEach(function (a) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) observer.observe(target);
    });
  }
})();
