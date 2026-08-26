# Pure Vitality Infusion Services — website

The public site for Pure Vitality Infusion Services, a nurse-led IV therapy and
wellness clinic at 1977 Hendersonville Rd #1, Asheville, NC 28803.

Ten hand-written HTML pages, one stylesheet, one small JS file. **No framework,
no npm, no build step, no bundler.** Cloudflare Pages serves the repo root
as-is, and every page opens correctly straight off the filesystem — double-click
`index.html` and it works.

```
├── index.html               hero · trust strip · services · Chelsey · mobile · closing
├── wellness-injections.html
├── iv-therapy.html
├── lab-draw.html
├── mobile-infusions.html    also carries the 14-community service area
├── red-light-therapy.html
├── about.html
├── faq.html                 <details>/<summary> accordion, no JS
├── contact.html             Formspree form → mgoqbapq
├── 404.html
├── css/pure-vitality.css    the only stylesheet
├── js/site.js               nav toggle · tel: GA event · copyright year
├── assets/                  logo, favicon, OG image, photos/
├── _headers                 security + cache headers
├── _redirects               old Squarespace paths
├── robots.txt
└── sitemap.xml
```

## Deploying

Cloudflare Pages, connected to `main`:

| Setting | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(empty)* |
| Build output directory | `/` |

There is nothing to compile. A push to `main` is a deploy.

Canonical URLs and `sitemap.xml` use extensionless paths
(`/about`, not `/about.html`) because that is what Cloudflare Pages itself
redirects to. Links inside the HTML keep the `.html` extension so the pages
still work when opened from disk.

## Palette — Muted Rose

| Token | Hex | Used for |
|---|---|---|
| `--pv-ink` | `#2E2A2C` | headings, primary text |
| `--pv-ink-soft` | `#5F565A` | body copy on white |
| `--pv-ink-warm` | `#4E4649` | body copy on warm sand |
| `--pv-plum` | `#7A3B52` | every button fill, italic emphasis, prices, closing background |
| `--pv-rose` | `#B0687C` | borders, underlines, arrows, eyebrows |
| `--pv-blush` | `#F0DDE1` | hairline borders |
| `--pv-sand` | `#F7F3EE` | alternating section background |
| `--pv-sage` | `#8C9A87` | reserved, currently unused |
| `--pv-paper` | `#FFFFFF` | page background |

**Contrast rule, non-negotiable:** white text sits only on `--pv-plum`.
`--pv-rose` fails AA against white, so it is only ever a 1px border, an
underline, an arrow glyph, or small text on a light background. It is never a
fill behind white text.

Type is **Newsreader** 400 + 400 italic for every heading (never bold) and
**Hanken Grotesk** 400/500/600 for body, nav and buttons. Square corners
everywhere, no shadows, no gradients.

## The two rules that keep this site calm

**Four buttons on the homepage. That is the budget.**

1. header — `Book a visit`
2. hero — `Book a visit`
3. mobile infusions section — `Book a visit`
4. closing section — `Book a visit` (`.pv-btn--invert`)

Every other action on the homepage is a text link (`.pv-link`) or a whole-card
link (`.pv-service-card`). Service cards have no button inside them — the card
*is* the link. Phone numbers and email addresses are always plain `tel:` /
`mailto:` links, never buttons.

The CTA label is `Book a visit` site-wide. Not "Book Now", not "Schedule", not
"Get Started". The only exception on the whole site is the contact form's
`Send message`.

**Four nav items plus one button. That is the header.**

`Services` (dropdown → the five service pages) · `About` · `FAQ` · `Contact`,
then the `Book a visit` button. Nothing else goes in the header.

## Editing

The header and footer are hand-written markup repeated in all ten pages — there
is no templating and no includes, which is the price of having no build step.
**A change to the header or footer must be applied to all ten pages.**

Mark the current page with `aria-current="page"` on its nav link; the stylesheet
gives it a rose underline.

### Swapping a photo

1. Drop the new JPEG in `assets/photos/`. Keep it around 1500px on the long
   edge and re-save at ~80% quality.
2. Point the `src` at it and update the `width`/`height` attributes to match the
   aspect ratio the slot displays — **not** the file's own pixel dimensions.
   The images are cropped with `object-fit: cover`, so the attributes exist to
   reserve the right box and prevent layout shift:
   - hero → `4:5` (`width="1200" height="1500"`)
   - Chelsey portrait → `4:5` (`width="1200" height="1500"`)
   - mobile infusions → `16:10` (`width="1600" height="1000"`)
   - closing section → `3:2` (`width="1500" height="1000"`)
3. Keep the `alt` text descriptive, and keep `loading="lazy"` on everything
   except the hero image.

Because `/assets/*` is cached for a year as `immutable`, **give a replacement
photo a new filename** rather than overwriting an existing one.

### Photos in use

All six photo slots are filled. `chelsey-portrait.jpg` is her supplied photo,
EXIF-rotated upright and cropped to 4:5 from the bottom so her face sits in the
upper third. `bathroom.jpg` and `exterior.jpg` ship in the repo but are not
currently placed on any page.

## Analytics

GA4 `G-FF3M0Z7FTY` loads in the head of every page. `js/site.js` fires a
`phone_call_click` event on any `tel:` link.
