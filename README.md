# PrepWise — AI-Powered Study Preparation Platform

PrepWise is a full-stack web application that helps Indian university students generate exam-ready study content using Gemini AI.

## Features

- **Descriptive Mode** — Generate structured 3, 5, 7, and 10-mark exam answers
- **Objective Mode** — Create MCQs, True/False, and Fill-in-the-blank quizzes with explanations
- **Seminar Mode** — Generate full seminar scripts with speaker cues and Q&A preparation
- JWT Authentication — Secure register/login with token-based sessions
- History — All generations saved and accessible anytime
- PDF Export — Export any output as a clean PDF
- Copy to Clipboard — One-click copy of any output

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite, React Router v6, Axios |
| Backend | Node.js, Express.js |
| Database | PostgreSQL + Prisma v5 |
| Auth | JWT + bcryptjs |
| AI | Google Gemini API (gemini-2.5-flash) |
| Deploy | Render (backend), Vercel / Render (frontend) |

## Project Structure
```
prepwise/
├── backend/
│   ├── prisma/schema.prisma
│   └── src/
│       ├── server.js
│       ├── routes/        # auth, generate, history
│       ├── middleware/    # JWT auth
│       └── lib/           # Prisma client
└── frontend/
    └── src/
        ├── pages/         # All page components
        ├── components/    # Navbar, ProtectedRoute
        ├── context/       # AuthContext
        └── api/           # Axios instance
```

## Local Setup

### Prerequisites
- Node.js v18+
- PostgreSQL
- Git

### Backend
```bash
cd backend
npm install
# Fill in backend/.env (see .env.example)
npx prisma migrate dev --name init
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# Fill in frontend/.env
npm run dev
```

### Environment Variables

**backend/.env**
```
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/prepwise
JWT_SECRET=your_jwt_secret
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000
```

## Deploy on Render

### Backend
1. Push code to GitHub
2. Create new Web Service on Render
3. Root directory: `backend`
4. Build command: `npm install && npx prisma generate`
5. Start command: `npm start`
6. Add all environment variables from `backend/.env`
7. Add a PostgreSQL database on Render and copy the connection string to `DATABASE_URL`
8. After deploy, run migration: use Render Shell → `npx prisma migrate deploy`

### Frontend
1. Create new Static Site on Render (or deploy to Vercel)
2. Root directory: `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Set `VITE_API_URL` to your deployed backend URL

## License

MIT
