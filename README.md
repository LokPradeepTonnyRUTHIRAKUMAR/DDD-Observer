# LMS Domain Model — Course Completion System

A small **Domain-Driven Design (DDD)** project demonstrating how a Learning Management System can model course completion using:

- Strong domain modeling
- Immutable entities
- Domain events
- The observer pattern
- Type-safe value objects

The project focuses on how domain rules can be enforced within the model while allowing infrastructure features (such as certificates or gamification) to react to domain events without tightly coupling them to the core logic.

---

## Project Overview

In a Learning Management System, learners complete **modules** inside a **course**.

The course is considered **completed only when all modules are passed**.

Key ideas demonstrated:

- Domain invariants
- Event-driven architecture
- Observer pattern
- Immutable state transitions
- Strongly typed domain values

---

## Business Rule

A course is marked as **completed** only when **all modules associated with that course have status `"passed"`**.

If at least one module is `"pending"` or `"failed"`, the course remains **in progress**.

This rule is enforced by the **Course aggregate**.

---

## Architecture

```
src/
├── domain/
│   ├── course/
│   ├── module/
│   ├── student/
│   └── events/
├── infrastructure/
│   └── observers/
└── index.ts
```

### Domain Layer

Contains the core business model — entities, value objects, domain rules, and domain events.

The domain layer **does not depend on infrastructure**.

### Infrastructure Layer

Contains observers reacting to domain events. Examples implemented:

- Certificate generation
- Gamification system

---

## Domain Entities

### Course

Represents a collection of modules.

| Property | Type |
|---|---|
| id | `CourseId` |
| title | `CourseTitle` |
| modules | `Module[]` |
| completed | `boolean` |
| observers | `Observer[]` |

Responsibilities: manage module completion, evaluate course completion, emit `CourseCompleted` event.

### Module

Represents a learning unit inside a course.

| Property | Type |
|---|---|
| id | `ModuleId` |
| title | `ModuleTitle` |
| status | `"pending" \| "passed" \| "failed"` |
| xpReward | `XpReward` |

Modules transition to `"passed"` when completed.

### Student

Represents learner progress. Tracks XP points, rank, and courses already rewarded — preventing duplicate rewards.

---

## Domain Events

Events are emitted when important domain changes occur. They allow other systems to react without coupling to the domain model.

### ModulePassed


### CourseCompleted

Emitted when all modules in a course are passed.

---

## Observer Pattern

Observers subscribe to domain events. The course does not know what reacts to its events — it simply emits them. This keeps the system loosely coupled.

### Certificate Generator

Triggered on `CourseCompleted`. Generates and logs a completion certificate.

### Gamification System

Triggered on `CourseCompleted`. Awards XP, updates student rank, and tracks rewarded courses to prevent duplicates.

---

## Domain Model Features

### Strong Value Validation

Invalid values are rejected at the type level using branded types and at runtime using factory guards. Examples: negative XP, invalid module status, empty titles.

### Encapsulated Business Logic

Business rules live inside the domain model — module state transitions, course completion evaluation, and student XP progression. This avoids spreading domain logic across utilities or services.

### Identity Tracking

Entities preserve identity across state changes via `CourseId`, `ModuleId`, and `StudentId`. Even when new immutable objects are created, identity remains consistent.

### Event-Driven Design

Domain events allow infrastructure features to react without modifying domain code. New features can be added simply by subscribing new observers — email notifications, analytics, leaderboards, achievements — without touching course logic.

---

## Running the Project

Install dependencies:

```bash
npm install
```

Run the demo:

```bash
npx tsx src/index.ts
```

The demo simulates module completion, course completion, event emission, and observer reactions.

---

## Example Flow

```
Module passed
     ↓
Course evaluates completion
     ↓
CourseCompleted event emitted
     ↓
Observers react
     ├── Certificate generated
     └── XP awarded to student
```

---

## Technologies

- TypeScript
- Node.js
- `tsx` runtime
- Domain-Driven Design concepts
- Observer pattern
- Event-driven architecture

---

## Learning Goals

This project demonstrates how to model domain rules cleanly, use immutable domain entities, enforce invariants, broadcast domain events, and decouple infrastructure from business logic.