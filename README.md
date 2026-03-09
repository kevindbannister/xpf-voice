# XProFlow Voice Companion (Skeleton)

This repository contains the initial Electron + Node.js skeleton for the XProFlow Voice Companion desktop app.

## Current behavior

The app currently:

- launches Electron
- runs as a minimal hidden background app
- registers the global push-to-talk hotkey (`§`)
- logs start/stop voice events to the console

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
