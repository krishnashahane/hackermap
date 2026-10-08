# HackerMap

HackerMap is a browser-only cybersecurity visualization demo. It generates **simulated attack events locally in JavaScript** and renders them as animated paths on a 3D globe.

It is not a live threat-intelligence feed, does not contact honeypots, and does not perform network attacks.

## Features

- Animated 3D globe using globe.gl / WebGL.
- Locally generated simulated attack events.
- Simulated DDoS, port scan, brute force, malware, SQL injection, and XSS categories.
- Synthetic source/target locations, IP addresses, ports, severity, feed entries, and aggregate charts.
- Responsive layout and reduced-motion support.
- No backend, database, or build step.

## Run locally

HackerMap is a static site. Node.js and a package manager are not required.

For the most reliable local experience, serve the directory over HTTP:

```bash
cd hackermap
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/` in a browser.

The same files can be deployed to GitHub Pages or another static host.

## Runtime dependency

The page pins globe.gl to version 2.46.2 through jsDelivr. That is currently the latest globe.gl release, and public security databases report no direct vulnerabilities for that package version. citeturn164509search0turn164509search2

The globe imagery is also loaded from the versioned jsDelivr package tree used by three-globe.

Because the app intentionally uses a CDN dependency, an internet connection is required for the globe library and its imagery. When the dependency cannot be loaded, the UI now reports the failure instead of repeatedly throwing errors.

## Data model

Every event is generated locally from a fixed set of weighted locations and attack types. Displayed IP addresses are synthetic. No external attack telemetry is consumed.

The UI explicitly says **SIMULATED LIVE** so the visualization is not mistaken for real-time threat intelligence.

## Security and reliability

- No user input is executed.
- Feed and chart content is inserted with DOM APIs instead of `innerHTML`.
- The external globe dependency is version-pinned.
- The page uses a restrictive Content Security Policy and a strict referrer policy.
- The app does not issue arbitrary network requests or scan remote hosts.
- The globe fails gracefully when the CDN dependency is unavailable.
- `prefers-reduced-motion` disables continuous globe rotation and decorative animations.
- Event history, rendered feed items, and globe arcs are bounded to prevent unbounded client-side growth.

## Project structure

```text
hackermap/
├── index.html
├── app.js
├── style.css
├── public/
│   └── favicon.svg
├── LICENSE
└── README.md
```

## Limitations

This is a visualization/simulation project, not a threat-detection system. Do not treat its generated events or statistics as evidence of real-world malicious activity.

## License

MIT
