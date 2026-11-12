# HackerMap

HackerMap is a static, browser-based cybersecurity visualization. It generates synthetic attack events locally and displays them as animated routes on an interactive 3D globe.

> **Simulation only:** HackerMap does not receive real threat telemetry, monitor networks, contact honeypots, scan hosts, or perform attacks. All events, locations, statistics, and routes are generated in the browser. Treat them as illustrative data only.

## Capabilities

- Interactive 3D globe with animated event routes.
- Synthetic DDoS, port-scan, brute-force, malware, SQL injection, and XSS event categories.
- Simulated source and target locations, ports, severity levels, feed entries, and aggregate statistics.
- Bounded event history, globe arcs, feed entries, and scheduled burst events.
- Responsive layout and reduced-motion support.
- No backend, database, build system, or runtime application dependencies beyond the pinned globe.gl CDN script.

## Run locally

A modern browser and a local HTTP server are recommended. Node.js is only needed for the optional repository checks.

```bash
git clone https://github.com/krishnashahane/hackermap.git
cd hackermap
python3 -m http.server 8080
```

Open [http://127.0.0.1:8080](http://127.0.0.1:8080).

You can also deploy the static files to GitHub Pages or another static host. The globe library and its imagery are loaded from jsDelivr, so an internet connection is required for the full visualization. If the library fails to load, the page displays an error instead of starting the simulation.

## Synthetic data

Generated IP addresses use the RFC 5737 documentation-only ranges:

- `192.0.2.0/24`
- `198.51.100.0/24`
- `203.0.113.0/24`

These addresses are reserved for examples and documentation. The country and city labels are illustrative source/target selections from a fixed in-code dataset; they do not represent observed attribution or the location of real attackers.

## Quality checks

The project intentionally has no third-party development dependencies. With Node.js 20 or newer:

```bash
npm test
npm run check
```

- `npm test` runs built-in Node.js tests for the static application contract and security-sensitive invariants.
- `npm run check` performs a JavaScript syntax check.

GitHub Actions runs these checks for pushes and pull requests to `main`.

## Security and operational notes

- Dynamic feed and chart values are written with safe DOM APIs.
- Globe tooltip values are HTML-escaped before being passed to the globe library.
- The globe.gl script is version-pinned and constrained by a Content Security Policy.
- No user input is evaluated or executed.
- Simulation history, visible feed entries, active arcs, and pending burst timers are bounded or cleaned up.
- Timers stop on page exit, and globe sizing responds to container changes.
- Reduced-motion preferences disable continuous globe rotation and decorative animation.

For production hosting, configure HTTP response headers at the hosting layer as well. In particular, set `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and a `frame-ancestors` directive in the HTTP Content-Security-Policy header. The `frame-ancestors` directive is not enforced when supplied through a CSP meta element.

## Project structure

```text
hackermap/
├── .github/workflows/quality.yml
├── tests/quality.test.mjs
├── app.js
├── index.html
├── style.css
├── package.json
├── README.md
└── LICENSE
```

## License

MIT.
