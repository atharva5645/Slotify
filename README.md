<div align="center">

# ✨ Slotify

### 🚀 Autonomous AI-Powered Meeting Orchestration & Dynamic Scheduling Platform

<p align="center">
  <a href="https://slotify-6c50f.web.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-slotify--6c50f.web.app-00c7b7?style=for-the-badge&logo=firebase&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/atharva5645/Slotify" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-atharva5645%2FSlotify-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Google_Gemini_AI-Powered-8E75B2?style=flat-square&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Firebase-Firestore_%26_Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License" />
</p>

<p align="center">
  <b>Eliminate meeting scheduling friction forever.</b> Slotify combines Google Gemini AI with intelligent backend heuristics to automatically detect availability, enforce mandatory attendees, resolve conflicts, and track task accountability.
</p>

<p align="center">
  <a href="https://slotify-6c50f.web.app"><strong>Explore Live Web App »</strong></a>
  <br />
  <br />
  <a href="#-key-features">Key Features</a> •
  <a href="#-live-deployment">Live Demo</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a>
</p>

---

</div>

## 🌐 Live Deployment

| Environment | Direct URL | Status |
| :--- | :--- | :--- |
| **Production Web App** | [https://slotify-6c50f.web.app](https://slotify-6c50f.web.app) | ![Active](https://img.shields.io/badge/Status-Online-success?style=flat-square) |

> 💡 **Try it now**: Access the production build directly from your browser with Google Authentication or guest sign-in.

---

## ⚡ Key Features

<table>
  <tr>
    <td width="50%">
      <h3>🤖 Autonomous AI Orchestration</h3>
      <p>Powered by <b>Google Gemini AI</b> to negotiate complex participant schedules, suggest optimal slots, and draft intelligent meeting context automatically.</p>
    </td>
    <td width="50%">
      <h3>🛡️ Conflict-Free Availability Engine</h3>
      <p>Backend matrix calculation engine detects busy/free windows across all invited participants, preventing double bookings.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>👥 Mandatory Attendee Enforcement</h3>
      <p>Intelligently validates essential stakeholder presence, refusing slots where critical decision-makers are unavailable.</p>
    </td>
    <td width="50%">
      <h3>📈 Visual Analytics & Insights</h3>
      <p>Interactive metric dashboards built with <b>Recharts</b> to track meeting frequency, team time allocation, and scheduling trends.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>✅ Task Accountability Tracking</h3>
      <p>Assign tasks, set priorities, track real-time progress, and directly tie deliverables to meeting agendas.</p>
    </td>
    <td width="50%">
      <h3>📅 Unified Calendar & Video Sync</h3>
      <p>Responsive, interactive monthly/weekly calendar view with integrated Zoom video call link creation and status updates.</p>
    </td>
  </tr>
</table>

---

## 🏗️ Architecture

Slotify is structured as a high-performance **monorepo** separating presentation logic from intelligent backend business services:

```text
                                  ┌───────────────────────────┐
                                  │      Client Browser       │
                                  └─────────────┬─────────────┘
                                                │
                                                ▼
                                  ┌───────────────────────────┐
                                  │  Next.js Frontend (React) │
                                  │  Tailwind v4 / Framer UI  │
                                  └─────────────┬─────────────┘
                                                │
                                    API Layer / Route Handlers
                                                │
                                                ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 Backend Service Engines                                │
│                                                                                        │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐ │
│  │   Gemini AI Service     │  │   Availability Engine   │  │   Conflict Detector     │ │
│  └─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘ │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐ │
│  │   Slot Optimizer        │  │   Mandatory Validator   │  │   Task Engine           │ │
│  └─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘ │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
                         ┌─────────────────────────────────────┐
                         │   Google Firebase Firestore & Auth  │
                         └─────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

### Backend & Cloud
- **Runtime:** Node.js / Next.js Server Route Handlers
- **AI Core:** [Google Gemini API](https://ai.google.dev/) (`@google/generative-ai`)
- **Database & Auth:** Firebase Firestore & Firebase Authentication (`firebase-admin`)
- **Hosting:** Firebase Hosting with custom rewrites and CDN caching

---

## 📂 Project Structure

```bash
Slotify/
├── frontend/                     # Next.js presentation application
│   ├── app/                      # App router (dashboard, calendar, tasks, admin, etc.)
│   ├── components/               # Modular UI components (Header, Sidebar, Modals)
│   ├── lib/                      # Firebase client SDK initialization & helpers
│   ├── public/                   # Static icons and assets
│   └── firebase.json             # Firebase Hosting deployment config
├── backend/                      # Scheduling intelligence engine
│   ├── app/api/                  # RESTful endpoints (meetings, availability, profiles)
│   └── lib/                      # Core business logic services
│       ├── ai/                   # Google Gemini AI meeting orchestrator
│       ├── scheduler/            # Availability, conflicts, and slot optimization
│       └── tasks/                # Task management & progress services
└── package.json                  # Root monorepo orchestrator
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Firebase Account**: with a configured project

### 2. Clone the Repository
```bash
git clone https://github.com/atharva5645/Slotify.git
cd Slotify
```

### 3. Install Dependencies
```bash
# Install root, frontend, and backend packages
npm install
npm --prefix frontend install
npm --prefix backend install
```

### 4. Configure Environment Variables
Create a `.env.local` file inside `frontend/` and `backend/`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# AI Engine
GEMINI_API_KEY=your_google_gemini_api_key
```

### 5. Launch Local Development
```bash
# Concurrently runs frontend (http://localhost:3000) & backend (http://localhost:3001)
npm run dev
```

---

## 🤝 Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/atharva5645">atharva5645</a></sub>
</div>
