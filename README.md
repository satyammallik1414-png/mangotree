# The Mango Tree — Bhubaneswar

The recreated restaurant site uses React for page sections, scroll animation, navigation, and reservations, and Vite for development and production builds.

## Run locally

Use Node.js 20.19+ or 22.12+.

```bash
npm ci
npm run dev
```

Open the local URL that Vite prints, usually `http://localhost:5173`.

```bash
npm run build
npm run preview
```

`npm run build` creates `dist/`. You can serve it with any static host.

## Project files

- `src/App.jsx` provides section navigation and connects the reservation buttons.
- `src/Hero.jsx` and `src/motion.js` implement the five scroll scenes, day-to-night crossfade, and reduced-motion support.
- `src/Sections.jsx` contains the restaurant sections and footer.
- `src/Reservation.jsx` prepares and copies a reservation request for Instagram.
- `src/styles.css` holds the design and responsive layouts.
- `public/assets/` contains the images reconstructed from the supplied recording and the site mark.

The restaurant confirms reservations through Instagram. The frontend does not send messages or manage table availability.
# mangotree
