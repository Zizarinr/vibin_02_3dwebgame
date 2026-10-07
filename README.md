# Nature Exploration - 3D Web Game Prototype

Welcome to the **Nature Exploration** project! 🌲✨

This project is my first experiment and trial in learning **Three.js** to create interactive 3D worlds in the web browser. It was built interactively using the *"vibe coding"* approach alongside **Antigravity by Google** (AI Coding Assistant).

## 🎮 About The Project

This is a Minimum Viable Product (MVP) for a 3D nature exploration web game. The project embraces a **Comic / Toon Shading (Cel-shaded)** visual style, aiming to feel like stepping into a comic book or a cartoon animation, rather than attempting to be hyper-realistic.

### Current Core Features:
- **First-Person Camera (FPS):** Experience the world from the character's perspective using classic movement controls (W, A, S, D or Arrows) and mouse-look (utilizing the `PointerLockAPI`).
- **Cartoon Visual Style (Toon Shading):** Leverages Three.js's built-in `MeshToonMaterial` combined with a custom gradient map (stepped lighting) and basic black outlines (via the *Inverted Hull* technique) to make objects look hand-inked.
- **Simple Procedural World:** Instead of loading heavy 3D models upfront, this project renders an undulating terrain and hundreds of trees using `InstancedMesh` (for ultra-lightweight performance) via mathematical formulas directly in the code.
- **Basic Physics/Collision System:** The player's camera automatically detects and adjusts to the contours of the rolling hills, providing the sensation of walking on solid ground.

## 🛠️ Technologies Used
- **HTML, CSS, and JavaScript (Vanilla)**
- **[Three.js](https://threejs.org/):** The primary 3D library running on top of WebGL.
- **[Vite](https://vitejs.dev/):** A modern, lightning-fast build tool and development server.
- **Antigravity by Google:** The AI Assistant acting as a pair-programming partner for architectural design, troubleshooting, and vibe coding.

## 🚀 How to Run Locally

Ensure you have [Node.js](https://nodejs.org/) installed on your computer.

1. Open a terminal in this project folder.
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the link provided in the terminal (usually `http://localhost:5173/`).

## 💡 What Can Be Developed Next?

Since this project is essentially a "blank canvas" or foundational framework, there is unlimited room for expansion. Here are some ideas for future development:

1. **Custom 3D Assets:** Replace the built-in Three.js primitives (cylinders and cones) with actual custom 3D models (`.glb` or `.gltf` formats) made in software like Blender (e.g., stylized pine trees, rocks, or a wooden cabin).
2. **Third-Person Camera & Character:** Add a rigged 3D character model with animations, and shift the camera to follow behind the character (Third-Person).
3. **Environment Enhancements:**
   - Add a painted Skybox with a sun and clouds.
   - Add wind effects to make the leaves sway using custom vertex shaders.
   - Implement firefly particle effects for nighttime scenes.
4. **Core Gameplay Mechanics:** Introduce interactable objects, a scoring system (collecting coins/hidden items), or readable signposts.
5. **Audio and Sound Effects:** Bring the world to life with ambient nature sounds (crickets, birds) and footsteps on the grass.
6. **Advanced Post-Processing:** Replace the simple outline method with the `OutlinePass` from Three.js Post-processing for perfect, consistent comic book lines across all complex 3D shapes.

---
*Built to learn, experiment, and have fun in the world of WebGL.*
