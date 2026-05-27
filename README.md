# 🍅 Focusly — Pomodoro Timer

A modern, responsive Pomodoro Timer web application built with React and Tailwind CSS. Manage focus and break sessions efficiently while tracking completed sessions for the current day.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Pomodoro Timer** — Configurable focus (1–120 min) and break (1–60 min) sessions
- **Auto Transitions** — Automatically switches between Focus → Break → Focus
- **Circular Progress Ring** — Animated SVG ring with real-time visual feedback
- **3 Visual States** — Focus (red), Break (green), Paused (amber) with distinct colors
- **Audio Notification** — Pleasant 3-tone chime via Web Audio API on session complete
- **Daily Session History** — Tracks completed focus sessions with timestamps
- **LocalStorage Persistence** — History survives page refreshes, auto-clears on new day
- **Keyboard Shortcuts** — `Space` to Start/Pause/Resume, `R` to Reset
- **Dynamic Page Title** — Shows countdown in browser tab while timer runs
- **Responsive Design** — Mobile-first layout (360px → 1440px+)
- **Accessibility** — ARIA labels, keyboard navigation, focus-visible rings, skip-to-content, `prefers-reduced-motion` support
- **Dark Theme** — Deep navy glassmorphism design with smooth transitions

## 🛠️ Tech Stack

| Technology     | Purpose              |
|----------------|----------------------|
| React 19       | Frontend framework   |
| Vite 8         | Build tool & dev server |
| Tailwind CSS 4 | Utility-first styling |
| LocalStorage   | Data persistence     |
| Web Audio API  | Sound notifications  |
| Vercel         | Deployment           |

## 📁 Project Structure

```
src/
├── components/
│   ├── Timer.jsx          # Countdown display + mode badge
│   ├── Controls.jsx       # Start/Pause/Resume/Reset buttons
│   ├── Settings.jsx       # Collapsible duration configuration
│   ├── History.jsx        # Daily session history list
│   └── ProgressRing.jsx   # SVG circular progress indicator
├── hooks/
│   └── usePomodoro.js     # Core timer logic custom hook
├── utils/
│   ├── storage.js         # LocalStorage persistence layer
│   └── date.js            # Date/time formatting utilities
├── App.jsx                # Root layout + keyboard shortcuts
├── main.jsx               # React entry point
└── index.css              # Tailwind v4 design system & tokens
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/TejasRawool186/pomodoro-timer.git
cd pomodoro-timer

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## ⌨️ Keyboard Shortcuts

| Key     | Action                          |
|---------|---------------------------------|
| `Space` | Start / Pause / Resume timer    |
| `R`     | Reset timer (when active)       |

## 🌐 Deployment

The app is deployed on Vercel:

🔗 **Live Demo**: [https://pomodoro-timer-tejasrawool186.vercel.app](https://pomodoro-timer-tejasrawool186.vercel.app)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
