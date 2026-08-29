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

The Chemistry section contains six interactive learning modules.

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

Explore the first **36 elements of the periodic table** interactively.

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

Included molecules include:

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

**A + B ⇌ C + D**

The module demonstrates:

- Forward reaction rate
- Reverse reaction rate
- Dynamic equilibrium
- Concentration changes
- Le Chatelier's Principle

Users can disturb the equilibrium and observe how the system responds.

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
│       ├── molecule.js
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
**Enrollment No.: 0801IT231027**

### Bhavika Lohia
**Enrollment No.: 0801IT231041**

---

# Academic Information

**Project:** Session Assignment – I  
**Subject:** CGMM  
**Category:** Interactive Educational Multimedia Application  
**Submitted To:** Dr. Puja Gupta

---

# Repository

**GitHub:**  
https://github.com/anmay-27/SciVerse

**Live Application:**  
https://anmay-27.github.io/SciVerse/index.html

---

## SciVerse

**Explore. Experiment. Understand.**
