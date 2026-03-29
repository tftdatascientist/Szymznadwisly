# Szym znad Wisły — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page Astro portfolio for wood carver Szymon from Nowa Wieś, featuring a video hero, masonry gallery with lightbox, contact form, and folk-modern visual contrast.

**Architecture:** Astro static site with Content Collections for gallery items. Single `index.astro` page composed of Astro components (Hero, Gallery, Quote, Location, Contact, Footer). Vanilla CSS with custom properties for dual palette system. Vanilla JS for lightbox and video hover interactions.

**Tech Stack:** Astro 5, vanilla CSS (custom properties), vanilla JS, Formspree (contact form), system fonts (system-ui + Georgia)

---

## File Structure

```
src/
  layouts/
    Layout.astro              # HTML shell, meta tags, CSS custom properties
  components/
    FolkOrnament.astro        # Reusable SVG ornament (size/variant props)
    Hero.astro                # Hero section with video background
    Gallery.astro             # Masonry gallery grid
    GalleryItem.astro         # Single gallery item (photo or video)
    Lightbox.astro            # Fullscreen lightbox overlay + JS
    Quote.astro               # Quote/motto section
    Location.astro            # Location section with map
    ContactForm.astro         # Contact form + Instagram link
    Footer.astro              # Footer with ornament
    DiagonalDivider.astro     # Diagonal section transition
  content/
    gallery/                  # Content collection: one .md per sculpture
      placeholder-1.md
      placeholder-2.md
      placeholder-3.md
      placeholder-4.md
      placeholder-5.md
      placeholder-6.md
    config.ts                 # Content collection schema
  pages/
    index.astro               # Single page composing all sections
  styles/
    global.css                # CSS custom properties, reset, base typography
    hero.css                  # Hero section styles
    gallery.css               # Masonry + gallery item styles
    lightbox.css              # Lightbox overlay styles
    sections.css              # Quote, Location, Contact, Footer styles
public/
  gallery/                    # Placeholder images (will be replaced)
    placeholder-1.jpg
    placeholder-2.jpg
    placeholder-3.jpg
    placeholder-4.jpg
    placeholder-5.jpg
    placeholder-6.jpg
  video/
    hero-placeholder.mp4      # Placeholder or omitted until real video available
  favicon.svg                 # Simple folk-inspired favicon
.env.example                  # PUBLIC_FORMSPREE_ID=your_id_here
```

---

### Task 1: Astro Project Scaffolding

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `src/layouts/Layout.astro`, `src/styles/global.css`, `.env.example`, `.gitignore`

- [ ] **Step 1: Initialize Astro project**

Run:
```bash
cd "C:/Users/Sławek/Documents/!Projekty/Szymznadwisly"
npm create astro@latest . -- --template minimal --no-install --no-git
```
Expected: Astro files scaffolded in current directory.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install
```
Expected: `node_modules/` created, `package-lock.json` generated.

- [ ] **Step 3: Create `.env.example`**

```
PUBLIC_FORMSPREE_ID=your_formspree_id_here
```

- [ ] **Step 4: Update `.gitignore`**

Add to existing or created `.gitignore`:
```
node_modules/
dist/
.env
.astro/
.superpowers/
```

- [ ] **Step 5: Create `src/styles/global.css` with CSS custom properties and reset**

```css
/* === RESET === */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

img, video {
  display: block;
  max-width: 100%;
}

/* === PALETTE === */
:root {
  /* Palette A — dark */
  --dark: #1a1a1a;
  --cream-on-dark: #f5f0e8;
  --gold: #c8a96e;
  --red: #e63946;
  --green-dark: #2d6a4f;

  /* Palette B — light */
  --cream: #faf8f4;
  --text-dark: #2c2c2c;
  --brown: #8b6f47;
  --brown-light: #d4a373;
  --green-light: #606c38;

  /* Shared */
  --text-muted: #8b8b8b;
  --font-serif: Georgia, 'Times New Roman', serif;
  --font-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;
}
```

- [ ] **Step 6: Create `src/layouts/Layout.astro`**

```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>{title}</title>
</head>
<body>
  <slot />
</body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

- [ ] **Step 7: Create minimal `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Szym znad Wisły — Snycerstwo artystyczne" description="Portfolio snycerza Szymona z Nowej Wsi koło Grudziądza. Rzeźba w drewnie z serca Kujaw.">
  <main>
    <h1>Szym znad Wisły</h1>
    <p>Strona w budowie...</p>
  </main>
</Layout>
```

- [ ] **Step 8: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#1a1a1a"/>
  <path d="M6,16 Q16,4 26,16 Q16,28 6,16Z" fill="none" stroke="#c8a96e" stroke-width="1.5"/>
  <path d="M16,6 Q28,16 16,26 Q4,16 16,6Z" fill="none" stroke="#e63946" stroke-width="1.5"/>
</svg>
```

- [ ] **Step 9: Verify dev server starts**

Run:
```bash
npx astro dev
```
Expected: Server running at `http://localhost:4321`, page shows "Szym znad Wisły" heading.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore .env.example src/ public/favicon.svg
git commit -m "feat: scaffold Astro project with global styles and dual palette"
```

---

### Task 2: Folk Ornament Component + Diagonal Divider

**Files:**
- Create: `src/components/FolkOrnament.astro`, `src/components/DiagonalDivider.astro`

- [ ] **Step 1: Create `src/components/FolkOrnament.astro`**

```astro
---
interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const { size = 'md' } = Astro.props;

const dimensions = {
  sm: { width: 40, height: 20, r1: 2, r2: 1.5 },
  md: { width: 80, height: 40, r1: 4, r2: 2 },
  lg: { width: 120, height: 60, r1: 6, r2: 3 },
};

const d = dimensions[size];
const midX = d.width / 2;
const midY = d.height / 2;
const qx1 = d.width * 0.25;
const qx2 = d.width * 0.75;
---

<svg
  class="folk-ornament"
  width={d.width}
  height={d.height}
  viewBox={`0 0 ${d.width} ${d.height}`}
  aria-hidden="true"
>
  <path
    d={`M0,${midY} Q${qx1},0 ${midX},${midY} Q${qx2},${d.height} ${d.width},${midY}`}
    stroke="var(--red)"
    fill="none"
    stroke-width="1.5"
  />
  <path
    d={`M0,${midY} Q${qx1},${d.height} ${midX},${midY} Q${qx2},0 ${d.width},${midY}`}
    stroke="var(--gold)"
    fill="none"
    stroke-width="1.5"
  />
  <circle cx={midX} cy={midY} r={d.r1} fill="var(--red)" />
  <circle cx={qx1 * 0.6} cy={midY} r={d.r2} fill="var(--gold)" />
  <circle cx={d.width - qx1 * 0.6} cy={midY} r={d.r2} fill="var(--gold)" />
</svg>
```

- [ ] **Step 2: Create `src/components/DiagonalDivider.astro`**

```astro
---
interface Props {
  from: 'dark' | 'light';
  to: 'dark' | 'light';
}

const { from, to } = Astro.props;

const colorMap = {
  dark: 'var(--dark)',
  light: 'var(--cream)',
};
---

<div
  class="diagonal-divider"
  style={`background: linear-gradient(172deg, ${colorMap[from]} 48%, ${colorMap[to]} 48%);`}
/>

<style>
  .diagonal-divider {
    height: 80px;
    width: 100%;
  }
</style>
```

- [ ] **Step 3: Verify components render in index.astro**

Temporarily add to `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import FolkOrnament from '../components/FolkOrnament.astro';
import DiagonalDivider from '../components/DiagonalDivider.astro';
---

<Layout title="Szym znad Wisły — Snycerstwo artystyczne" description="Portfolio snycerza Szymona z Nowej Wsi koło Grudziądza.">
  <main>
    <div style="background: var(--dark); padding: 40px; text-align: center;">
      <FolkOrnament size="sm" />
      <FolkOrnament size="md" />
      <FolkOrnament size="lg" />
    </div>
    <DiagonalDivider from="dark" to="light" />
    <div style="background: var(--cream); padding: 40px; text-align: center;">
      <p style="color: var(--text-dark);">Light section</p>
    </div>
    <DiagonalDivider from="light" to="dark" />
    <div style="background: var(--dark); padding: 40px; text-align: center;">
      <p style="color: var(--cream-on-dark);">Dark section</p>
    </div>
  </main>
</Layout>
```

Run: `npx astro dev` and check `http://localhost:4321`
Expected: Three ornament sizes visible on dark background, diagonal transitions between dark and light sections.

- [ ] **Step 4: Commit**

```bash
git add src/components/FolkOrnament.astro src/components/DiagonalDivider.astro src/pages/index.astro
git commit -m "feat: add FolkOrnament and DiagonalDivider components"
```

---

### Task 3: Hero Section

**Files:**
- Create: `src/components/Hero.astro`, `src/styles/hero.css`

- [ ] **Step 1: Create `src/styles/hero.css`**

```css
.hero {
  height: 100vh;
  background: var(--dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero__video-bg {
  position: absolute;
  inset: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.25;
}

.hero__fallback-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #3d2b1f 0%, #5c3a21 30%, #3d2b1f 60%, #2d1b0e 100%);
  opacity: 0.25;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, var(--dark) 100%);
}

.hero__content {
  position: relative;
  z-index: 1;
}

.hero__label {
  color: var(--gold);
  font-size: 11px;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.hero__title {
  font-size: clamp(48px, 10vw, 80px);
  font-weight: 900;
  letter-spacing: -4px;
  line-height: 0.9;
  color: var(--cream-on-dark);
}

.hero__subtitle {
  font-size: clamp(16px, 3vw, 22px);
  letter-spacing: 10px;
  font-family: var(--font-serif);
  color: var(--text-muted);
  margin-top: 4px;
}

.hero__divider {
  width: 60px;
  height: 1px;
  background: var(--gold);
  margin: 20px auto;
}

.hero__quote {
  color: var(--gold);
  font-size: clamp(13px, 2vw, 15px);
  font-family: var(--font-serif);
  font-style: italic;
  max-width: 320px;
  margin: 0 auto 24px;
}

.hero__cta {
  display: inline-block;
  border: 1px solid var(--gold);
  color: var(--gold);
  padding: 10px 28px;
  font-size: 11px;
  letter-spacing: 3px;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 0.3s, color 0.3s;
}

.hero__cta:hover {
  background: var(--gold);
  color: var(--dark);
}

.hero__ornament-bottom {
  position: absolute;
  bottom: 30px;
  z-index: 1;
}
```

- [ ] **Step 2: Create `src/components/Hero.astro`**

```astro
---
import FolkOrnament from './FolkOrnament.astro';
---

<section class="hero" id="hero">
  <!-- Video background — replace src when real video available -->
  <video
    class="hero__video-bg"
    autoplay
    loop
    muted
    playsinline
    poster=""
    aria-hidden="true"
  >
    <!-- <source src="/video/hero.mp4" type="video/mp4" /> -->
  </video>
  <div class="hero__fallback-bg" aria-hidden="true"></div>
  <div class="hero__overlay" aria-hidden="true"></div>

  <div class="hero__content">
    <FolkOrnament size="md" />
    <p class="hero__label">Snycerstwo artystyczne</p>
    <h1 class="hero__title">SZYM</h1>
    <p class="hero__subtitle">znad Wisły</p>
    <div class="hero__divider"></div>
    <p class="hero__quote">
      „Każde drewno ma swoją historię — ja ją tylko odkrywam"
    </p>
    <a href="#galeria" class="hero__cta">Zobacz prace ↓</a>
  </div>

  <div class="hero__ornament-bottom">
    <FolkOrnament size="sm" />
  </div>
</section>

<style>
  @import '../styles/hero.css';
</style>
```

- [ ] **Step 3: Update `index.astro` to use Hero**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
---

<Layout title="Szym znad Wisły — Snycerstwo artystyczne" description="Portfolio snycerza Szymona z Nowej Wsi koło Grudziądza. Rzeźba w drewnie z serca Kujaw.">
  <Hero />
</Layout>
```

- [ ] **Step 4: Verify in browser**

Run: `npx astro dev` and check `http://localhost:4321`
Expected: Full-screen hero with dark wood-toned background, centered "SZYM" title, folk ornaments top and bottom, gold CTA button.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/styles/hero.css src/pages/index.astro
git commit -m "feat: add Hero section with video bg support and folk ornaments"
```

---

### Task 4: Gallery Content Collection + Placeholder Data

**Files:**
- Create: `src/content.config.ts`, `src/content/gallery/placeholder-1.md` through `placeholder-6.md`, `public/gallery/placeholder-1.jpg` through `public/gallery/placeholder-6.jpg`

- [ ] **Step 1: Create `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    material: z.string(),
    year: z.number(),
    type: z.enum(['photo', 'video']),
    videoSrc: z.string().optional(),
    duration: z.string().optional(),
    dimensions: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { gallery };
```

- [ ] **Step 2: Create 6 placeholder gallery entries**

`src/content/gallery/placeholder-1.md`:
```markdown
---
title: "Madonna z Dzieciątkiem"
image: "/gallery/placeholder-1.jpg"
material: "Lipa"
year: 2024
type: photo
dimensions: "45cm"
order: 1
---
```

`src/content/gallery/placeholder-2.md`:
```markdown
---
title: "Orzeł"
image: "/gallery/placeholder-2.jpg"
material: "Dąb"
year: 2024
type: photo
dimensions: "60cm"
order: 2
---
```

`src/content/gallery/placeholder-3.md`:
```markdown
---
title: "Rzeźbienie orła — proces"
image: "/gallery/placeholder-3.jpg"
material: "Dąb"
year: 2024
type: video
videoSrc: "/gallery/placeholder-3.mp4"
duration: "1:24"
order: 3
---
```

`src/content/gallery/placeholder-4.md`:
```markdown
---
title: "Krzyż przydrożny"
image: "/gallery/placeholder-4.jpg"
material: "Dąb"
year: 2023
type: photo
dimensions: "180cm"
order: 4
---
```

`src/content/gallery/placeholder-5.md`:
```markdown
---
title: "Relief — kwiaty polne"
image: "/gallery/placeholder-5.jpg"
material: "Lipa"
year: 2024
type: photo
dimensions: "30×40cm"
order: 5
---
```

`src/content/gallery/placeholder-6.md`:
```markdown
---
title: "W warsztacie"
image: "/gallery/placeholder-6.jpg"
material: ""
year: 2024
type: video
videoSrc: "/gallery/placeholder-6.mp4"
duration: "2:05"
order: 6
---
```

- [ ] **Step 3: Generate placeholder images**

Create simple SVG-based placeholder images (one per item). Each is a 600×800 (portrait) or 800×600 (landscape) SVG saved as `.jpg` won't work — use actual placeholder JPGs. Instead, create a script:

```bash
mkdir -p public/gallery
```

For each placeholder, create a simple colored JPG using a one-liner Node script:

```bash
node -e "
const fs = require('fs');
const colors = ['#5c3a21','#4a3728','#3d2b1f','#2d1b0e','#6b4c33','#5a3e2b'];
const heights = [400, 300, 250, 500, 350, 280];
for (let i = 0; i < 6; i++) {
  const h = heights[i];
  const svg = \`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='\${h}'>
    <rect width='600' height='\${h}' fill='\${colors[i]}'/>
    <text x='300' y='\${h/2}' fill='#c8a96e' font-family='Georgia' font-size='16' text-anchor='middle' opacity='0.5'>Placeholder \${i+1}</text>
  </svg>\`;
  fs.writeFileSync(\`public/gallery/placeholder-\${i+1}.svg\`, svg);
}
"
```

Then update the `.md` files to reference `.svg` instead of `.jpg`. (Real images will replace these later.)

- [ ] **Step 4: Verify content collection loads**

Run: `npx astro dev`
Expected: No content collection errors in console.

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/content/gallery/ public/gallery/
git commit -m "feat: add gallery content collection with 6 placeholder entries"
```

---

### Task 5: Gallery Component (Masonry)

**Files:**
- Create: `src/components/Gallery.astro`, `src/components/GalleryItem.astro`, `src/styles/gallery.css`

- [ ] **Step 1: Create `src/styles/gallery.css`**

```css
.gallery {
  background: var(--dark);
  padding: 80px 24px;
}

.gallery__header {
  text-align: center;
  margin-bottom: 48px;
}

.gallery__label {
  color: var(--gold);
  font-size: 10px;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.gallery__title {
  font-size: clamp(28px, 5vw, 36px);
  font-weight: 900;
  letter-spacing: -2px;
  color: var(--cream-on-dark);
}

.masonry {
  columns: 3;
  column-gap: 12px;
  max-width: 1100px;
  margin: 0 auto;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 12px;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.masonry-item img,
.masonry-item video {
  width: 100%;
  display: block;
  transition: transform 0.4s ease;
}

.masonry-item:hover img,
.masonry-item:hover video {
  transform: scale(1.03);
}

.masonry-item__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 14px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.masonry-item:hover .masonry-item__overlay {
  opacity: 1;
}

.masonry-item__title {
  color: var(--cream-on-dark);
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2px;
}

.masonry-item__meta {
  color: var(--gold);
  font-size: 10px;
  letter-spacing: 1px;
}

.masonry-item__video-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--red);
  color: white;
  font-size: 8px;
  padding: 3px 7px;
  border-radius: 2px;
  letter-spacing: 1px;
  z-index: 1;
}

/* Responsive */
@media (max-width: 900px) {
  .masonry {
    columns: 2;
  }
}

@media (max-width: 550px) {
  .masonry {
    columns: 1;
  }

  .gallery {
    padding: 60px 16px;
  }
}
```

- [ ] **Step 2: Create `src/components/GalleryItem.astro`**

```astro
---
interface Props {
  title: string;
  image: string;
  material: string;
  year: number;
  type: 'photo' | 'video';
  videoSrc?: string;
  duration?: string;
  dimensions?: string;
  index: number;
}

const { title, image, material, year, type, videoSrc, duration, dimensions, index } = Astro.props;

const metaParts = [material, year.toString(), dimensions].filter(Boolean);
const metaText = metaParts.join(' · ');
---

<div
  class="masonry-item"
  data-index={index}
  data-type={type}
  data-src={type === 'video' ? videoSrc : image}
  data-title={title}
  role="button"
  tabindex="0"
  aria-label={`${title} — ${metaText}`}
>
  {type === 'video' && <span class="masonry-item__video-badge">▶ WIDEO</span>}
  <img src={image} alt={title} loading="lazy" />
  <div class="masonry-item__overlay">
    <h3 class="masonry-item__title">{title}</h3>
    <p class="masonry-item__meta">
      {metaText}
      {type === 'video' && duration && ` · ${duration}`}
    </p>
  </div>
</div>
```

- [ ] **Step 3: Create `src/components/Gallery.astro`**

```astro
---
import { getCollection } from 'astro:content';
import GalleryItem from './GalleryItem.astro';

const galleryItems = (await getCollection('gallery')).sort(
  (a, b) => a.data.order - b.data.order
);
---

<section class="gallery" id="galeria">
  <div class="gallery__header">
    <p class="gallery__label">Prace</p>
    <h2 class="gallery__title">Galeria rzeźb</h2>
  </div>
  <div class="masonry">
    {galleryItems.map((item, index) => (
      <GalleryItem
        title={item.data.title}
        image={item.data.image}
        material={item.data.material}
        year={item.data.year}
        type={item.data.type}
        videoSrc={item.data.videoSrc}
        duration={item.data.duration}
        dimensions={item.data.dimensions}
        index={index}
      />
    ))}
  </div>
</section>

<style>
  @import '../styles/gallery.css';
</style>
```

- [ ] **Step 4: Add Gallery to index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import DiagonalDivider from '../components/DiagonalDivider.astro';
import Gallery from '../components/Gallery.astro';
---

<Layout title="Szym znad Wisły — Snycerstwo artystyczne" description="Portfolio snycerza Szymona z Nowej Wsi koło Grudziądza. Rzeźba w drewnie z serca Kujaw.">
  <Hero />
  <Gallery />
</Layout>
```

- [ ] **Step 5: Verify in browser**

Run: `npx astro dev` and check `http://localhost:4321`
Expected: Hero followed by masonry gallery with 6 placeholder items. Hover reveals overlay with title and meta. Video items show ▶ badge.

- [ ] **Step 6: Commit**

```bash
git add src/components/Gallery.astro src/components/GalleryItem.astro src/styles/gallery.css src/pages/index.astro
git commit -m "feat: add masonry Gallery with GalleryItem component"
```

---

### Task 6: Lightbox

**Files:**
- Create: `src/components/Lightbox.astro`, `src/styles/lightbox.css`

- [ ] **Step 1: Create `src/styles/lightbox.css`**

```css
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.lightbox--open {
  display: flex;
  opacity: 1;
}

.lightbox__content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox__content img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
}

.lightbox__content video {
  max-width: 90vw;
  max-height: 85vh;
}

.lightbox__close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1001;
  background: none;
  border: none;
  color: var(--cream-on-dark);
  font-size: 32px;
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--cream-on-dark);
  font-size: 36px;
  cursor: pointer;
  padding: 16px;
  z-index: 1001;
}

.lightbox__nav--prev {
  left: 8px;
}

.lightbox__nav--next {
  right: 8px;
}

.lightbox__caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 12px;
  color: var(--cream-on-dark);
  font-size: 14px;
}

.lightbox__caption span {
  color: var(--gold);
  font-size: 11px;
}
```

- [ ] **Step 2: Create `src/components/Lightbox.astro`**

```astro
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Powiększenie zdjęcia">
  <button class="lightbox__close" aria-label="Zamknij">×</button>
  <button class="lightbox__nav lightbox__nav--prev" aria-label="Poprzednie">‹</button>
  <button class="lightbox__nav lightbox__nav--next" aria-label="Następne">›</button>
  <div class="lightbox__content" id="lightbox-content"></div>
  <div class="lightbox__caption" id="lightbox-caption"></div>
</div>

<style>
  @import '../styles/lightbox.css';
</style>

<script>
  const lightbox = document.getElementById('lightbox')!;
  const content = document.getElementById('lightbox-content')!;
  const caption = document.getElementById('lightbox-caption')!;
  const items = document.querySelectorAll('.masonry-item');
  let currentIndex = 0;

  function openLightbox(index: number) {
    currentIndex = index;
    renderItem();
    lightbox.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    document.body.style.overflow = '';
    // Stop any playing video
    const video = content.querySelector('video');
    if (video) video.pause();
  }

  function renderItem() {
    const item = items[currentIndex] as HTMLElement;
    const type = item.dataset.type;
    const src = item.dataset.src!;
    const title = item.dataset.title!;

    if (type === 'video') {
      content.innerHTML = `<video src="${src}" controls autoplay style="max-width:90vw;max-height:85vh;"></video>`;
    } else {
      content.innerHTML = `<img src="${src}" alt="${title}" />`;
    }
    caption.innerHTML = `<strong>${title}</strong>`;
  }

  function navigate(direction: number) {
    const video = content.querySelector('video');
    if (video) video.pause();
    currentIndex = (currentIndex + direction + items.length) % items.length;
    renderItem();
  }

  // Event listeners
  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') openLightbox(index);
    });
  });

  lightbox.querySelector('.lightbox__close')!.addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox__nav--prev')!.addEventListener('click', () => navigate(-1));
  lightbox.querySelector('.lightbox__nav--next')!.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  lightbox.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? -1 : 1);
    }
  });
</script>
```

- [ ] **Step 3: Add Lightbox to index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Gallery from '../components/Gallery.astro';
import Lightbox from '../components/Lightbox.astro';
---

<Layout title="Szym znad Wisły — Snycerstwo artystyczne" description="Portfolio snycerza Szymona z Nowej Wsi koło Grudziądza. Rzeźba w drewnie z serca Kujaw.">
  <Hero />
  <Gallery />
  <Lightbox />
</Layout>
```

- [ ] **Step 4: Verify lightbox works**

Run: `npx astro dev`
Expected: Clicking a gallery item opens fullscreen lightbox. Arrow keys navigate. ESC closes. Swipe works on mobile simulation.

- [ ] **Step 5: Commit**

```bash
git add src/components/Lightbox.astro src/styles/lightbox.css src/pages/index.astro
git commit -m "feat: add vanilla JS lightbox with keyboard nav and swipe"
```

---

### Task 7: Quote, Location, Contact, Footer Sections

**Files:**
- Create: `src/components/Quote.astro`, `src/components/Location.astro`, `src/components/ContactForm.astro`, `src/components/Footer.astro`, `src/styles/sections.css`

- [ ] **Step 1: Create `src/styles/sections.css`**

```css
/* === QUOTE === */
.quote-section {
  background: var(--cream);
  padding: 100px 24px;
  text-align: center;
}

.quote-section blockquote {
  font-size: clamp(22px, 4vw, 32px);
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-dark);
  max-width: 600px;
  margin: 16px auto;
  line-height: 1.4;
}

.quote-section .quote-author {
  color: var(--brown);
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-top: 16px;
}

/* === LOCATION === */
.location {
  background: var(--dark);
  padding: 80px 24px;
}

.location__header {
  text-align: center;
  margin-bottom: 48px;
}

.location__label {
  color: var(--gold);
  font-size: 10px;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.location__title {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 900;
  letter-spacing: -2px;
  color: var(--cream-on-dark);
}

.location__content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  align-items: center;
}

.location__text {
  flex: 1;
}

.location__text p {
  font-family: var(--font-serif);
  font-size: 15px;
  line-height: 1.7;
  color: #aaa;
  margin-bottom: 14px;
}

.location__text .highlight {
  color: var(--gold);
  font-weight: 600;
}

.location__map {
  flex: 1;
  height: 300px;
  border-radius: 4px;
  overflow: hidden;
}

.location__map iframe {
  width: 100%;
  height: 100%;
  border: 0;
  filter: grayscale(0.8) contrast(1.1);
}

/* === CONTACT === */
.contact {
  background: var(--cream);
  padding: 80px 24px;
}

.contact__header {
  text-align: center;
  margin-bottom: 48px;
}

.contact__label {
  color: var(--brown);
  font-size: 10px;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.contact__title {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 900;
  letter-spacing: -2px;
  color: var(--text-dark);
}

.contact__content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
}

.contact__form {
  flex: 1.2;
}

.contact__form input,
.contact__form textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d4cfc5;
  background: white;
  font-family: var(--font-sans);
  font-size: 13px;
  margin-bottom: 12px;
  border-radius: 2px;
  color: var(--text-dark);
}

.contact__form textarea {
  height: 120px;
  resize: vertical;
}

.contact__form button {
  background: var(--green-dark);
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 2px;
  font-family: var(--font-sans);
  transition: background 0.3s;
}

.contact__form button:hover {
  background: #245a42;
}

.contact__form .form-message {
  margin-top: 12px;
  font-size: 13px;
  display: none;
}

.contact__form .form-message--success {
  color: var(--green-dark);
  display: block;
}

.contact__form .form-message--error {
  color: var(--red);
  display: block;
}

.contact__side {
  flex: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.contact__ig-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-dark);
  text-decoration: none;
  font-size: 14px;
}

.contact__ig-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.contact__note {
  font-family: var(--font-serif);
  font-size: 13px;
  color: #888;
  font-style: italic;
  line-height: 1.5;
}

/* === FOOTER === */
.footer {
  background: var(--dark);
  padding: 30px 24px;
  text-align: center;
}

.footer p {
  color: var(--text-muted);
  font-size: 11px;
  letter-spacing: 1px;
  margin-top: 12px;
}

/* === RESPONSIVE — stacked on mobile === */
@media (max-width: 700px) {
  .location__content,
  .contact__content {
    flex-direction: column;
  }

  .location__map {
    height: 250px;
  }

  .quote-section {
    padding: 60px 24px;
  }
}
```

- [ ] **Step 2: Create `src/components/Quote.astro`**

```astro
---
import FolkOrnament from './FolkOrnament.astro';
---

<section class="quote-section">
  <FolkOrnament size="md" />
  <blockquote>
    „Nie rzeźbię drewna — rozmawiam z nim. Czasem mówi mi co chce zostać."
  </blockquote>
  <p class="quote-author">— Szymon</p>
</section>

<style>
  @import '../styles/sections.css';
</style>
```

- [ ] **Step 3: Create `src/components/Location.astro`**

```astro
---
import FolkOrnament from './FolkOrnament.astro';
---

<section class="location" id="miejsce">
  <div class="location__header">
    <p class="location__label">Miejsce</p>
    <h2 class="location__title">Nowa Wieś nad Wisłą</h2>
  </div>
  <div class="location__content">
    <div class="location__text">
      <p>
        Na skarpie wiślanej, skąd wzrok sięga po
        <span class="highlight">dolinę Wisły</span> aż po horyzont,
        w cieniu starych lip stoi warsztat. Tu, w
        <span class="highlight">Nowej Wsi koło Grudziądza</span>,
        drewno zamienia się w sztukę.
      </p>
      <p>
        Każda rzeźba nosi w sobie krajobraz tego miejsca — spokój rzeki,
        siłę skarpy, ciepło wiejskiego podwórka.
      </p>
    </div>
    <div class="location__map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9600!2d18.73!3d53.48!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4703100b43959c9b%3A0x400f2bf6e2e6e70!2sNowa%20Wie%C5%9B!5e0!3m2!1spl!2spl!4v1"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Mapa — Nowa Wieś koło Grudziądza"
      ></iframe>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create `src/components/ContactForm.astro`**

```astro
<section class="contact" id="kontakt">
  <div class="contact__header">
    <p class="contact__label">Kontakt</p>
    <h2 class="contact__title">Napisz do Szymona</h2>
  </div>
  <div class="contact__content">
    <form class="contact__form" id="contact-form" action="" method="POST">
      <input type="text" name="name" placeholder="Imię" required />
      <input type="email" name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Wiadomość..." required></textarea>
      <button type="submit">Wyślij wiadomość</button>
      <p class="form-message" id="form-message"></p>
    </form>
    <div class="contact__side">
      <a href="https://www.instagram.com/szymznadwisly/" target="_blank" rel="noopener" class="contact__ig-link">
        <div class="contact__ig-icon">IG</div>
        <div>
          <div style="font-weight:600;">@szymznadwisly</div>
          <div style="font-size:11px;color:#888;">Instagram</div>
        </div>
      </a>
      <p class="contact__note">
        Zainteresowany rzeźbą? Napisz — Szymon chętnie porozmawia
        o swoich pracach i możliwościach zamówienia.
      </p>
    </div>
  </div>
</section>

<script>
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const msg = document.getElementById('form-message')!;
  const formspreeId = import.meta.env.PUBLIC_FORMSPREE_ID;

  if (formspreeId) {
    form.action = `https://formspree.io/f/${formspreeId}`;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.className = 'form-message';
    msg.style.display = 'none';

    if (!formspreeId) {
      msg.textContent = 'Formularz nie jest jeszcze skonfigurowany.';
      msg.className = 'form-message form-message--error';
      msg.style.display = 'block';
      return;
    }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        msg.textContent = 'Wiadomość wysłana! Szymon odpisze wkrótce.';
        msg.className = 'form-message form-message--success';
        msg.style.display = 'block';
        form.reset();
      } else {
        throw new Error('Failed');
      }
    } catch {
      msg.textContent = 'Coś poszło nie tak. Spróbuj ponownie lub napisz na Instagramie.';
      msg.className = 'form-message form-message--error';
      msg.style.display = 'block';
    }
  });
</script>

<style>
  @import '../styles/sections.css';
</style>
```

- [ ] **Step 5: Create `src/components/Footer.astro`**

```astro
---
import FolkOrnament from './FolkOrnament.astro';
---

<footer class="footer">
  <FolkOrnament size="sm" />
  <p>Szym znad Wisły · Nowa Wieś · {new Date().getFullYear()}</p>
</footer>

<style>
  @import '../styles/sections.css';
</style>
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Quote.astro src/components/Location.astro src/components/ContactForm.astro src/components/Footer.astro src/styles/sections.css
git commit -m "feat: add Quote, Location, ContactForm, and Footer sections"
```

---

### Task 8: Assemble Full Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Update `src/pages/index.astro` to compose all sections**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Gallery from '../components/Gallery.astro';
import Lightbox from '../components/Lightbox.astro';
import DiagonalDivider from '../components/DiagonalDivider.astro';
import Quote from '../components/Quote.astro';
import Location from '../components/Location.astro';
import ContactForm from '../components/ContactForm.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="Szym znad Wisły — Snycerstwo artystyczne" description="Portfolio snycerza Szymona z Nowej Wsi koło Grudziądza. Rzeźba w drewnie z serca Kujaw.">
  <Hero />
  <Gallery />
  <DiagonalDivider from="dark" to="light" />
  <Quote />
  <DiagonalDivider from="light" to="dark" />
  <Location />
  <DiagonalDivider from="dark" to="light" />
  <ContactForm />
  <Footer />
  <Lightbox />
</Layout>
```

- [ ] **Step 2: Verify full page in browser**

Run: `npx astro dev` and scroll through `http://localhost:4321`
Expected: All 6 sections visible with diagonal transitions between them. Hero → Gallery (dark) → diagonal → Quote (light) → diagonal → Location (dark) → diagonal → Contact (light) → Footer (dark). Lightbox works from gallery. Form shows error about unconfigured Formspree (expected).

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble full single-page layout with all sections"
```

---

### Task 9: Video Hover Autoplay in Gallery

**Files:**
- Modify: `src/components/GalleryItem.astro`

- [ ] **Step 1: Update `src/components/GalleryItem.astro` to support video hover**

Replace the existing content of `src/components/GalleryItem.astro`:

```astro
---
interface Props {
  title: string;
  image: string;
  material: string;
  year: number;
  type: 'photo' | 'video';
  videoSrc?: string;
  duration?: string;
  dimensions?: string;
  index: number;
}

const { title, image, material, year, type, videoSrc, duration, dimensions, index } = Astro.props;

const metaParts = [material, year.toString(), dimensions].filter(Boolean);
const metaText = metaParts.join(' · ');
---

<div
  class="masonry-item"
  data-index={index}
  data-type={type}
  data-src={type === 'video' ? videoSrc : image}
  data-title={title}
  role="button"
  tabindex="0"
  aria-label={`${title} — ${metaText}`}
>
  {type === 'video' && <span class="masonry-item__video-badge">▶ WIDEO</span>}
  <img src={image} alt={title} loading="lazy" />
  {type === 'video' && videoSrc && (
    <video
      class="masonry-item__video-preview"
      src={videoSrc}
      muted
      loop
      playsinline
      preload="none"
      aria-hidden="true"
    />
  )}
  <div class="masonry-item__overlay">
    <h3 class="masonry-item__title">{title}</h3>
    <p class="masonry-item__meta">
      {metaText}
      {type === 'video' && duration && ` · ${duration}`}
    </p>
  </div>
</div>

<script>
  document.querySelectorAll('.masonry-item[data-type="video"]').forEach((item) => {
    const video = item.querySelector('.masonry-item__video-preview') as HTMLVideoElement | null;
    const img = item.querySelector('img') as HTMLImageElement | null;
    if (!video || !img) return;

    item.addEventListener('mouseenter', () => {
      video.style.display = 'block';
      img.style.display = 'none';
      video.play().catch(() => {});
    });

    item.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      video.style.display = 'none';
      img.style.display = 'block';
    });
  });
</script>
```

- [ ] **Step 2: Add video preview styles to `src/styles/gallery.css`**

Append to end of `src/styles/gallery.css`:

```css
.masonry-item__video-preview {
  display: none;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

- [ ] **Step 3: Verify hover autoplay works**

Run: `npx astro dev`
Expected: Hovering over a video gallery item hides the thumbnail and plays the video silently. Mouse leave pauses and shows thumbnail again. (With placeholders, video won't load — that's OK. No errors in console.)

- [ ] **Step 4: Commit**

```bash
git add src/components/GalleryItem.astro src/styles/gallery.css
git commit -m "feat: add video hover autoplay in gallery items"
```

---

### Task 10: Production Build + Final Verification

**Files:**
- No new files — verification task

- [ ] **Step 1: Run production build**

```bash
npx astro build
```

Expected: Build completes without errors. Output in `dist/`.

- [ ] **Step 2: Preview production build**

```bash
npx astro preview
```

Expected: Site loads at `http://localhost:4321`. All sections render correctly. Lightbox works. Form shows unconfigured message. No console errors.

- [ ] **Step 3: Check responsive layouts**

Open DevTools → toggle device toolbar. Check:
- **Mobile (375px):** single column masonry, stacked contact/location, hero text readable
- **Tablet (768px):** 2-column masonry, sections still look good
- **Desktop (1200px):** 3-column masonry, side-by-side layouts

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: responsive layout adjustments"
```
(Skip if no fixes needed.)

- [ ] **Step 5: Final commit — mark project as ready for content**

```bash
git add -A
git commit -m "chore: production build verified, ready for real content"
```
