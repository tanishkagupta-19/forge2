\# Forge 2 — Multi-Agent AI System



\## Architecture

\- \*\*Hermes\*\* (Brain/Orchestrator): Plans, decomposes tasks, manages memory, assigns work to OpenClaw via Slack

\- \*\*OpenClaw\*\* (Hands/Coding Agent): Receives tasks, writes code, runs it, reports back in Slack



\## Slack Channels

\- `#sprint-main` — Human posts goals, Hermes posts plans and status

\- `#agent-coder` — Hermes assigns coding tasks, OpenClaw works and reports here

\- `#agent-log` — Raw agent activity and autonomous run output



\## Model Routing

\- Hermes (planning): `qwen2.5-coder` via Ollama (local, unlimited)

\- OpenClaw (execution): `google/gemini-2.5-flash`



\## Stack

\- Hermes Agent v0.17.0

\- OpenClaw 2026.6.10

\- Slack (Socket Mode)

\- Ollama (local)



\## Run Instructions

1\. Start Ollama: runs as background service

2\. Start OpenClaw: `openclaw gateway`

3\. Start Hermes: `hermes`

4\. Post goals in `#sprint-main` mentioning `@OpenClaw`

