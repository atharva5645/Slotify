IMPORTANT:
Before making ANY changes, first read and strictly follow:

docs/architecture.md

OR

architecture.md

This file is the SOURCE OF TRUTH for:
- backend structure
- service architecture
- scheduling engine flow
- folder hierarchy
- API organization
- development rules

====================================================
TECH STACK UPDATE
====================================================

IMPORTANT:
This project uses Firebase instead of Supabase.

Use:
- Firebase Firestore
- Firebase Authentication
- Firebase Cloud Functions if needed
- Firebase Realtime capabilities
- Firebase Cloud Messaging (optional for notifications)

DO NOT use Supabase anywhere.

====================================================
OBJECTIVE
====================================================

Implement an AI-powered autonomous meeting orchestration system inside the existing Slotify project.

IMPORTANT:
- Existing frontend already exists
- DO NOT redesign UI
- DO NOT recreate pages/components
- ONLY implement backend intelligence + functionality
- Work incrementally
- Modify only relevant files
- Avoid scanning the full project repeatedly

====================================================
MAIN FEATURE
====================================================

Implement an AI Scheduling System where:

1. Admin creates a meeting request
2. AI automatically:
   - checks employee availability
   - validates core members
   - negotiates optimal slots
   - selects best time slot
   - schedules meeting automatically
   - generates meeting link
   - sends notifications

The AI system should simulate multi-agent coordination.

====================================================
IMPORTANT
====================================================

DO NOT implement real ML training.

DO NOT use TensorFlow/PyTorch/custom models.

The “AI” should be implemented using:
- orchestration logic
- scoring systems
- rule engines
- scheduling optimization
- AI-style conversational simulation

====================================================
REQUIRED AI ARCHITECTURE
====================================================

Create ONLY if missing:

lib/
 ├── firebase/
 │    └── firebase.js
 │
 ├── ai/
 │    ├── meetingOrchestrator.js
 │    ├── negotiationEngine.js
 │    ├── recommendationEngine.js
 │    ├── agentConversation.js
 │    │
 │    └── agents/
 │         ├── employeeAgent.js
 │         ├── coreMemberAgent.js
 │         └── schedulerAgent.js
 │
 ├── scheduler/
 │    ├── availabilityEngine.js
 │    ├── conflictDetector.js
 │    ├── mandatoryValidator.js
 │    ├── slotOptimizer.js
 │    └── schedulingService.js
 │
 └── notifications/
      └── notificationService.js

====================================================
FIREBASE DATABASE STRUCTURE
====================================================

Create collections:

users
meetings
meetingParticipants
tasks
notifications

====================================================
AI WORKFLOW
====================================================

Admin Creates Meeting Request
        ↓
AI Orchestrator Starts
        ↓
Availability Engine Checks Employees
        ↓
Core Member Validator Checks Mandatory Users
        ↓
Negotiation Engine Simulates AI Discussion
        ↓
Slot Optimizer Calculates Best Slot
        ↓
AI Finalizes Meeting
        ↓
Meeting Link Generated
        ↓
Notifications Sent To All Members

====================================================
IMPLEMENTATION REQUIREMENTS
====================================================

1. Availability Engine
- detect overlapping meetings
- detect free employees
- return conflicts

2. Mandatory Validation
- HOD mandatory
- Organizer mandatory
- Team Lead mandatory
- minimum attendee validation

3. AI Slot Optimization
- scan multiple slots
- calculate slot scores
- select best slot automatically

Example scoring:
score =
   availableUsers * 10
 + coreMembersAvailable * 100
 - conflicts * 20

4. AI Conversation Simulation
Generate AI-style coordination messages like:

"Rahul unavailable at 11 AM"
"Priya suggests 3 PM"
"Core members validated"
"Optimal slot finalized"

5. Notification System
After scheduling:
- notify all employees
- send meeting details
- send meeting link
- update dashboard

====================================================
AI DECISION RULES
====================================================

Example:
- Total employees = 20
- Minimum required attendees = 10

Meeting can ONLY happen if:
- availableMembers >= 10
- all core members available

If core members unavailable:
Return:
- reschedule suggestion
- cancel option
- admin override option

====================================================
API REQUIREMENT
====================================================

Create:
POST /api/meetings/ai-schedule

The route should:
- call meetingOrchestrator.js
- keep route handlers thin
- avoid business logic inside API routes

====================================================
FRONTEND INTEGRATION
====================================================

Connect existing frontend ONLY.

Add:
[ AI Auto Schedule ]

On click:
- call AI scheduling API
- show AI negotiation messages live
- show scheduling progress animations
- display final result

====================================================
NOTIFICATION REQUIREMENTS
====================================================

After AI finalizes the meeting:
- all participants should receive notification
- store notification in Firebase
- optionally send email notifications
- optionally use Firebase Cloud Messaging

Example notification:
"AI scheduled meeting at 3 PM. Core team confirmed."

====================================================
IMPORTANT DEVELOPMENT RULES
====================================================

- DO NOT rewrite frontend
- DO NOT redesign pages
- DO NOT hardcode fake data unnecessarily
- Keep business logic modular
- Keep APIs as controllers only
- Use service-layer architecture
- Keep implementation production-style
- Avoid duplicated scheduling logic
- Follow architecture.md strictly

====================================================
FINAL GOAL
====================================================

Transform Slotify from a normal meeting scheduler into an:

“AI-powered workforce coordination and autonomous meeting orchestration platform”

capable of:
- intelligent scheduling
- availability optimization
- core-member validation
- autonomous slot negotiation
- automated notifications
- AI-style scheduling conversations