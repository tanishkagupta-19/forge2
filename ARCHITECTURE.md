# Forge 2 — Architecture Document

## System Components
This build implements a multi-agent orchestrated workflow producing a full stack Kanban board.

### 1. Agents
- **Hermes (Brain):** The orchestrator. Resides at `D:\hermes` (config: `config.yaml`) and uses persistent memory to retain project context across sessions. It listens to Slack `#sprint-main` and uses the `status-report` skill to track OpenClaw's output. Model: `gemini-3.1-flash-lite` (via Gemini free tier, secondary account).
- **OpenClaw (Hands):** The coding agent. Receives commands from Hermes via Slack `#agent-coder` and executes shell/code commands locally. Model: `google/gemini-2.5-flash` (via Gemini free tier).

### 2. Frontend (React/Vite)
- **Framework:** React 18 + Vite
- **Styling:** Custom CSS with a dark glassmorphism theme, CSS variables for theming, and modern typography (Inter).
- **State Management:** Local React state, integrated with Axios for REST API communication.
- **Features:** Board management, column/list arrangement, card creation/editing, drag-and-drop movement across lists, tag assignment, member assignment, and visual overdue flags.

### 3. Backend (Laravel)
- **Framework:** Laravel 11.x
- **Database:** SQLite (for zero-config local portability).
- **Schema:**
  - `boards`: Primary project container.
  - `card_lists`: Columns within boards.
  - `cards`: Task items within lists.
  - `tags` / `card_tag`: Many-to-many relationship for categorization.
  - `members` / `card_member`: Many-to-many relationship for assignment.
- **API:** RESTful endpoints for all core Kanban operations.

## Slack Channel Scheme
| Channel | Purpose |
|---|---|
| #sprint-main | Human posts goals, Hermes plans and reports |
| #agent-coder | Hermes assigns tasks, OpenClaw executes |
| #agent-log | Raw agent activity and audit trail |

## Event Loop (How it works)
1. **Trigger:** Human types `/goal "build kanban"` in Slack `#sprint-main`.
2. **Plan:** Hermes parses request, plans execution, and pings OpenClaw in `#agent-coder`.
3. **Execute:** OpenClaw writes code, runs terminal commands (e.g. `npm run dev`, `php artisan serve`).
4. **Report:** OpenClaw confirms execution via `status-report` skill, posting: What I Did / What's Left / What Needs Your Call.
5. **Verify:** Hermes updates the `#sprint-main` thread that the step is done.

## Flow
Human → #sprint-main → Hermes plans → assigns to OpenClaw in #agent-coder → OpenClaw codes → reports back → Human approves

## Security & Constraints
- **Zero Paid APIs:** Only free-tier models were used.
- **Secret Management:** `.env` files are used for all keys. `evidence/` contains stripped configs to prove setup without exposing keys.