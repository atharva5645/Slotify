IMPORTANT:
Before making ANY changes, first read and strictly follow:

docs/architecture.md

OR

architecture.md

This file is the SOURCE OF TRUTH for:
- backend structure
- AI orchestration flow
- scheduling engine architecture
- implementation rules
- folder hierarchy

====================================================
TASK
====================================================

Integrate Gemini AI into the existing Slotify project to create a REAL-TIME dynamic AI negotiation and autonomous scheduling system.

IMPORTANT:
- Existing frontend already exists
- DO NOT redesign UI
- DO NOT recreate components/pages
- ONLY implement AI functionality
- Work incrementally
- Modify only relevant files
- Avoid scanning the full project repeatedly

====================================================
CORE REQUIREMENT
====================================================

The AI negotiation system must use REAL employee names and REAL scheduling data dynamically from Firebase.

DO NOT hardcode names like:
- Rahul
- Priya
- Team Lead

The system must dynamically:
- fetch employee names
- fetch employee availability
- fetch meeting conflicts
- fetch mandatory members
- generate AI coordination messages based on REAL DATA

====================================================
EXAMPLE BEHAVIOR
====================================================

If users in Firebase are:
- Alex
- John
- Sarah

Then Gemini should dynamically generate:

"Alex is unavailable at 11 AM due to an overlapping meeting."

"Sarah is available at 3 PM and recommends this slot."

"All mandatory members are available for the selected slot."

The AI responses must always reflect actual live project data.

====================================================
GEMINI RESPONSIBILITY
====================================================

Gemini should ONLY generate:
- AI coordination conversations
- scheduling explanations
- negotiation summaries
- orchestration messages

Gemini should NOT handle:
- database queries
- scheduling calculations
- conflict detection
- slot optimization

Those must remain inside backend scheduling services.

====================================================
DATA FLOW
====================================================

Firebase Data
      ↓
Scheduling Engine
      ↓
Meeting Orchestrator
      ↓
Gemini Prompt Builder
      ↓
Gemini AI Response
      ↓
Frontend AI Conversation UI

====================================================
CREATE DYNAMIC PROMPT BUILDER
====================================================

Create ONLY if missing:

lib/ai/promptBuilder.js

Responsibilities:
- collect real scheduling data
- collect real employee names
- collect availability results
- build structured Gemini prompts dynamically

====================================================
CREATE GEMINI SERVICE
====================================================

Create ONLY if missing:

lib/ai/geminiService.js

Use:
gemini-2.5-flash

Responsibilities:
- initialize Gemini client
- send dynamic prompts
- return AI-generated responses
- handle errors safely

====================================================
AI NEGOTIATION FLOW
====================================================

When admin clicks:
[ AI Auto Schedule ]

System should:

1. Fetch real employee data from Firebase
2. Check availability
3. Detect conflicts
4. Validate core members
5. Optimize best slot
6. Build dynamic Gemini prompt
7. Gemini generates human-like AI coordination messages
8. Show live AI negotiation in frontend
9. Finalize meeting automatically
10. Send notifications

====================================================
FRONTEND REQUIREMENTS
====================================================

Display:
- live AI negotiation updates
- dynamic employee discussions
- scheduling analysis
- optimization decisions
- final AI scheduling explanation

The UI should feel like:
- autonomous AI agents are coordinating in real-time

====================================================
API ROUTE
====================================================

Create ONLY if missing:

app/api/ai/negotiate/route.js

Responsibilities:
- receive scheduling data
- call prompt builder
- call Gemini service
- return dynamic AI responses

IMPORTANT:
- keep APIs thin
- no business logic inside route handlers

====================================================
IMPLEMENTATION RULES
====================================================

- DO NOT hardcode names
- DO NOT generate fake static responses
- ALL AI responses must use real Firebase data
- Keep scheduling logic separate from Gemini
- Keep architecture modular
- Follow architecture.md strictly
- Keep implementation production-style

====================================================
FINAL GOAL
====================================================

Create a real-time AI-powered workforce coordination system where:
- employee availability is analyzed dynamically
- AI agents simulate real coordination
- scheduling decisions use live project data
- meetings are autonomously optimized and scheduled
- AI negotiation feels realistic and data-driven