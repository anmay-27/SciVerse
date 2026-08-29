# SciVerse

**Interactive Physics & Chemistry Learning Lab**

SciVerse is an Interactive Educational Multimedia Application that helps students understand science through real-time simulations, visualizations, interactive experiments, narration, challenges and quizzes.

## Project overview

SciVerse turns scientific ideas into experiments learners can control. It is a fully static, responsive frontend application with separate Physics and Chemistry laboratories, interactive concept modules, light and dark themes, and local progress utilities. It requires no account, database, build process, or backend.

## Physics modules

- Projectile Motion — trajectories, velocity, gravity, launch angle, drag, and target challenges
- Simple Pendulum — oscillation, period, frequency, gravity, length, angle, and damping
- Waves & Interference — amplitude, frequency, wavelength, phase, speed, and superposition
- Ray Optics — reflection, refraction, convex lenses, concave lenses, and ray diagrams
- Electric Fields — draggable positive and negative charges, field vectors, and field lines

## Chemistry modules

- Build an Atom — protons, neutrons, electrons, isotopes, elements, and ions
- Interactive Periodic Table — searchable and filterable data for elements 1–36
- Molecular Geometry — H₂O, CO₂, CH₄, NH₃, and BF₃ structures and properties
- Acids, Bases & pH — concentration calculations, common substances, and pH visualization
- Reaction Rates — collision theory, temperature, concentration, surface area, and catalysts
- Chemical Equilibrium — reversible reactions, disturbances, rates, and Le Chatelier’s principle

## Multimedia features

- Interactive HTML5 Canvas simulations
- Responsive SVG and CSS scientific diagrams
- Animated scientific visualizations
- Real-time parameter controls and calculated observations
- Web Speech API narration
- Interactive challenges
- Three-question quizzes with instant feedback
- Persistent light and dark themes through `localStorage`
- Reduced-motion support and keyboard focus states

## Technology stack

- HTML5
- CSS3
- Vanilla JavaScript
- HTML5 Canvas
- SVG
- Web Speech API
- `localStorage`

MathJax, GSAP, and Three.js are not currently loaded because the implemented modules do not require those external dependencies.

## Run locally

No installation or build step is required.

1. Clone or download the repository.
2. Open the project directory in VS Code.
3. Open `index.html` with the VS Code Live Server extension.

You can also serve the directory with any basic static HTTP server. Start at `index.html`; opening through HTTP is recommended for consistent browser behavior.

## GitHub Pages deployment

This repository is ready to deploy as a GitHub Pages project site such as:

```text
https://USERNAME.github.io/SciVerse/
```

1. Push the project to a GitHub repository named `SciVerse`.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder.
5. Save and wait for GitHub Pages to publish the site.
6. Open the URL shown in the Pages settings.

All internal paths are relative, so the application works from the `/SciVerse/` repository subdirectory. The root `.nojekyll` file tells GitHub Pages to serve the static files directly.

## Project structure

```text
SciVerse/
├── index.html
├── physics.html
├── chemistry.html
├── css/
│   ├── common.css
│   ├── home.css
│   ├── subject.css
│   └── simulation.css
├── js/
│   ├── common.js
│   ├── home.js
│   ├── physics/
│   └── chemistry/
├── concepts/
│   ├── physics/
│   └── chemistry/
└── assets/
    ├── images/
    ├── audio/
    └── icons/
```

## Screenshots

_Add homepage, Physics laboratory, Chemistry laboratory, and module screenshots here._

## Authors

_Add project author names, university details, and contributor roles here._
