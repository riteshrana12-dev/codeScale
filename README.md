# CodeScale

<p align="center">
  <img src="assets/demo.gif" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/riteshrana12-dev/codeScale?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/riteshrana12-dev/codeScale?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Live-Demo-black?style=for-the-badge&logo=vercel" />
</p>

---

## Overview

CodeScale is a full-stack coding judge platform with an in-browser editor, sandboxed execution engine, AI assistance, and analytics dashboard. It simulates real interview environments with production-grade architecture.

---

## Live Demo

https://code-scale.vercel.app

---

## Features

### Execution Engine
- Custom sandboxed runner (no Judge0)
- Uses child_process
- 9-second timeout protection
- Handles hidden test cases
- Concurrent-safe execution
- Automatic cleanup after execution

### AI Assistant
- Powered by Groq (LLaMA 3)
- Provides hints (not direct answers)
- Multi-turn conversation memory
- DSA-focused guidance

### Dashboard
- Daily streak tracking
- Activity heatmap
- Leaderboard rankings
- Submission analytics

### Problem System
- 30 DSA problems (Easy / Medium / Hard)
- Topic-based filtering
- Submission history
- Code + verdict tracking

---

## System Architecture

<p align="center">
  <img src="assets/architecture.svg" width="90%" />
</p>

---

## Execution Pipeline

1. User submits code  
2. Code wrapped with template  
3. Runs in isolated process  
4. Output parsed and validated  
5. Result stored in database  
6. Verdict returned (Accepted / Wrong / TLE)  

---

## Tech Stack

### Frontend
- React 19
- Vite 8
- TailwindCSS
- Framer Motion
- Monaco Editor

### Backend
- Node.js
- Express 5
- MongoDB Atlas
- Mongoose

### Other
- Groq AI (LLaMA 3)
- JWT Authentication
- Vercel (Frontend)
- Render (Backend)

---

## Screenshots

<p align="center">
  <img src="assets/editor.png" width="32%" />
  <img src="assets/dashboard.png" width="32%" />
  <img src="assets/result.png" width="32%" />
</p>

---

## Quick Start

    git clone https://github.com/riteshrana12-dev/codeScale.git
    cd CodeScale

### Backend

    cd backend
    npm install
    cp config/.env.example config/.env
    npm run dev

### Frontend

    cd frontend
    npm install
    npm run dev

---

## Environment Variables

    DB_URI=your_db_uri
    JWT_SECRET_USER=your_secret
    JWT_SECRET_ADMIN=your_secret
    ADMIN_EMAIL=admin@email.com
    ADMIN_CODE=admin_code
    GROQ_API_KEY=your_key
    FRONTEND_URL=http://localhost:5173

---

## Project Structure

    CodeScale/
    ├── backend/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   └── server.js
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── pages/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── services/
    │   │   ├── api/
    │   │   └── context/
    │
    └── assets/

---

## API Overview

- Auth → signup / login  
- Problems → fetch / view  
- Submission → run / submit  
- Dashboard → analytics  
- AI → chatbot  

---

## Deployment

### Frontend (Vercel)

    cd frontend
    vercel --prod

### Backend (Render)

    Connect GitHub repository  
    Set root directory: backend  
    Build: npm install  
    Start: node server.js  
    Add environment variables  

---

## Contributing

    git checkout -b feat/feature
    git commit -m "feat: add feature"
    git push origin feat/feature

---

## Author

Ritesh Rana  
https://github.com/riteshrana12-dev

---

## License

ISC License

---

<p align="center">
  <strong>Star this repository if you find it useful</strong>
</p>
