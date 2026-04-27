

<div align="center">

<!-- ANIMATED HEADER -->
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=40&pause=1000&color=00FF88&center=true&vCenter=true&width=600&height=80&lines=%3E_%20CodeScale;Code.+Execute.+Improve.;A+DSA+Judge+Platform" alt="CodeScale Typing SVG" />

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-CodeScale-00FF88?style=for-the-badge&labelColor=0d1117)](https://code-scale.vercel.app)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](./LICENSE)

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=1500&color=888888&center=true&vCenter=true&width=700&lines=A+focused+coding+judge+for+developers;Solve+real+algorithmic+problems;Get+instant+verdicts+%E2%80%A2+Track+your+growth" alt="Subtitle typing" />

</div>

---

## 📸 Screenshots

|              Home Page               |                Problems List                 |               Code Editor                |
| :----------------------------------: | :------------------------------------------: | :--------------------------------------: |
| ![Home](/assets/screenshots/home.png) | ![Problems](assets/screenshots/problems.png) | ![Editor](assets/screenshots/editor.png) |

|                   Dashboard                    |                    Submissions                     |                  Account                   |
| :--------------------------------------------: | :------------------------------------------------: | :----------------------------------------: |
| ![Dashboard](assets/screenshots/dashboard.png) | ![Submissions](assets/screenshots/submissions.png) | ![Account](assets/screenshots/account.png) |

---

## 🚀 What is CodeScale?

**CodeScale** is a full-stack, focused coding judge platform built for developers who want to sharpen their **Data Structures & Algorithms** skills. Think of it as a self-hosted, lightweight LeetCode — with a built-in AI assistant, a dry-run canvas, real code execution, and a beautiful dashboard to track your growth.

The platform currently supports **JavaScript** and **Python**, with **30 curated problems** spanning Easy, Medium, and Hard difficulty levels.

---

## ✨ Key Features

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=2000&color=00FF88&width=500&lines=Everything+you+need+to+level+up+your+DSA+game" alt="features" />

| Feature                     | Description                                                                                                                   |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 🧩 **Problem Library**      | 30 problems (10 Easy / 10 Medium / 10 Hard) with topic filters like Arrays, Trees, DP, Graphs and more                        |
| ⚡ **Live Code Execution**  | Write JavaScript or Python in a Monaco editor and run code with real test cases, getting instant verdicts                     |
| 🤖 **AI Chatbot Assistant** | Built-in DSA-only AI (powered by Groq) that guides you on approach, complexity, and strategy — without giving away the answer |
| 🖊️ **Dry Run Canvas**       | A freehand drawing canvas to sketch arrays, trees, or graphs before writing a single line of code                             |
| 📊 **User Dashboard**       | Points, streaks, activity heatmap, submission breakdown, and a leaderboard — all in one place                                 |
| 📜 **Submission History**   | Full history of every accepted/rejected submission with source code review                                                    |
| 🔐 **Auth System**          | JWT-based authentication with secure cookie storage, bcrypt password hashing, and Zod validation                              |
| 👤 **Account Management**   | Update name, email, password, and public bio from your account settings page                                                  |
| 🛡️ **Admin Panel**          | Protected admin routes to manage problems and platform analytics                                                              |
| 🏆 **Leaderboard**          | Global rankings by total points earned across all accepted problems                                                           |

---

## 🗂️ Folder Structure

```
CodeScale/
├── 📁 backend/
│   ├── 📁 config/
│   │   ├── db.js                    # MongoDB connection
│   │   ├── .env                     # Environment variables
│   │   └── .env.example             # Env template
│   │
│   ├── 📁 controllers/
│   │   ├── auth.controller.js        # Sign up / Sign in / Sign out
│   │   ├── user.controller.js        # Profile & account updates
│   │   ├── problems.controller.js    # Fetch problems & details
│   │   ├── user_submission.controller.js  # Run & submit code
│   │   ├── user_history.controller.js     # Submission history
│   │   ├── submissionDetail.controller.js # Single submission detail
│   │   ├── user_analytics.controller.js   # Dashboard stats & heatmap
│   │   ├── chatbot.controller.js     # Groq AI chatbot integration
│   │   ├── admin.controller.js       # Admin problem management
│   │   └── plateform_analytics.controller.js # Platform-wide stats
│   │
│   ├── 📁 middleware/
│   │   ├── auth.middleware.js        # JWT verification
│   │   └── admin.middleware.js       # Admin role guard
│   │
│   ├── 📁 models/
│   │   ├── user.model.js             # User schema (name, email, stats)
│   │   ├── problems.model.js         # Problem schema (title, difficulty, tags)
│   │   ├── submission.model.js       # Submission schema (code, verdict)
│   │   └── avatar/                  # Default avatar assets
│   │
│   ├── 📁 routes/
│   │   ├── auth.route.js
│   │   ├── problems.route.js
│   │   ├── user.route.js
│   │   ├── user_submission.route.js
│   │   ├── user_history.route.js
│   │   ├── user_analytics.route.js
│   │   ├── chatbot.route.js
│   │   └── admin.route.js
│   │
│   ├── 📁 services/
│   │   └── executionEngine.js       # Code execution sandbox (JS & Python)
│   │
│   ├── 📁 utils/
│   │   ├── template.js              # Language code templates
│   │   └── user_statsHelper.js      # Points & streak calculation
│   │
│   ├── 📁 temp/                     # Temp files for code execution (auto-cleaned)
│   └── server.js                    # Express app entry point
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 api/
│   │   │   └── api.js               # Axios base instance
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── 📁 codeEditor/
│   │   │   │   ├── CodeEditor.jsx         # Monaco editor wrapper
│   │   │   │   ├── DryRunCanvas.jsx       # Freehand drawing canvas
│   │   │   │   ├── ProblemDescription.jsx # Problem sidebar
│   │   │   │   ├── Language.jsx           # Language switcher
│   │   │   │   ├── RunCodeButton.jsx
│   │   │   │   └── SubmitButton.jsx
│   │   │   │
│   │   │   ├── 📁 chatbot/
│   │   │   │   └── Chatbot.jsx            # AI assistant panel
│   │   │   │
│   │   │   ├── 📁 charts/
│   │   │   │   ├── StatsOverview.jsx      # Points & difficulty breakdown
│   │   │   │   ├── SubmissionChart.jsx    # Submission result chart
│   │   │   │   └── DashboardSkeleton.jsx  # Loading skeleton
│   │   │   │
│   │   │   ├── ActivityMap.jsx            # GitHub-style activity heatmap
│   │   │   ├── FilterProblem.jsx          # Tag/difficulty filter UI
│   │   │   ├── Leaderboard.jsx            # Rankings widget
│   │   │   ├── RecentSubmission.jsx       # Recent activity feed
│   │   │   ├── Navbar.jsx
│   │   │   └── HamburgerMenu.jsx
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── HomePage.jsx               # Landing page
│   │   │   ├── ProblemsList.jsx           # All problems grid/list view
│   │   │   ├── ProblemPage.jsx            # Individual problem + editor
│   │   │   ├── SubmissionHistory.jsx      # Full submission log
│   │   │   ├── SubmissionDetail.jsx       # Single submission view
│   │   │   ├── 📁 auth/
│   │   │   │   ├── SignIn.jsx
│   │   │   │   └── SignUp.jsx
│   │   │   └── 📁 user/
│   │   │       ├── UserDashboard.jsx      # Personal stats dashboard
│   │   │       └── MyAccount.jsx          # Account settings
│   │   │
│   │   ├── 📁 hooks/
│   │   │   ├── signIn.js
│   │   │   ├── signUp.js
│   │   │   └── useChatBot.js
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── heatMap.js             # Heatmap data formatter
│   │   │   ├── signIn.service.js
│   │   │   └── signUp.service.js
│   │   │
│   │   ├── 📁 context/
│   │   │   └── ProblemContext.jsx     # Problem state context
│   │   │
│   │   ├── App.jsx
│   │   ├── AppLayout.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── LICENSE
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

| Technology                                                                                                             | Purpose                     |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| ![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)                          | UI framework                |
| ![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat&logo=vite&logoColor=white)                               | Build tool & dev server     |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS_4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)         | Utility-first styling       |
| ![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat&logo=react-router&logoColor=white)       | Client-side routing         |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)             | Animations & transitions    |
| ![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-007ACC?style=flat&logo=visual-studio-code&logoColor=white) | VS Code-quality code editor |
| ![React Sketch Canvas](https://img.shields.io/badge/Sketch_Canvas-FF6B6B?style=flat)                                   | Dry run drawing canvas      |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)                              | HTTP client                 |

### Backend

| Technology                                                                                         | Purpose                    |
| -------------------------------------------------------------------------------------------------- | -------------------------- |
| ![Express](https://img.shields.io/badge/Express_5-000000?style=flat&logo=express&logoColor=white)  | REST API framework         |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)  | Server runtime             |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)    | Database                   |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white) | ODM for MongoDB            |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)      | Authentication tokens      |
| ![Bcrypt](https://img.shields.io/badge/Bcrypt-6B46C1?style=flat)                                   | Password hashing           |
| ![Zod](https://img.shields.io/badge/Zod-3068B7?style=flat)                                         | Input validation           |
| ![Groq SDK](https://img.shields.io/badge/Groq_AI-FF4500?style=flat)                                | AI chatbot (DSA assistant) |
| ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon&logoColor=white)    | Dev auto-restart           |

### Deployment

| Service                                                                                      | Role             |
| -------------------------------------------------------------------------------------------- | ---------------- |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) | Frontend hosting |
| ![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white) | Backend hosting  |

---

## 🔌 API Overview

```
/api/v1/auth        → Sign up, Sign in, Sign out
/api/v1/problems    → Get all problems, get problem by ID
/api/v1/submission  → Run code, submit solution
/api/v1/user        → Profile, account update, submission history
/api/v1/analytics   → Dashboard stats, activity heatmap, leaderboard
/api/v1/chatbot     → AI DSA assistant (Groq-powered)
/api/v1/admin       → Admin problem management & platform analytics
```

---

## 🏁 Getting Started Locally

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- A [Groq API key](https://console.groq.com)

### 1. Clone the repo

```bash
git clone https://github.com/riteshrana12-dev/codeScale.git
cd CodeScale
```

### 2. Setup Backend

```bash
cd backend
cp config/.env.example config/.env
# Fill in your MongoDB URI, JWT secret, and Groq API key in config/.env
npm install
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
# Create .env with your backend URL
echo "VITE_API_URL=http://localhost:3000" > .env
npm install
npm run dev
```

### 4. Open in browser

```
Frontend → http://localhost:5173
Backend  → http://localhost:3000
```

---

## 🌐 Live Deployment

|                    | URL                                                            |
| ------------------ | -------------------------------------------------------------- |
| 🖥️ **Frontend**    | [https://code-scale.vercel.app](https://code-scale.vercel.app) |
| ⚙️ **Backend API** | Hosted on Render (connected internally)                        |

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=1000&color=00FF88&center=true&vCenter=true&width=500&lines=Built+with+%E2%9D%A4%EF%B8%8F+by+Ritesh+Rana;Happy+Coding!+%F0%9F%9A%80" alt="footer" />

<br/>

⭐ **If you found this project helpful, consider giving it a star!** ⭐

# </div>
