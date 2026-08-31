# Language Service Organization

Website for the Language Service Organization (LSO), a student-led nonprofit
at Avenues NYC that uses English, Spanish, and Chinese to serve New York City
communities.

## Tech

Plain HTML, CSS, and JavaScript. No framework, no build step. Open
`index.html` directly in a browser, or drop the whole folder onto GitHub
Pages or Tiiny.host as is.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home: mission, what we do, impact stats |
| `our-work.html` | Our Work: partner organization cards |
| `get-involved.html` | Get Involved: three steps to join, contact emails |
| `our-people.html` | Our People: leadership and members |

Shared assets:

```
assets/
  css/styles.css   Design system and all styles
  js/main.js       Mobile nav, scroll reveal, i18n scaffold
  img/             Drop real photos here (see placeholders below)
.nojekyll          Tells GitHub Pages to serve assets/ untouched
```

The nav and footer are repeated in each HTML file so the site works with no
build step and no JavaScript dependency for its structure.

## Design choices

Direction: **"Clear Civic."** Clean, light, and trustworthy.

- **Palette:** white and light blue-grey backgrounds with near-black navy
  text. Navy is the dominant dark (footer and impact band), blue is the
  primary accent (buttons, links, navigation), green is the secondary
  highlight (the impact numbers and hover states), and red is reserved for
  the language-separator dots, a small nod to the Chinese half of the work.
- **Type:** Newsreader (a clean, readable serif) for headings, paired with
  Public Sans (the US government's open civic typeface) for body. Noto Sans SC
  and Noto Serif SC are in the font stack so the 中文 in the tagline renders
  cleanly. Fonts load from Google Fonts.
- **Motif:** the `•` separator from the trilingual tagline recurs as a
  connective dot throughout the site.
- **Motion:** the hero settles in on load, sections fade up on scroll, and
  cards and links have tactile hover states. All motion is disabled under
  `prefers-reduced-motion`.
- **Accessibility:** semantic headings, alt text on every image, a skip link,
  visible focus states, strong color contrast, and labeled photo placeholders.

## Photo placeholders

Real photos have not been added yet. Every spot for one is a clearly labeled
box that shows the exact file name it is waiting for. Drop a photo with that
name into `assets/img/` and it appears automatically, no code editing needed.
See **PHOTOS.md** for the step by step guide and the full list of file names.

## Adding Spanish and Chinese later

The site is English only today but is structured for an English / Spanish /
Chinese toggle with no markup rewrite:

1. Every translatable string carries a `data-i18n="key"` attribute.
2. `assets/js/main.js` holds an `I18N` dictionary that currently contains only
   the `en` entry. Fill in the `es` and `zh` objects with the same keys.
3. The language switcher in the header (EN / ES / 中) enables each button
   automatically once its dictionary exists, and remembers the choice.

## Credits

Made by students at Avenues NYC.
