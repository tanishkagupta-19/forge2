# Forge 2 — Multi-Agent AI System

## App Description
This repository contains a full end-to-end multi-agent system built for the Forge 2 Edition 2 Qualifier. The agents (Hermes & OpenClaw) operate through a Slack workspace and have successfully built a full-stack Kanban board.

The app features a Laravel REST API with a SQLite database backend, and a React (Vite) frontend. It supports creating boards, lists, and cards, assigning coloured tags, assigning members to cards, and setting due dates with visual overdue flags.

## Run Instructions

### 1. Agents & Services
1. Start Ollama: (runs as a background service by default)
2. Start OpenClaw: `openclaw gateway`
3. Start Hermes: `hermes`

### 2. Backend (Laravel API)
```bash
cd backend
copy .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
*The API will run on http://127.0.0.1:8000*

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*The UI will run on http://localhost:5173 (or another available port)*

## Live URL
Frontend deployed to Vercel: https://frontend-three-jade-48.vercel.app/
Backend deployed to Render: (Running locally - see instructions above for judging)

## Model Selection & Rationale
We chose a routing strategy that maximizes performance while staying on the 100% free tier.
- **Hermes (Brain):** `gemini-3.1-flash-lite` (via Gemini free tier). It has a massive context window and fast reasoning, making it ideal for the orchestrator role which requires memory retention across complex sessions.
- **OpenClaw (Hands):** `qwen2.5-coder` (via local Ollama). Since coding requires frequent, small, iterative generation loops without rate limit interruptions, we ran this completely locally. Unlimited execution is key.

## Agent Loop Verification
You can see our agent activity loops inside the `agent-log.md` and the Slack screenshots inside the `evidence/` folder.
