# Office Meltdown

Black-and-white 2D dark-comedy office game (vanilla JS + SVG + Vite). Installable PWA.

## Run
```
npm install
npm run dev        # local dev
npm run build      # production build -> dist/
npm run preview    # test the production build (service worker only runs in build)
```

## Audio
Place files in `public/assets/audio/` (already filled with your uploads):
`punch.mp3`, `stab.mp3`, `scold.mp3` (boss slap/scold), `gameover.mp3`.
Missing files are skipped silently. Ambience is synthesized in-browser (no file needed).

## Controls
Click/tap objects. Keys: 1 boss, 2 keyboard, 3 monitor, 4 mug, 5 stapler, 6 scissors, 7 printer, 8 chair, 9 plant, 0 clock; M mute, R restart, F fullscreen, Esc menu.
Goal loop: 8 chaos hits or 3 warnings ends the round.

## Upload to GitHub
1. Unzip the project. Create an empty repo on github.com (no README).
2. In the project folder: `git init && git add . && git commit -m "Initial commit"`
3. `git branch -M main && git remote add origin https://github.com/YOU/office-meltdown.git && git push -u origin main`
(Or drag the folder contents into the repo with "Add file > Upload files".)

## Deploy on Vercel
1. vercel.com > Add New > Project > import the GitHub repo.
2. Framework preset: Vite. Build command `npm run build`, output `dist` (auto-detected).
3. Deploy. You get an HTTPS URL (required for PWA install).

## Install
- Android Chrome: menu > Install app. Windows/desktop Chrome or Edge: install icon in the address bar.
- iPhone Safari: Share > Add to Home Screen.
