# XProFlow Voice Companion (Skeleton)

This repository contains the initial Electron + Node.js skeleton for the XProFlow Voice Companion desktop app.

## Current behavior

The app currently:

- launches Electron
- runs as a minimal hidden background app
- registers the global push-to-talk hotkey (`Control+Space`)
- logs start/stop voice events to the console

- the dashboard window currently loads the repository root `index.html` file directly (changes in `src/` are not wired into Electron yet)

## Install dependencies

```bash
npm install
```

## Run in development mode

```bash
npm run dev
```

## Notes

- Audio recording is **not** implemented yet.
- API calls are **not** implemented yet.
- This scaffold is prepared for future wiring of recording and transcription upload.
