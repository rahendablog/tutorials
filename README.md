# Tutorials

One-page, step-by-step tutorials, published with GitHub Pages. Plain HTML and CSS: no build step and no dependencies.

## Structure

```
index.html                  Home page, lists every tutorial
tutorials/_template.html    Starting point for a new tutorial
tutorials/*.html            One file per tutorial
assets/css/theme.css        Shared theme (light and dark)
assets/js/tutorial.js       Theme toggle, step progress, table-of-contents highlight
.nojekyll                   Serve files as-is (no Jekyll processing)
```

## Add a tutorial

1. Copy `tutorials/_template.html` to `tutorials/your-topic.html`.
2. Replace every yellow `[placeholder]`, then remove its `<span class="fill">` wrapper and the banner at the top.
3. Add a card for it in the `tutorial-grid` list in `index.html`.

`tutorials/publish-a-tutorial.html` is a filled-in example, with the full walkthrough.

## Enable GitHub Pages

In the repository, go to **Settings → Pages**, set **Source** to *Deploy from a branch*, pick `main` and `/ (root)`, then save.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.
