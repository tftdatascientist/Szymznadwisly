# CLAUDE.md — Kontekst projektu

## O projekcie

Portfolio snycerza **Szymona** ("Szym znad Wisły") z **Nowej Wsi koło Grudziądza**. Szymon to samouk, który odkrył w sobie talent do rzeźby w drewnie. Strona jest niespodzianką od jego przyjaciela — celem jest promocja twórczości, nie sprzedaż (na razie).

Szymon jest skromną osobą i nie lubi o sobie opowiadać — dlatego nie ma sekcji "O artyście". Jego prace mówią same za siebie.

## Architektura

Single-page Astro 4 site. Żadnych frameworków CSS/JS — vanilla only.

### Sekcje strony (kolejność w index.astro):
1. **Hero** (ciemna) — wideo w tle + typografia + ludowy ornament
2. **Gallery** (ciemna) — masonry CSS columns, zdjęcia + wideo
3. DiagonalDivider dark->light
4. **Quote** (jasna) — cytat Szymona
5. DiagonalDivider light->dark
6. **Location** (ciemna) — Nowa Wieś, mapa Google
7. DiagonalDivider dark->light
8. **ContactForm** (jasna) — Formspree + Instagram
9. **Footer** (ciemna)
10. **Lightbox** — overlay (niewidoczny do kliknięcia)

### Dwie palety kolorów
- **A (ciemna)**: `--dark: #1a1a1a`, `--gold: #c8a96e`, `--red: #e63946`
- **B (jasna)**: `--cream: #faf8f4`, `--brown: #8b6f47`, `--green-light: #606c38`

Zmienne CSS zdefiniowane w `src/styles/global.css`.

### Galeria — Content Collections
Każda rzeźba = plik `.md` w `src/content/gallery/` ze schematem z `src/content/config.ts`. Zdjęcia w `public/gallery/`, wideo w `public/video/`.

## Komendy

```bash
npm run dev        # dev server
npm run build      # produkcja -> dist/
npm run preview    # podgląd produkcji
```

## Ważne pliki

- `src/pages/index.astro` — kompozycja wszystkich sekcji
- `src/styles/global.css` — palety kolorów, reset, @import sections.css
- `src/content/config.ts` — schema galerii (Zod)
- `.env` — `PUBLIC_FORMSPREE_ID` (nie commitować!)

## Konwencje

- BEM naming w CSS (`.hero__title`, `.masonry-item__overlay`)
- Osobne pliki CSS per sekcja (`hero.css`, `gallery.css`, `lightbox.css`, `sections.css`)
- `sections.css` importowany globalnie przez `global.css` (nie per-komponent — było duplikowanie)
- Ludowy ornament: `FolkOrnament.astro` z props `size: sm | md | lg`
- Diagonalne przejścia: `DiagonalDivider.astro` z props `from/to: dark | light`

## Znane ograniczenia

- Astro 4 (nie 5/6) — bo Node 20. Upgrade po zainstalowaniu Node 22+.
- Wideo hero jest zakomentowane w `Hero.astro` — odkomentować po dodaniu pliku
- Współrzędne Google Maps w `Location.astro` mogą wymagać korekty
- Tytuły/opisy rzeźb w galerii są wstępne — zaktualizować gdy Szymon dostarczy opisy

## Przyszłe rozszerzenia (poza zakresem v1)

- Sklep / koszyk / płatności
- CMS (np. Decap CMS dla edycji galerii bez kodu)
- Blog / aktualności
- SEO: Open Graph images, structured data
- Wielojęzyczność (PL/EN)
