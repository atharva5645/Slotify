# Slotify — Backend System Architecture

## Overview

Slotify is a backend-driven intelligent meeting orchestration platform designed to optimize organizational scheduling workflows through:

- Automated availability detection
- Mandatory attendee enforcement
- Conflict-aware scheduling
- Task accountability tracking
- Notification orchestration
- Booking automation
- Meeting analytics

The system is architected using a modular service-oriented structure to ensure:
- scalability
- maintainability
- low coupling
- high extensibility
- production readiness

---

# Architectural Goals

## Primary Objectives

- Centralize scheduling intelligence in the backend
- Keep frontend presentation-only
- Create reusable scheduling services
- Enable scalable API-driven workflows
- Minimize frontend business logic
- Support future AI-assisted scheduling capabilities

---

# High-Level Architecture

```text
Client Application (Next.js Frontend)
                │
                ▼
API Layer (Next.js Route Handlers)
                │
                ▼
Business Logic Layer
 ├── Scheduling Engine
 ├── Task Management Engine
 ├── Notification Service
 ├── Booking Service
 └── Analytics Service
                │
                ▼
Data Access Layer (Supabase)
                │
                ▼
PostgreSQL Database
```

---

# Core Architectural Principles

## 1. Separation of Concerns

The system separates:
- UI rendering
- API handling
- business logic
- persistence logic
- scheduling intelligence

Frontend must never contain scheduling rules or validation logic.

---

## 2. Modular Backend Design

Business domains are isolated into dedicated modules:

- scheduling
- tasks
- notifications
- booking
- analytics

This prevents monolithic growth and improves maintainability.

---

## 3. Backend-Driven Intelligence

All scheduling intelligence executes server-side:
- availability detection
- attendee validation
- conflict resolution
- slot optimization

This ensures:
- consistency
- security
- reliability
- scalability

---

## 4. API-First Design

All frontend communication occurs exclusively through APIs.

Advantages:
- future mobile support
- independent frontend iteration
- simplified testing
- easier integrations

---

# Recommended Backend Structure

```bash
app/
 ├── api/
 │    ├── meetings/
 │    │    ├── create/
 │    │    ├── availability/
 │    │    └── upcoming/
 │    │
 │    ├── booking/
 │    │    ├── create-link/
 │    │    └── reserve-slot/
 │    │
 │    ├── tasks/
 │    │    ├── create/
 │    │    ├── update-status/
 │    │    └── user/
 │    │
 │    └── notifications/

lib/
 ├── supabase/
 │    └── client.js
 │
 ├── scheduler/
 │    ├── availabilityEngine.js
 │    ├── conflictDetector.js
 │    ├── mandatoryValidator.js
 │    ├── slotOptimizer.js
 │    └── schedulingService.js
 │
 ├── tasks/
 │    ├── taskService.js
 │    └── taskValidator.js
 │
 ├── notifications/
 │    ├── emailService.js
 │    └── reminderScheduler.js
 │
 ├── booking/
 │    └── bookingService.js
 │
 ├── analytics/
 │    └── meetingAnalytics.js
 │
 └── utils/
      ├── dateUtils.js
      ├── validation.js
      └── responseFormatter.js

database/
 ├── schema.sql
 └── seed.sql

docs/
 └── architecture.md
```

---

# Scheduling Engine Architecture

## Objective

Provide intelligent and conflict-aware meeting scheduling.

---

# Scheduling Pipeline

```text
Meeting Request
        │
        ▼
Availability Detection
        │
        ▼
Conflict Resolution
        │
        ▼
Mandatory Attendee Validation
        │
        ▼
Minimum Attendance Validation
        │
        ▼
Slot Optimization
        │
        ▼
Meeting Confirmation
```

---

# Availability Detection Engine

## Responsibilities

- detect overlapping meetings
- determine employee availability
- identify conflicting schedules
- validate scheduling windows

---

## Input

```js
{
  participants,
  startTime,
  endTime
}
```

---

## Output

```js
{
  availableUsers,
  unavailableUsers,
  conflicts
}
```

---

# Conflict Detection Logic

The system validates scheduling overlap using interval comparison logic.

## Overlap Condition

```text
existingMeeting.start < requestedEnd
AND
existingMeeting.end > requestedStart
```

This prevents:
- double bookings
- invalid slot allocation
- scheduling inconsistencies

---

# Mandatory Attendee Validation

## Objective

Guarantee the presence of critical stakeholders before meeting confirmation.

---

## Example Constraints

- HOD mandatory
- Organizer mandatory
- Team Lead mandatory
- Minimum attendee threshold required

---

## Validation Output

```js
{
  valid: true,
  errors: []
}
```

---

# Slot Optimization Strategy

## Goal

Identify the most optimal meeting slot.

---

## Optimization Parameters

- maximum attendee availability
- mandatory attendee presence
- minimum scheduling conflicts
- balanced workload distribution

---

## Example

```text
2 PM → 14 attendees available → VALID
11 AM → HOD unavailable → REJECTED
```

---

# Booking System Architecture

## Objective

Enable shareable scheduling workflows similar to Calendly.

---

# Booking Flow

```text
Public Booking URL
        │
        ▼
Fetch Available Slots
        │
        ▼
Availability Validation
        │
        ▼
Meeting Creation
        │
        ▼
Meeting Link Generation
        │
        ▼
Notification Dispatch
```

---

# Task Management Architecture

## Objective

Track post-meeting accountability and execution.

---

# Task Lifecycle

```text
Task Created
        │
        ▼
Assigned To Employee
        │
        ▼
Status Tracking
        │
        ▼
Completion Validation
```

---

# Task States

```text
pending
in_progress
completed
blocked
```

---

# Notification Architecture

## Responsibilities

- meeting confirmations
- reminder notifications
- task deadline alerts
- attendance warnings

---

## Suggested Providers

- Resend
- Nodemailer

---

# Meeting Link Integration

## Supported Providers

- Google Meet
- Jitsi Meet

---

# Meeting Creation Flow

```text
Meeting Created
        │
        ▼
Meeting Link Generated
        │
        ▼
Persisted In Database
        │
        ▼
Notification Sent
```

---

# Data Layer Architecture

## Database Provider

Supabase PostgreSQL

---

# Core Tables

## users

```sql
id
name
email
role
availability_status
created_at
updated_at
```

---

## meetings

```sql
id
title
description
organizer_id
minimum_attendees
start_time
end_time
meeting_link
status
created_at
updated_at
```

---

## meeting_participants

```sql
id
meeting_id
user_id
mandatory
attendance_status
created_at
```

---

## tasks

```sql
id
title
assigned_to
assigned_by
meeting_id
deadline
priority
status
created_at
updated_at
```

---

# API Design

## Meeting APIs

```bash
POST /api/meetings/create
POST /api/meetings/check-availability
GET  /api/meetings/upcoming
```

---

## Booking APIs

```bash
POST /api/booking/create-link
POST /api/booking/reserve-slot
```

---

## Task APIs

```bash
POST  /api/tasks/create
PATCH /api/tasks/update-status
GET   /api/tasks/user/:id
```

---

# Backend Engineering Standards

## Mandatory Rules

- No business logic in frontend
- Avoid duplicated scheduling logic
- Use reusable services
- Keep APIs stateless
- Use centralized validation
- Avoid tight coupling
- Maintain modular architecture
- Keep frontend modification minimal

---

# Performance Considerations

## Optimization Goals

- minimize unnecessary DB queries
- reduce frontend re-renders
- modularize scheduling operations
- avoid project-wide file scans
- isolate feature updates

---

# Future Scalability

## Planned Extensions

- AI-powered slot recommendation
- workload balancing
- leave management
- organizational analytics
- predictive scheduling
- smart reminders

---

# System Positioning

Slotify is not a traditional scheduling application.

It is:

```text
An intelligent meeting orchestration and workforce coordination platform.
```

---

# Core Differentiators

## Scheduling Intelligence
- automatic availability detection
- smart slot optimization
- mandatory attendee enforcement

## Organizational Accountability
- task ownership
- execution tracking
- productivity visibility

## Operational Efficiency
- reduced scheduling conflicts
- automated coordination
- centralized workflow management

---

# Development Roadmap

## Phase 1
- Supabase integration
- database schema
- scheduling engine

## Phase 2
- meeting APIs
- booking workflows
- attendee validation

## Phase 3
- task tracking
- notifications
- analytics

---

# Final Objective

Deliver a backend-centric intelligent scheduling platform capable of:
- automated coordination
- intelligent availability analysis
- workforce accountability
- scalable organizational scheduling
- production-ready extensibility