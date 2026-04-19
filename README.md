# 🎓 SQL Academy Trainer

![Aesthetics](https://img.shields.io/badge/Aesthetics-Premium-blueviolet?style=for-the-badge)
![Tech](https://img.shields.io/badge/Engine-SQLite--WASM-003B57?style=for-the-badge&logo=sqlite)
![Deployment](https://img.shields.io/badge/Deploy-Cloudflare--Pages-F38020?style=for-the-badge&logo=cloudflare)

**SQL Academy Trainer** is a state-of-the-art, interactive learning platform designed to take you from SQL novice to mastery. Built with a focus on deep technical integrity and a premium user experience, it features a custom-built SQL grading engine and an adaptive curriculum.

---

## ✨ Key Features

### 🧠 Adaptive Learning Engine
The trainer monitors your performance in real-time. If you struggle, it provides more scaffolding; if you succeed, it reduces help and introduces complex variations.
*   **Concept Mastery**: Advance through 15+ SQL concepts, from basic `SELECT` to `WINDOW FUNCTIONS`.
*   **Validation Mode**: Validate your queries against the target output without using up your limited submission attempts.
*   **Intelligent Grading**: Our engine is alias-agnostic and logic-aware, meaning it cares about the *data* you return, not just the exact strings you type.

### 🎨 Premium Developer Experience
*   **Interactive Schema Palette**: Browse table schemas and instantly insert column names into your editor with a single click.
*   **Glassmorphic UI**: A high-performance, modern interface that feels alive with micro-animations and smooth transitions.
*   **Side-by-Side Comparison**: After two failed attempts, the trainer reveals the **Target Output**, allowing you to visually compare your results and self-correct.

### 🚀 Mastery Challenges
Feeling confident? Use the **Skip Section** feature to trigger a "Prove Your Mastery" challenge. Solve a high-difficulty, zero-help variation to unlock the next concept immediately.

---

## 🛠️ Tech Stack

-   **Logic**: Pure JavaScript with `sql.js` (SQLite compiled to WebAssembly).
-   **Styling**: Vanilla CSS3 with modern variables and glassmorphic design patterns.
-   **Database**: In-browser relational database simulation using 3 custom datasets (Store, School, Library).
-   **Portability**: Entirely client-side. No backend required—perfect for privacy and offline-first learning.

---

## 🏃 Local Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/damuyada/SQLLearning.git
    ```
2.  Open `index.html` in any modern web browser.
3.  (Optional) For the best experience, use a local server:
    ```bash
    # If you have Python installed
    python3 -m http.server 8000
    ```

---

## 🌐 Deployment

This project is optimized for **Cloudflare Pages**. 
1.  Connect this repository to your Cloudflare Dashboard.
2.  Set the Build Command to `None`.
3.  Set the Output Directory to `/`.
4.  Assign your custom domain.

---

## 👨‍💻 Developer Tools

Entering the cheat code `-- DEV_SKIP` in the Final Answer editor will instantly master the current concept (useful for testing curriculum paths).

---

*Built with ❤️ for SQL Learners everywhere.*
