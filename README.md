# SciVerse

## Interactive Physics & Chemistry Learning Lab

**SciVerse** is an Interactive Educational Multimedia Application designed to make Physics and Chemistry concepts easier to understand through visual learning, experimentation, simulations, animations, narration, challenges, and quizzes.

Instead of presenting scientific concepts as static notes, SciVerse allows learners to **observe, manipulate, experiment with, and understand** scientific principles through an interactive web-based environment.

### Explore. Experiment. Understand.

---

## Live Application

You can directly use SciVerse here:

**https://anmay-27.github.io/SciVerse/index.html**

---

## About the Project

Traditional science learning often relies heavily on equations, diagrams, and written explanations. SciVerse enhances this approach by allowing users to interact directly with scientific concepts.

The platform contains two major learning laboratories:

- **Physics Laboratory**
- **Chemistry Laboratory**

Each laboratory contains interactive modules where users can modify parameters and immediately observe how the system responds.

The application combines multiple forms of digital media including:

- Text
- Scientific diagrams
- Animations
- Interactive simulations
- Canvas and SVG graphics
- Audio narration
- Real-time controls
- Challenges
- Quizzes

This makes SciVerse a complete **Interactive Educational Multimedia Application**.

---

# Physics Laboratory

The Physics section contains five interactive modules.

## 1. Projectile Motion

Explore how an object's trajectory changes with:

- Initial velocity
- Launch angle
- Gravity
- Air resistance

The simulation visualizes the projectile in real time and displays values such as:

- Current height
- Horizontal distance
- Maximum height
- Flight time
- Total range

A challenge mode allows the learner to adjust parameters and attempt to hit a target.

---

## 2. Simple Pendulum

Interact with a simulated pendulum and modify:

- Pendulum length
- Gravity
- Starting angle
- Damping

The module demonstrates concepts such as:

- Oscillation
- Time period
- Frequency
- Angular motion

Learners can also attempt challenges by adjusting the pendulum to achieve a required period.

---

## 3. Waves & Interference

Visualize wave behaviour through real-time animations.

Users can modify:

- Amplitude
- Frequency
- Wavelength
- Phase
- Wave speed

The module demonstrates:

- Individual waves
- Constructive interference
- Destructive interference
- Resultant wave behaviour

---

## 4. Optics

An interactive ray-optics laboratory covering:

- Reflection
- Refraction
- Convex lenses
- Concave lenses

Users can manipulate parameters such as:

- Incident angle
- Refractive index
- Object distance

The module dynamically visualizes rays and demonstrates important optical laws.

---

## 5. Electric Fields

Explore electric fields by placing and manipulating:

- Positive charges
- Negative charges

The visualization helps demonstrate:

- Electric-field direction
- Attraction
- Repulsion
- Field vectors
- Effects of charge magnitude

---

# Chemistry Laboratory

The Chemistry section contains seven interactive learning modules.

## 1. Build an Atom

Build atoms interactively by changing the number of:

- Protons
- Neutrons
- Electrons

The application automatically determines information such as:

- Element name
- Chemical symbol
- Atomic number
- Mass number
- Net charge
- Isotope information

The visualization also displays the nucleus and electron shells.

---

## 2. Interactive Periodic Table

Explore **all 118 elements of the periodic table** interactively.

Users can search and inspect elements using:

- Element name
- Chemical symbol
- Atomic number

Element information includes:

- Atomic number
- Atomic mass
- Category
- Period
- Group
- Electron configuration

Different categories of elements can also be explored using filters.

---

## 3. Molecular Geometry

Visualize common molecules and understand their molecular structures.

There are 25 rotatable molecular models. The original choices include:

- H₂O
- CO₂
- CH₄
- NH₃
- BF₃

The module provides information about:

- Molecular geometry
- Bond angles
- Polarity
- Hybridization
- Molecular structure

---

## 4. Acids, Bases & pH

Explore the pH scale interactively from **0 to 14**.

Users can observe:

- Acidic behaviour
- Neutral solutions
- Basic behaviour
- Hydrogen-ion concentration
- Hydroxide-ion concentration

The module also includes familiar substances such as:

- Lemon juice
- Vinegar
- Water
- Coffee
- Soap
- Bleach

---

## 5. Reaction Rates

A particle-based simulation demonstrating **collision theory**.

Users can modify:

- Temperature
- Concentration
- Surface area
- Catalyst presence

The simulation demonstrates how these factors influence:

- Successful collisions
- Reaction progress
- Reaction rate

---

## 6. Chemical Equilibrium

An interactive visualization of a reversible reaction:

**A ⇌ B** (a qualitative teaching model)

The module demonstrates:

- Forward reaction rate
- Reverse reaction rate
- Dynamic equilibrium
- Concentration changes
- Le Chatelier's Principle

Users can disturb the equilibrium and observe how the system responds.

---

## 7. Observable Chemical Reactions

Explore ten animated reaction demonstrations with playback, progress scrubbing, equations, narration and quizzes. Reaction Rates and Chemical Equilibrium also each include ten named teaching examples.

---

# Multimedia Features

SciVerse combines several multimedia techniques to improve the learning experience.

### Interactive Simulations

Scientific phenomena are visualized dynamically instead of being presented only through static diagrams.

### Real-Time Animations

Physics and Chemistry concepts are represented using animated Canvas and SVG graphics.

### User-Controlled Experiments

Users can change scientific parameters using sliders, buttons, and interactive controls.

### Audio Narration

The application uses the browser's **Web Speech API** to provide spoken explanations of selected concepts.

### Challenges

Modules contain small interactive challenges that encourage users to apply what they have learned.

### Quizzes

Each learning module contains short quizzes with immediate feedback.

### Dark and Light Themes

Users can switch between light and dark modes.

The selected theme is stored locally and restored when the application is opened again.

### Responsive Interface

SciVerse is designed to work on:

- Desktop computers
- Laptops
- Tablets
- Mobile devices

---

# Technology Stack

SciVerse is built as a lightweight frontend application.

| Technology | Purpose |
|---|---|
| HTML5 | Application structure and semantic content |
| CSS3 | Styling, layouts, responsiveness and animations |
| Vanilla JavaScript | Application logic and interactivity |
| HTML5 Canvas | Real-time scientific simulations |
| SVG | Scientific diagrams and visualizations |
| Web Speech API | Audio narration |
| localStorage | Theme and local progress persistence |
| Git | Version control |
| GitHub | Source-code hosting |

The project does **not require a backend, database, npm, Node.js, React, or other frontend frameworks**.

---

# Project Structure

```text
SciVerse/
│
├── index.html
├── physics.html
├── chemistry.html
│
├── css/
│   ├── common.css
│   ├── home.css
│   ├── subject.css
│   └── simulation.css
│
├── js/
│   ├── common.js
│   ├── home.js
│   ├── lab-visuals.js
│   │
│   ├── physics/
│   │   ├── projectile.js
│   │   ├── pendulum.js
│   │   ├── waves.js
│   │   ├── optics.js
│   │   └── electric-field.js
│   │
│   └── chemistry/
│       ├── atom-builder.js
│       ├── periodic-table.js
│       ├── periodic-data.js
│       ├── molecule.js
│       ├── molecule-data.js
│       ├── reaction-examples.js
│       ├── reaction-visuals.js
│       ├── ph-lab.js
│       ├── reaction-rate.js
│       └── equilibrium.js
│
├── concepts/
│   ├── physics/
│   │   ├── projectile.html
│   │   ├── pendulum.html
│   │   ├── waves.html
│   │   ├── optics.html
│   │   └── electric-field.html
│   │
│   └── chemistry/
│       ├── atom-builder.html
│       ├── periodic-table.html
│       ├── molecule.html
│       ├── ph-lab.html
│       ├── reaction-rate.html
│       ├── reaction-visuals.html
│       └── equilibrium.html
│
└── assets/
    ├── images/
    ├── audio/
    └── icons/
```

---

# How to Use SciVerse

The easiest way to use SciVerse is through the live application:

**https://anmay-27.github.io/SciVerse/index.html**

From the homepage:

1. Select **Physics** or **Chemistry**.
2. Select a learning module.
3. Read the short concept explanation.
4. Change the available simulation parameters.
5. Observe the animation or visualization.
6. Use **Explain Aloud** for audio narration where available.
7. Complete the interactive challenge.
8. Attempt the quiz to test your understanding.

---

# Running the Project Locally

Because SciVerse is a static HTML/CSS/JavaScript application, no complicated setup is required.

## Option 1: Clone using Git

```bash
git clone https://github.com/anmay-27/SciVerse.git
cd SciVerse
```

Open the folder in VS Code:

```bash
code .
```

---

## Option 2: Download ZIP

1. Open the SciVerse GitHub repository.
2. Click **Code**.
3. Select **Download ZIP**.
4. Extract the ZIP file.
5. Open the extracted `SciVerse` folder in VS Code.

---

# Running with VS Code Live Server

Using Live Server is the recommended method.

### Step 1

Install the **Live Server** extension in Visual Studio Code.

### Step 2

Open:

```text
index.html
```

### Step 3

Right-click the file and select:

```text
Open with Live Server
```

The application should open in your browser at an address similar to:

```text
http://127.0.0.1:5500/index.html
```

You can now use the complete application locally.

---

# Running with Python

If Python is installed, the project can also be served using:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

in your browser.

---

# Browser Requirements

For the best experience, use a modern browser such as:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

JavaScript must be enabled.

Audio narration depends on browser support for the **Web Speech API**, so available voices may differ between browsers and operating systems.

---

# No Installation or Backend Required

SciVerse does not require:

- Database configuration
- API keys
- Spring Boot
- Node.js
- npm installation
- Python packages
- User accounts

Once the repository is downloaded or cloned, it can be served directly as a static website.

---

# Educational Approach

SciVerse follows a multimedia-based learning approach:

```text
LEARN
  ↓
VISUALIZE
  ↓
EXPERIMENT
  ↓
OBSERVE
  ↓
CHALLENGE
  ↓
QUIZ
  ↓
UNDERSTAND
```

The objective is to help students understand scientific concepts by interacting with them rather than simply memorizing equations or reading static notes.

---

# Contributors

### Anmay Rai
### Bhavika Lohia
---

---

# Repository

**GitHub:**  
https://github.com/anmay-27/SciVerse

**Live Application:**  
https://anmay-27.github.io/SciVerse/index.html

---

## SciVerse

**Explore. Experiment. Understand.**

---

## Enhanced laboratory visuals

The existing lessons, navigation, narration, quizzes and challenges remain in place. No installation, CDN, backend or build step was added.

- **Molecular Geometry:** perspective projection of 3D atom coordinates, shaded spheres and bonds, drag/touch/keyboard rotation, optional auto rotation, geometry and bond-angle annotations. All five original molecules remain available alongside 20 additional models. This is a Canvas renderer, not Three.js/WebGL.
- **Build an Atom:** layered nucleus, elliptical animated shells, particle colors and live isotope/ion feedback. Shell paths are a teaching model rather than literal electron trajectories.
- **Projectile Motion:** predicted trajectory, glowing trail, perspective ground, target marker, landing pulse, velocity vectors and enhanced-mode toggle. Linear air resistance now affects both trajectory and reported measurements consistently.
- **Waves:** labeled component/resultant traces, custom phase, standing-wave nodes and antinodes, optional perspective ripple tank. Speed, wavelength and frequency are linked.
- **Pendulum, optics and fields:** shaded bob and energy bars; propagating light, lens/image/focus labels and total internal reflection; traced electric field lines, potential overlay and positive test-particle probes.
- **Chemistry:** indicator beaker and color scale, category-colored element cards with atom previews, collision flashes and product formation, reversible particle transformations and a live rate-history graph. The equilibrium lesson explicitly uses a simplified A ⇌ B model.
- **Observable reactions:** new `concepts/chemistry/reaction-visuals.html` page linked from the Chemistry laboratory, with ten selectable demonstrations, playback, pause, reset, a progress scrubber, reaction-specific narration and safety explanations, a challenge and quizzes.

Shared rendering helpers live in `js/lab-visuals.js`; the reaction gallery logic is in `js/chemistry/reaction-visuals.js`. Animation loops stop scheduling while the document is hidden. Reduced-motion preferences disable automatic molecule/atom rotation and wave playback, remove decorative optical motion and reduce the update frequency of explicitly played simulations.

### Verification and manual demonstration

The upgrade was checked in headless Chrome at desktop and phone widths: all 12 lessons loaded without JavaScript exceptions, and quizzes, theme controls and resets remained connected. Interactive checks covered all five molecules, the original four reaction scenes, projectile launch/pause/drag, wave controls, total internal reflection, atom/ion outputs, periodic-table filters, pH classification, product formation and equilibrium disturbances. JavaScript syntax and local resource paths were checked separately.

For the classroom demonstration, manually check:

1. Open Chemistry → Observable Chemical Reactions. Play all ten examples; look for brown fumes above the blue copper solution, a settling yellow solid, pink fading to colorless, and rising CO₂ bubbles. Pause, scrub and reset each one.
2. Rotate each molecule using mouse/touch and arrow keys. Toggle auto rotation. Check geometry, angles and polarity.
3. Launch projectiles with and without drag; try a target hit and enhanced-mode toggle. Try standing waves, surface ripples and field probes.
4. Test light/dark themes, phone/tablet layouts, keyboard navigation and the operating system's reduced-motion setting.
5. Use Explain aloud and Stop narration with your actual browser and speakers; headless checks cannot confirm audible output or installed voices.

## Expanded reaction collections

Each reaction module now includes at least ten named examples. Observable Chemical Reactions has ten animated demonstrations, including silver chloride, copper hydroxide and iron hydroxide precipitates, limewater clouding, peroxide decomposition and copper deposition alongside the original four. Reaction Rates and Chemical Equilibrium each have ten selectable teaching examples, equations, explanations, narration and illustrative presets. Free exploration preserves their original models.

The new shared collection and picker are in `js/chemistry/reaction-examples.js`. These presets are qualitative teaching aids, not numerical models of the named reactions. Equilibrium examples distinguish exothermic and endothermic forward directions; the temperature response changes accordingly.

Chemistry references: [Purdue metal displacement demonstrations](https://chemed.chem.purdue.edu/genchem/demosheets/9.11.html) for copper coating on iron, and [LibreTexts equilibrium experiments](https://chem.libretexts.org/Courses/Los_Medanos_College/Chemistry_6_and_Chemistry_7_Combined_Laboratory_Manual_%28Los_Medanos_College%29/01%3A_Experiments/1.16%3A_Experiment_616_Shifting_Equilibrium_1_1_3) for the cobalt complex equilibrium.

Expansion validation: 215 browser assertions passed across all 30 named samples at 1280px and 320px, including visible before/after changes, example narration calls, free-exploration restoration, reset, quizzes, resource paths, and the temperature-response direction for all ten equilibrium examples.

## Complete periodic table and 25 molecular models

Molecular Geometry now contains 25 choices: the original H₂O, CO₂, CH₄, NH₃ and BF₃, plus H₂, O₂, N₂, HCl, HF, HCN, BeCl₂, BCl₃, SiH₄, CCl₄, CH₃Cl, NF₃, OF₂, SO₂, SO₃, PCl₅, SF₄, SF₆, XeF₂ and XeF₄. Single, double and triple bonds use explicit bond connections. Two-atom molecules correctly show no bond angle; all trigonal-planar choices are accepted by the existing challenge. Some shapes are idealized, and expanded-valence hybridization labels are identified as traditional classroom descriptions.

The periodic table includes all 118 elements, with detached lanthanide and actinide rows, category filters and exact symbol/atomic-number search. Ag and Au have complete detail cards. Neutral-atom shell previews now use every electron from the configuration instead of truncating at 20.

Data remains local: `js/chemistry/molecule-data.js` and `js/chemistry/periodic-data.js` require no network at runtime. Element properties were retrieved from [PubChem’s public periodic-table dataset](https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON) on 2026-09-08. Lawrencium’s configuration follows [NIST](https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?element=103). Source qualifiers for predicted configurations are retained; isotope-specific mass values are not presented as standard atomic weights. Molecular teaching conventions follow [OpenStax’s molecular structure discussion](https://openstax.org/books/chemistry-2e/pages/7-6-molecular-structure-and-polarity).

Collection validation: all 25 molecule options and all 118 element detail cards were exercised in Chrome at 1280px and 320px. 176 assertions covered geometry outputs, keyboard rotation, diatomic angle handling, Au/Ag search, both detached series, filters, reset, quizzes, reduced motion and local paths. All 118 neutral electron totals and unique table positions were also checked.
