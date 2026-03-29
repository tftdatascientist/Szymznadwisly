# Szym znad Wisły — Portfolio Snycerza

Single-page portfolio prezentujące twórczość Szymona — snycerza-samouka z Nowej Wsi koło Grudziądza nad Wisłą.

## Uruchomienie

```bash
npm install
npm run dev        # dev server -> http://localhost:4321
npm run build      # produkcyjny build -> dist/
npm run preview    # podgląd builda
```

## Konfiguracja

Skopiuj `.env.example` do `.env` i uzupełnij:

```
PUBLIC_FORMSPREE_ID=twoje_id_formspree
```

Konto Formspree: https://formspree.io — free tier wystarcza.

## Dodawanie nowej rzeźby

1. Wrzuć zdjęcie (`.webp`/`.jpg`) do `public/gallery/`
2. Utwórz plik `.md` w `src/content/gallery/`:

```markdown
---
title: "Nazwa rzeźby"
image: "/gallery/nazwa-pliku.webp"
material: "Lipa"
year: 2025
type: photo
dimensions: "45cm"
order: 8
---
```

3. `npm run build` i deploy

### Dodawanie wideo

```markdown
---
title: "Proces rzeźbienia"
image: "/gallery/miniatura.webp"
material: "Dąb"
year: 2025
type: video
videoSrc: "/video/nazwa-pliku.mp4"
duration: "1:30"
order: 9
---
```

Wideo wrzuć do `public/video/`, miniaturę do `public/gallery/`.

### Wideo w tle hero

Odkomentuj `<source>` w `src/components/Hero.astro` i wrzuć plik do `public/video/hero.mp4`. Zalecany format: MP4 H.264, max 5MB.

## Struktura projektu

```
src/
  pages/index.astro           # Główna strona (single-page)
  layouts/Layout.astro        # HTML shell, meta tagi, globalne CSS
  components/
    Hero.astro                # Sekcja hero z wideo w tle
    Gallery.astro             # Galeria masonry
    GalleryItem.astro         # Kafelek galerii (zdjęcie/wideo)
    Lightbox.astro            # Powiększenie zdjęcia/wideo (klawiatura, swipe)
    Quote.astro               # Cytat Szymona
    Location.astro            # Lokalizacja + mapa Google
    ContactForm.astro         # Formularz kontaktowy (Formspree)
    Footer.astro              # Stopka
    FolkOrnament.astro        # Ludowy ornament SVG (sm/md/lg)
    DiagonalDivider.astro     # Diagonalne przejście między sekcjami
  content/
    config.ts                 # Schema galerii (Astro Content Collections)
    gallery/                  # Wpisy galerii (jeden .md na rzeźbę)
  styles/
    global.css                # Reset, palety kolorów, typografia
    hero.css                  # Style sekcji hero
    gallery.css               # Masonry grid, hover, responsive
    lightbox.css              # Overlay lightbox
    sections.css              # Quote, Location, Contact, Footer
public/
  gallery/                    # Zdjęcia rzeźb
  video/                      # Filmy
  favicon.svg                 # Favicon
```

## Design

**Kontrast tradycji i nowoczesności** — brutalistyczna typografia sans-serif zderzony z ludowymi ornamentami SVG i ciepłem drewna.

Dwie palety kolorów:
- **Paleta A (ciemna)** — hero, galeria, lokalizacja: `#1a1a1a`, złoto `#c8a96e`, czerwień `#e63946`
- **Paleta B (jasna)** — cytat, kontakt: `#faf8f4`, brąz `#8b6f47`, oliwka `#606c38`

Przejścia między sekcjami: diagonalne cięcia CSS — jak cios dłutem.

## Schema galerii

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `title` | string | tak | Nazwa rzeźby |
| `image` | string | tak | Ścieżka do zdjęcia (`/gallery/...`) |
| `material` | string | tak | Materiał (Lipa, Dąb, Drewno) |
| `year` | number | tak | Rok powstania |
| `type` | `photo` / `video` | tak | Typ wpisu |
| `videoSrc` | string | nie | Ścieżka do wideo (`/video/...`) |
| `duration` | string | nie | Czas trwania wideo |
| `dimensions` | string | nie | Wymiary rzeźby |
| `order` | number | nie | Kolejność w galerii (domyślnie 0) |

## Tech stack

- **Astro 4** — static site generator
- **Vanilla CSS** — custom properties, zero frameworków
- **Vanilla JS** — lightbox, video hover, formularz
- **Formspree** — obsługa formularza kontaktowego
- **System fonts** — system-ui + Georgia, zero zewnętrznych czcionek

## Deploy

Folder `dist/` po `npm run build` jest gotowy do deploy na:
- **Netlify** — przeciągnij `dist/` na https://app.netlify.com/drop
- **Vercel** — `npx vercel --prod`
- **GitHub Pages** — skonfiguruj w repo settings

Pamiętaj o ustawieniu zmiennej środowiskowej `PUBLIC_FORMSPREE_ID` w panelu hostingu.
