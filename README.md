# MTE200 Website

Static site (GitHub Pages) for the course MTE200 Medical Equipment.

## Structure
- `index.html` – landing page with bilingual (NO/EN) toggle
- `assets/css/style.css` – styling
- `assets/js/i18n.js` – language handling
- `assets/js/exercises.js` – exercise metadata + dynamic rendering
- `assets/js/main.js` – small helpers
- Word `.docx` lab files kept at repo root for direct download

## Adding / Updating Exercises
Edit `assets/js/exercises.js` and add an object to the `EXERCISES` array.

```js
{
  id: 'new-id',
  file: 'Exact filename.docx',
  title: { en: 'English Title', no: 'Norsk tittel' },
  tags: ['tag1','tag2'],
  blurb: { en: 'Short English summary.', no: 'Kort norsk sammendrag.' }
}
```

## GitHub Pages Setup
1. Push this repository to GitHub (main branch).
2. In repo Settings → Pages:
   - Source: Deploy from a branch
   - Branch: `main` (root) and save.
3. After a minute the site will be live at `https://<username>.github.io/MTE200/`.

## Local Preview
Just open `index.html` in a browser (no build step required).

## License
Educational use only.
