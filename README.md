# Jaya Jagriti Portfolio

Personal portfolio for Jaya Jagriti, built with React + Vite. Vibe thoda old-money, thoda anime, thoda retro TV. Site ka main goal simple hai: projects, skills, education, aur contact ko ek clean interactive experience me dikhana.

## Kya Hai Isme

- Intro gate with video background, Bongo Cat interaction, and retro TV channel dock.
- Home page sections: Overview, Education, Skills, Projects.
- Smooth desktop scrolling with Lenis, mobile pe safe native scroll.
- Animated page/section transitions using Framer Motion.
- Video cards for education and project highlights.
- Bottom mini dock for quick section jump on home.

## Tech Stack

- React 18
- Vite
- TypeScript
- React Router
- Framer Motion
- Lenis
- CSS with component-level styling

## Local Setup

```bash
npm install
npm run dev
```

Production build check:

```bash
npm run build
```

Preview build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
    background/   video backgrounds
    intro/        entry screen, TV dock, Bongo Cat
    layout/       navbar, footer, transitions
    nav/          scroll progress and section dock
    sections/     overview, education, skills, projects
  data/           section metadata
  routes/         route pages
  styles/         global CSS
public/
  assets/         TV and Bongo assets
  logos/          skill logos
  videos/         project videos
```

## Assets Notes

Video files live mostly in `public/` and `public/assets/tv/`. Agar video replace karna hai, same path/name rakhna easiest rahega. Naya asset add karte time `public/` ke andar rakho so Vite directly serve kar sake.

## Deployment

Ye static Vite app hai. Build command:

```bash
npm run build
```

Output folder:

```text
dist/
```

Netlify, Vercel, ya GitHub Pages pe deploy kar sakte ho. Bas build command `npm run build` and publish directory `dist` set karna.

## Tiny Reminder

Comments intentionally minimal rakhe gaye hain. Basic comments hata diye, sirf woh notes bache hain jo browser quirks, mobile behavior, video loading, ya stacking issues explain karte hain.
