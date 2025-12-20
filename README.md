# React + Vite Project

This project is created using **React with Vite** for a fast, modern development experience.


---

## 🚀 Tech Stack

* ⚛️ React
* ⚡ Vite
* 🎨 Tailwind CSS (optional)
* 🎬 Framer Motion (animations)
* 🧩 clsx (conditional class names)
* 🎯 lucide-react (icons)


---

## 📦 Installation & Setup

### 1️⃣ Clone the repository (if applicable)

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

The app will run at:

```
Client : http://localhost:5173
Admin : http://localhost:5174
```


---

## 📚 Installed Libraries

### 🔹 lucide-react (Icons)

Lightweight, clean SVG icons for React.

```bash
npm install lucide-react
```

Usage example:

```jsx
import { Home, User } from "lucide-react";

<Home className="w-5 h-5" />
```


---

### 🔹 framer-motion (Animations)

Powerful animation library for React.

```bash
npm install framer-motion
```

Usage example:

```jsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Hello World
</motion.div>
```


---

### 🔹 clsx (Conditional Class Names)

Utility for constructing className strings conditionally.

```bash
npm install clsx
```

Usage example:

```jsx
import clsx from "clsx";

<div className={clsx("p-4", isActive && "bg-green-500")} />
```


---

## ➕ Installing More Dependencies (Future)

You can add more libraries anytime using:

```bash
npm install package-name
```

Example:

```bash
npm install react-router-dom axios
```


---

# In single line Insalltion

```bash
npm i react-router-dom clsx lucide-react framer-motion axios @radix-ui/react-slot class-variance-authority
```


---

## 📁 Project Folder Structure

This project uses a **monorepo-style structure** with separate **admin** and **client** applications.

```
proveIt/
├─ admin/
├─ public/
│  └─ favicon.svg
│
├─ src/
│  ├─ app/                 # App bootstrap & core wiring
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  ├─ routes.jsx
│  │  ├─ providers.jsx
│  │  └─ error-boundary.jsx
│  │
│  ├─ features/            # Feature-based architecture (MOST IMPORTANT)
│  │  ├─ auth/
│  │  │  ├─ components/
│  │  │  ├─ hooks/
│  │  │  ├─ services/
│  │  │  ├─ api.js
│  │  │  └─ index.js
│  │  │
│  │  ├─ dashboard/
│  │  ├─ users/
│  │  ├─ settings/
│  │  └─ index.js
│  │
│  ├─ shared/              # Reusable but app-specific
│  │  ├─ ui/               # Buttons, Inputs, Modals
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ animations/
│  │  └─ index.js
│  │
│  ├─ services/            # Core services (global)
│  │  ├─ apiClient.js
│  │  ├─ authService.js
│  │  └─ storageService.js
│  │
│  ├─ store/               # Global state
│  │  ├─ index.js
│  │  ├─ auth.slice.js
│  │  └─ ui.slice.js
│  │
│  ├─ config/              # Configuration
│  │  ├─ env.js
│  │  ├─ routes.js
│  │  └─ constants.js
│  │
│  ├─ lib/                 # External libs abstraction (PRO LEVEL)
│  │  ├─ axios.js
│  │  ├─ framer.js
│  │  ├─ icons.js
│  │  └─ clsx.js
│  │
│  ├─ assets/
│  │  ├─ images/
│  │  ├─ icons/
│  │  └─ fonts/
│  │
│  ├─ styles/
│  │  ├─ globals.css
│  │  ├─ tailwind.css
│  │  └─ themes.css
│  │
│  └─ tests/
│     ├─ unit/
│     ├─ integration/
│     └─ e2e/
│
├─ index.html
├─ package.json
├─ vite.config.js
├─ .env.example
└─ README.md
│
├─ client/
├─ public/
│  └─ favicon.svg
│
├─ src/
│  ├─ app/                     # App bootstrap layer
│  │  ├─ App.jsx               # Root component
│  │  ├─ main.jsx              # Entry point
│  │  ├─ routes.jsx            # All route definitions
│  │  ├─ providers.jsx         # Context / Theme / Query providers
│  │  └─ error-boundary.jsx    # Global error handling
│  │
│  ├─ features/                # Feature-based architecture (CORE)
│  │  ├─ auth/                 # Login / Signup / OTP
│  │  │  ├─ components/
│  │  │  ├─ hooks/
│  │  │  ├─ services/
│  │  │  ├─ api.js
│  │  │  └─ index.js
│  │  │
│  │  ├─ home/
│  │  │  ├─ components/
│  │  │  └─ Home.jsx
│  │  │  
│  │  │
│  │  ├─ profile/
│  │  ├─ orders/
│  │  ├─ notifications/
│  │  └─ index.jsx
│  │
│  ├─ shared/                  # Reusable (client-only)
│  │  ├─ ui/                   # Buttons, Inputs, Modals
│  │  ├─ components/           # Navbar, Footer, Layout
│  │  ├─ hooks/
│  │  ├─ animations/
│  │  └─ index.jsx
│  │
│  ├─ services/                # App-level services
│  │  ├─ apiClient.js          # Axios instance
│  │  ├─ authService.js
│  │  └─ storageService.js
│  │
│  ├─ store/                   # Global state (Redux/Zustand)
│  │  ├─ index.js
│  │  ├─ auth.slice.js
│  │  └─ ui.slice.js
│  │
│  ├─ config/                  # Config & constants
│  │  ├─ env.js
│  │  ├─ routes.js
│  │  └─ constants.js
│  │
│  ├─ lib/                     # 3rd-party wrappers (PRO MOVE)
│  │  ├─ axios.js              # Axios config
│  │  ├─ framer.js             # Framer presets
│  │  ├─ icons.js              # lucide-react exports
│  │  └─ clsx.js
│  │
│  ├─ assets/
│  │  ├─ images/
│  │  ├─ icons/
│  │  └─ fonts/
│  │
│  ├─ styles/
│  │  ├─ globals.css
│  │  ├─ tailwind.css
│  │  └─ themes.css
│  │
│  └─ tests/
│     ├─ unit/
│     ├─ integration/
│     └─ e2e/
│
├─ index.html
├─ package.json
├─ vite.config.js
├─ .env.example
└─ README.md
```


---

## ✅ Best Practices

* Keep components small and reusable
* Use `clsx` for conditional styling
* Use `framer-motion` for smooth animations
* Organize icons in a single file if reused often


---

## 🧑‍💻 Author

**Banty**
Creative Web Developer


---

## 📄 License

# This project is open-source and free to use.

> > > > > > > 7fe0ee377e3e934af1a0601f5ee38e2e706bfcf1


