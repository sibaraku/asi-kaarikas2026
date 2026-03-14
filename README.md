# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Here’s a clean and professional README for your **Pacman ASI** project based on the package details you provided:

---

Pacman ASI

**Pacman ASI** is a modern 3D web application built with **React**, **Three.js**, and **Tailwind CSS**. It leverages **React Three Fiber** for immersive 3D experiences and supports interactive gestures with **@use-gesture/react**.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Available Scripts](#available-scripts)
* [Folder Structure](#folder-structure)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* Fully interactive 3D environment using **Three.js**.
* Smooth gestures and camera controls for desktop and touch devices.
* Styled with **Tailwind CSS** for rapid UI development.
* Optimized builds using **Vite**.
* ESLint configured for code quality and consistency.

---

## Tech Stack

* **React 19**
* **React DOM 19**
* **Three.js 0.183**
* **React Three Fiber**
* **@react-three/drei**
* **@use-gesture/react**
* **Tailwind CSS 4**
* **Vite** as the build tool
* **ESLint** for linting

---

## Getting Started

1. Clone the repository:

```bash
git clone <your-repo-url>
cd pacman_asi
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser at [http://localhost:5173](http://localhost:5173)

---

## Available Scripts

| Script            | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Starts the development server with hot reload. |
| `npm run build`   | Builds the project for production.             |
| `npm run preview` | Previews the production build locally.         |
| `npm run lint`    | Runs ESLint to check for code issues.          |

---

## Folder Structure

```
pacman_asi/
├─ node_modules/       # Dependencies
├─ public/             # Static assets
├─ src/
│  ├─ components/      # React components
│  ├─ scenes/          # 3D scene setups
│  ├─ App.jsx          # Main app entry
│  └─ main.jsx         # ReactDOM render
├─ index.html          # HTML entry
├─ package.json
├─ tailwind.config.js
└─ vite.config.js


