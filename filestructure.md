# Slotify — Project Structure

Goal:
- Separate frontend, backend, and database folders
- Minimal Antigravity credit usage
- Scalable hackathon architecture
- Easy GitHub integration
- Easy Vercel deployment

---

# Root Structure

slotify/
│
├── frontend/
├── backend/
├── database/
├── .gitignore
├── README.md
└── package.json

---

# FRONTEND

Technology:
- Next.js
- React
- Tailwind CSS
- Framer Motion
- Axios

## Frontend Structure

frontend/
│
├── app/
│   ├── dashboard/
│   ├── booking/
│   ├── login/
│   ├── analytics/
│   └── layout.jsx
│
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── booking/
│   ├── auth/
│   └── analytics/
│
├── hooks/
│
├── lib/
│
├── public/
│
├── styles/
│
├── utils/
│
├── .env.local
│
├── package.json
│
└── next.config.js

---

# BACKEND

Technology:
- Next.js API Routes
- Supabase SDK
- Gemini API

## Backend Structure

backend/
│
├── app/
│   └── api/
│       ├── auth/
│       │   └── route.js
│       │
│       ├── meetings/
│       │   └── route.js
│       │
│       ├── slots/
│       │   └── route.js
│       │
│       ├── notifications/
│       │   └── route.js
│       │
│       └── ai/
│           └── route.js
│
├── services/
│   ├── meetingService.js
│   ├── slotService.js
│   ├── aiService.js
│   └── notificationService.js
│
├── lib/
│   ├── supabase.js
│   ├── gemini.js
│   └── jitsi.js
│
├── middleware/
│
├── utils/
│
├── .env.local
│
└── package.json

---

# DATABASE

Technology:
- Supabase
- PostgreSQL

## Database Structure

database/
│
├── schema/
│   ├── users.sql
│   ├── meetings.sql
│   └── availability.sql
│
├── migrations/
│
├── seed/
│
└── README.md

---

# GITHUB SETUP

## Initialize Git

Run in root folder:

git init

---

## Connect GitHub Repo

git remote add origin YOUR_GITHUB_REPO_LINK

---

## First Commit

git add .
git commit -m "Initial Slotify setup"
git branch -M main
git push -u origin main

---

# FRONTEND SETUP

## Create Frontend

mkdir frontend
cd frontend

npx create-next-app@latest .

---

## Install Frontend Dependencies

npm install tailwindcss @tailwindcss/postcss postcss

npm install axios framer-motion react-icons

npm install recharts

npm install react-hot-toast

npm install date-fns

---

# BACKEND SETUP

## Create Backend

cd ..
mkdir backend
cd backend

npx create-next-app@latest .

---

## Install Backend Dependencies

npm install @supabase/supabase-js

npm install dotenv

npm install cors

npm install uuid

npm install nodemailer

npm install @google/generative-ai

---

# DATABASE SETUP

## Create Database Folder

cd ..
mkdir database

mkdir database/schema
mkdir database/migrations
mkdir database/seed

---

# SUPABASE SETUP

Create project in:
Supabase

Get:
- Project URL
- Anon Key
- Service Role Key

---

# ENV FILES

## Frontend .env.local

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_BACKEND_URL=

---

## Backend .env.local

SUPABASE_URL=

SUPABASE_SERVICE_ROLE_KEY=

GEMINI_API_KEY=

EMAIL_USER=

EMAIL_PASS=

---

# RUNNING PROJECTS

## Frontend

cd frontend
npm run dev

Runs on:
localhost:3000

---

## Backend

cd backend
npm run dev

Runs on:
localhost:3001

---

# DEPLOYMENT

## Frontend
Deploy to:
Vercel

## Backend
Deploy to:
Vercel

## Database
Hosted on:
Supabase

---

# ANTIGRAVITY CREDIT OPTIMIZATION

## IMPORTANT

Always edit isolated folders only.

Examples:

Frontend changes:
ONLY OPEN:
frontend/components/

Backend changes:
ONLY OPEN:
backend/services/

Database changes:
ONLY OPEN:
database/schema/

---

# DO NOT

- Analyze full project
- Refactor everything together
- Open node_modules
- Open entire frontend/backend simultaneously

---

# BEST PRACTICE

Keep:
- UI
- APIs
- Database
- AI
all isolated.

This minimizes:
- token usage
- context overload
- Antigravity credits

---

# FINAL STACK

Frontend:
- Next.js
- React
- Tailwind CSS

Backend:
- Next.js API Routes

Database:
- Supabase PostgreSQL

AI:
- Gemini API

Video Meetings:
- Jitsi Meet

Deployment:
- Vercel

Version Control:
- GitHub