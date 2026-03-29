# Szym znad Wisły — Portfolio Snycerza

## Cel

Artystyczne portfolio prezentujące twórczość Szymona — snycerza-samouka z Nowej Wsi koło Grudziądza. Strona promocyjna, bez sprzedaży na tym etapie. Niespodzianka od przyjaciela.

## Charakter wizualny

**Kontrast tradycji i nowoczesności** — brutalistyczna typografia sans-serif i geometryczny layout zderzony z ludowymi ornamentami SVG i ciepłem drewna. Napięcie między starym a nowym.

### Palety kolorów

**Paleta A (ciemna)** — sekcje galeryjne, hero, lokalizacja:
- Tło: `#1a1a1a`
- Tekst: `#f5f0e8`
- Złoto drewna: `#c8a96e`
- Czerwień ludowa: `#e63946`
- Zieleń nadwiślańska: `#2d6a4f`

**Paleta B (jasna)** — sekcje tekstowe, kontakt, cytat:
- Tło: `#faf8f4`
- Tekst: `#2c2c2c`
- Brąz ciepły: `#8b6f47` / `#d4a373`
- Oliwka wiosenna: `#606c38`

### Przejścia między sekcjami

Diagonalne cięcia CSS (`clip-path` lub `linear-gradient`) między ciemnymi i jasnymi sekcjami — jak cios dłutem w drewnie.

## Struktura strony — Single Page

### 1. Hero (100vh, paleta A)

- **Tło:** wyciszony film (autoplay, loop, muted) z procesu rzeźbienia
- **Nakładka:** przyciemniony gradient
- **Centrum:** ludowy ornament SVG (góra), napis "SZYM" (duża brutalna typografia), "znad Wisły" (serif, mniejszy), złoty divider, cytat kursywą, CTA "Zobacz prace ↓"
- **Fallback:** jeśli brak wideo — statyczna tekstura drewna w tle

### 2. Galeria masonry (paleta A)

- **Layout:** CSS columns (3 kolumny desktop, 2 tablet, 1 mobile)
- **Zawartość:** zdjęcia i wideo w jednym gridzie
- **Wideo:** oznaczone badge ▶, autoplay przy hoverze (wyciszony), klik otwiera lightbox
- **Hover:** overlay z tytułem, materiałem, rokiem
- **Lightbox:** powiększone zdjęcie / odtwarzacz wideo, nawigacja strzałkami
- **Dane:** każda praca to plik `.md` w `src/content/gallery/` z frontmatterem (title, image, material, year, type: photo|video)
- **Rozbudowa:** dodanie rzeźby = nowy plik `.md` + zdjęcie/wideo w `public/gallery/`

### 3. Cytat / motto (paleta B)

- Ludowy ornament SVG
- Jedno zdanie Szymona, duży font Georgia italic
- Podpis "— Szymon"

### 4. Lokalizacja (paleta A)

- Nagłówek: "Nowa Wieś nad Wisłą"
- Poetycki opis miejsca (skarpa, dolina Wisły, warsztat)
- Embed Google Maps lub stylizowana mapa

### 5. Kontakt (paleta B)

- Formularz: imię, email, wiadomość, przycisk "Wyślij" — obsługa przez Formspree
- Link do Instagrama @szymznadwisly
- Krótka zachęta do kontaktu

### 6. Footer (paleta A)

- Minimalistyczny: ornament SVG + "Szym znad Wisły · Nowa Wieś · 2025"

## Stack technologiczny

- **Astro** — static site generator
- **CSS** — vanilla, custom properties, zero frameworków CSS
- **JavaScript** — vanilla, minimalne (lightbox, masonry hover, video autoplay)
- **Formspree** — formularz kontaktowy (free tier)
- **Hosting** — Netlify / Vercel / GitHub Pages (decyzja użytkownika)
- **Czcionki:** system-ui (sans) + Georgia (serif) — zero zewnętrznych fontów

## Zarządzanie treścią (Astro Content Collections)

```
src/content/gallery/
  madonna.md          # frontmatter: title, image, material, year, type
  orzel.md
  ...
public/gallery/
  madonna.jpg
  orzel.jpg
  proces-orla.mp4
  ...
```

Dodanie nowej rzeźby:
1. Wrzuć zdjęcie/wideo do `public/gallery/`
2. Utwórz plik `.md` w `src/content/gallery/`
3. Deploy (auto-build na Netlify/Vercel)

## Responsywność

- **Desktop:** 3-kolumnowa masonry, split layout lokalizacja/kontakt
- **Tablet:** 2-kolumnowa masonry, stackowane sekcje
- **Mobile:** 1-kolumnowa masonry, pełna szerokość, hero dopasowany

## Wydajność

- Wideo hero: format MP4 (H.264), max 5MB, poster image jako fallback
- Zdjęcia galerii: Astro `<Image>` z automatyczną optymalizacją (WebP/AVIF)
- Lazy loading na zdjęciach poniżej folda
- Zero zewnętrznych CSS/JS frameworków

## Ludowy ornament SVG

Styl: uproszczone krzywe inspirowane wycinankami — symetryczne fale (`Q` paths), kropki, koła. Czerwień (`#e63946`) + złoto (`#c8a96e`). Pojawiają się w hero (góra + dół), sekcji cytatu, footerze. Ręcznie kodowane inline SVG, brak zewnętrznych plików.

## Lightbox

- Vanilla JS, bez bibliotek
- Klik na kafelek galerii → pełnoekranowy overlay z ciemnym tłem
- Zdjęcie: powiększone, strzałki lewo/prawo, ESC zamyka
- Wideo: odtwarzacz HTML5 z kontrolkami, unmuted w lightboxie
- Swipe na mobile

## Formspree

- Endpoint konfigurowany w zmiennej środowiskowej Astro (`PUBLIC_FORMSPREE_ID`)
- Walidacja po stronie klienta (required fields)
- Prosty komunikat sukcesu/błędu po wysłaniu

## Poza zakresem (na później)

- Sklep / koszyk / płatności
- Panel administracyjny / CMS
- Blog
- Wielojęzyczność
