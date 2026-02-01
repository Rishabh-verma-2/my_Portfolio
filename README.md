# Rishabh Verma - Portfolio Website

A modern, immersive portfolio website built with React, Three.js, and Framer Motion.

## 🚀 Getting Started

Since the environment didn't have Node.js accessible in the path during setup, you will need to install dependencies manually.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)

### Installation

1.  Open your terminal in this directory.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Project

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠 Tech Stack

-   **Frontend Framework**: React + Vite
-   **Styling**: TailwindCSS
-   **Animations**: Framer Motion, GSAP
-   **3D Graphics**: Three.js, React Three Fiber, React Three Drei
-   **Icons**: Lucide React

## 📂 Project Structure

-   `src/components`: UI Sections (Hero, About, Tech, Projects, Contact)
-   `src/components/canvas`: 3D Scenes (HeroCanvas, BallCanvas, EarthCanvas)
-   `src/assets`: Images and static assets
-   `src/hoc`: Higher Order Components (SectionWrapper)

## ✨ Customization

-   To update your info, edit `src/constants/index.ts` (if I extracted it there) or directly in the components.
-   Currently, data is hardcoded in `src/components/About.tsx`, `src/components/Tech.tsx`, and `src/components/Projects.tsx`.
