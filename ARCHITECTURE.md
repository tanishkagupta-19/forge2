 # Architecture



 ## Agent Roles



 ### Hermes (Orchestrator / Brain)

 - Decomposes the challenge into tasks

 - Assigns tasks to OpenClaw via #agent-coder

 - Tracks progress and posts structured status updates

 - Maintains memory across sessions

 - Runs autonomously via cron



 ### OpenClaw (Coding Agent / Hands)

 - Receives tasks from Hermes in #agent-coder

 - Writes code, runs it locally

 - Reports back with: What I Did / What's Left / What Needs Your Call



 ## Slack Channel Scheme

| Channel | Purpose |

|---|---|

| #sprint-main | Human posts goals, Hermes plans and reports |

| #agent-coder | Hermes assigns tasks, OpenClaw executes |

| #agent-log | Raw agent activity and audit trail |



 ## Model Routing

| Agent | Model | Provider | Reason |

|---|---|---|---|

| Hermes | qwen2.5-coder | Ollama (local) | Unlimited, offline, planning |

| OpenClaw | gemini-2.5-flash | Google | Fast execution |



 ## Flow

Human → #sprint-main → Hermes plans → assigns to OpenClaw in #agent-coder → OpenClaw codes → reports back → Human approves

