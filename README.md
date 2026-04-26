<div align="center">

```
 >_ CodeScale
```

# ⚡ CodeScale

### *Code. Execute. Improve.*

**A focused coding judge platform for developers — solve real algorithmic problems, get instant verdicts, and track your growth.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-code--scale.vercel.app-00ff88?style=for-the-badge)](https://code-scale.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](./LICENSE)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)

</div>

---

## 📖 What is CodeScale?

**CodeScale** is a full-stack competitive programming judge platform inspired by LeetCode — built from scratch. It lets developers practice Data Structures & Algorithms problems in **JavaScript and Python**, get real-time code execution results, receive AI-powered DSA guidance, and track their growth through a personal dashboard.

It's designed to be clean, focused, and distraction-free. No bloat — just you and the problem.

> 🟢 **10 Easy · 10 Medium · 10 Hard** problems available in Open Beta

---

## ✨ Feature Overview

### 🧩 Problem Solving Environment
- Monaco Editor (same as VS Code) embedded in-browser
- Multi-language support: **JavaScript** and **Python**
- **Run Code** — test against sample cases instantly
- **Submit** — judge against all hidden test cases with a pass/fail verdict
- Problem descriptions with examples, constraints, and notes

### 🖊️ Dry Run Board
- A built-in **freehand drawing canvas** for sketching out your approach before coding
- Color picker + pen size controls
- Great for thinking through arrays, trees, and graphs visually

### 🤖 CodeScale Assistant (AI Chatbot)
- Powered by **Groq + LLaMA 3.1** (8B Instant)
- DSA-only scoped AI — it only helps with algorithm approaches, complexity, and patterns
- It will **never give you the full solution** — it guides, not spoils
- Context-aware chat with multi-turn conversation memory

### 📊 Personal Dashboard
- Total problems solved (Easy / Medium / Hard breakdown)
- Points system (Easy = 10pts, Medium = 20pts, Hard = 30pts)
- **Day Streak** tracker with 🔥 flame indicator
- **Activity Heatmap** — GitHub-style contribution graph
- Submission result breakdown with acceptance rate
- **Leaderboard** ranking among all users

### 📁 Submission History
- Full history of all past submissions
- View source code of each submission
- Filter by problem, language, and verdict

### 👤 Account Settings
- Update name and email
- Change password securely (bcrypt-hashed)
- Public bio for community profile

### 🔒 Authentication System
- JWT-based authentication with HTTP-only cookies
- Secure sign-up / sign-in with Zod validation
- Admin panel for problem and platform management

---

## 🗂️ Project Structure

```
CodeScale/
├── backend/
│   ├── config/
│   │   ├── db.js                      # MongoDB connection
│   │   └── .env.example               # Environment variable template
│   ├── controllers/
│   │   ├── auth.controller.js         # Sign in / Sign up logic
│   │   ├── problems.controller.js     # Fetch problems & test cases
│   │   ├── user_submission.controller.js  # Submit & run code
│   │   ├── chatbot.controller.js      # Groq AI chatbot
│   │   ├── user_analytics.controller.js   # Dashboard stats
│   │   ├── user_history.controller.js     # Submission history
│   │   ├── submissionDetail.controller.js # View single submission
│   │   ├── admin.controller.js        # Admin operations
│   │   └── plateform_analytics.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js         # JWT verification
│   │   └── admin.middleware.js        # Admin-only guard
│   ├── models/
│   │   ├── user.model.js              # User schema
│   │   ├── problems.model.js          # Problem + test cases schema
│   │   └── submission.model.js        # Submission records schema
│   ├── routes/                        # Express route definitions
│   ├── services/
│   │   └── executionEngine.js         # Code execution engine (Node/Python)
│   ├── utils/
│   │   ├── template.js                # Code wrapper templates
│   │   └── user_statsHelper.js        # Stats calculation helpers
│   └── server.js                      # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx           # Landing page
│   │   │   ├── ProblemsList.jsx       # Problems grid with filters
│   │   │   ├── ProblemPage.jsx        # Editor + problem view
│   │   │   ├── SubmissionHistory.jsx  # All past submissions
│   │   │   ├── SubmissionDetail.jsx   # Single submission view
│   │   │   └── user/
│   │   │       ├── UserDashboard.jsx  # Dashboard with stats
│   │   │       └── MyAccount.jsx      # Account settings
│   │   ├── components/
│   │   │   ├── codeEditor/            # Monaco, run, submit, dry-run
│   │   │   ├── chatbot/               # AI assistant UI
│   │   │   ├── charts/                # Dashboard charts
│   │   │   ├── ActivityMap.jsx        # Heatmap component
│   │   │   ├── Leaderboard.jsx        # Rankings
│   │   │   └── FilterProblem.jsx      # Topic-based filters
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── services/                  # API service functions
│   │   ├── api/api.js                 # Axios instance
│   │   └── context/ProblemContext.jsx # Global problem state
│   └── vite.config.js
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, TailwindCSS 4, Framer Motion |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Drawing Canvas** | `react-sketch-canvas` |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB (Atlas on AWS) + Mongoose |
| **Authentication** | JWT + bcrypt + HTTP-only cookies |
| **AI Chatbot** | Groq SDK (LLaMA 3.1 8B Instant) |
| **Code Execution** | Custom sandboxed Node.js / Python engine |
| **Validation** | Zod |
| **Frontend Deploy** | Vercel |
| **Backend Deploy** | Render |

---

## 🚀 Getting Started (Local Setup)

### Prerequisites

- Node.js `>= 18`
- Python `>= 3.8` (for Python code execution)
- MongoDB Atlas account (or local MongoDB)
- Groq API key ([get one free](https://console.groq.com))

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CodeScale.git
cd CodeScale
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create your environment file:

```bash
cp config/.env.example config/.env
```

Open `config/.env` and fill in your values:

```env
# MongoDB Connection (Atlas recommended)
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority

# JWT Secrets (use long random strings)
JWT_SECRET_USER=your_user_jwt_secret
JWT_SECRET_ADMIN=your_admin_jwt_secret

# Admin Bootstrap Credentials
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_CODE=your_admin_secret_code

# Groq API Key (for AI chatbot)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev       # Development (nodemon)
# or
npm start         # Production
```

Backend runs on `http://localhost:3000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create frontend environment file:

```bash
# frontend/.env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔌 API Reference

All routes are prefixed with `/api/v1/`

### Auth Routes — `/api/v1/auth`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signup` | Register a new user |
| `POST` | `/signin` | Login and receive JWT cookie |
| `POST` | `/signout` | Clear session |

### Problems Routes — `/api/v1/problems`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Fetch all problems |
| `GET` | `/:id` | Get single problem by ID |

### Submission Routes — `/api/v1/submission`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/run` | Run code against sample test cases |
| `POST` | `/submit` | Submit and judge against all test cases |

### User Routes — `/api/v1/user`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/history` | Get submission history |
| `GET` | `/history/:id` | Get single submission detail |
| `PUT` | `/update` | Update account settings |

### Analytics — `/api/v1/analytics`
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/dashboard` | Get dashboard stats (points, streak, etc.) |

### Chatbot — `/api/v1/chatbot`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/ask` | Send message to AI assistant |

### Admin — `/api/v1/admin`
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/problem` | Add a new problem (admin only) |
| `DELETE` | `/problem/:id` | Remove a problem (admin only) |

---

## ⚙️ How the Code Execution Engine Works

One of the core pieces of CodeScale is its **custom sandboxed execution engine**.

```
User submits code
       │
       ▼
executionEngine.js receives code + language + problem
       │
       ├─ Detects language (JS or Python)
       ├─ Wraps user code with a template (handles I/O)
       ├─ Writes to a unique temp file (prevents collisions)
       │
       ▼
execSync(`node tempfile.cjs` or `python tempfile.py`)
  ├─ stdin  → JSON-encoded test case input
  ├─ stdout → JSON-encoded user output
  ├─ timeout → 9 seconds (prevents infinite loops)
  └─ isolated env → no access to server secrets
       │
       ▼
Compare output vs expected output for each test case
       │
       ▼
Return: passed/failed per test case + overall verdict
       │
       ▼
Cleanup temp file
```

> The engine uses `Date.now() + Math.random()` for temp filenames to safely handle concurrent users.

---

## 🌐 Deployment

### Frontend → Vercel
```
Live URL: https://code-scale.vercel.app
Branch:   main
Framework: Vite (React)
```

### Backend → Render
```
Type:     Web Service
Build:    npm install
Start:    node server.js
```

Set all environment variables from `.env.example` in your Render dashboard under **Environment**.

---

## 📸 Screenshots

| Landing Page | Problems List |
|---|---|
| *(Code. Execute. Improve.)* | *(Filter by topic + difficulty)* |

| Problem Editor + AI Assistant | Dashboard |
|---|---|
| *(Monaco editor + DSA chatbot)* | *(Stats, streak, heatmap, leaderboard)* |

| Dry Run Board | Submission History |
|---|---|
| *(Freehand drawing canvas)* | *(Track all past solutions)* |

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to suggest a feature:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **Ritesh Rana**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/your-username)

*If you found this useful, consider giving it a ⭐ on GitHub!*

</div>
