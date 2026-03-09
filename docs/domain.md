# Domain: Learning Management System (LMS) — Course Completion

## Core Idea

In this domain, a learner progresses through a set of **modules** that belong to a **course**.

Each module has a completion **status**, and the overall **course completion state is derived from the status of its modules**.

The course itself does not directly control completion. Instead, it evaluates whether it is completed based on the state of all modules.

This ensures that course completion is always consistent with the progress made inside the modules.

---

## Business Rule

A course is marked as **completed** only when **all modules associated with that course have the status `"passed"`**.

If **any module remains `"pending"` or `"failed"`**, the course remains **in progress**.

This rule is enforced inside the **Course aggregate**, which is responsible for maintaining the consistency of the course state.

---

## State Change Flow

The lifecycle of module and course completion follows this sequence:

1. A module transitions to a `"passed"` state using the `passModule()` domain function.
2. The course updates its internal module list through `completeModInCourse(course, moduleId)`.
3. After updating the module, the course re-evaluates its completion state through `evaluateCompletion()`.
4. The business rule is applied:
   - If **all modules are `"passed"`**, the course transitions to `completed: true`.
   - If **any module is not `"passed"`**, the course remains incomplete.
5. When the course transitions from **incomplete → completed**, a domain event is emitted.

---

## Domain Events

The domain emits events when important state transitions occur.
These events allow other parts of the system to react without tightly coupling infrastructure logic to the domain model.

### ModulePassed

Emitted when a module transitions to the `"passed"` state.

```ts
{
  type: "ModulePassed",
  moduleId: string,
  moduleTitle: string
}
```

### CourseCompleted

Emitted when a course transitions to the completed state.

```ts
{
  type: "CourseCompleted",
  courseId: string,
  courseTitle: string
}
```

These events allow the system to react to domain changes in a flexible and extensible way.

---

## Observer Opportunities

Observers subscribe to domain events and perform side effects when events occur.
The core domain does not know about these observers — it simply emits events.

### Certificate Generator Observer

When a `CourseCompleted` event is emitted, a certificate can be generated for the learner. Possible side effects include:

- Generating a PDF certificate
- Storing it in a document service
- Making it available for download in the learner portal

### Gamification Observer

When a `CourseCompleted` event occurs, the learner receives:

- Experience Points (XP)
- A potential rank upgrade
- Updated progress tracking

This observer updates the `Student` domain model.

---

## Domain Model Outcomes

After implementing the domain model, the system demonstrates several important domain-driven design principles.

### Strong Value Validation

Invalid values are rejected both:

- At the **type level**, using branded types such as `CourseId`, `ModuleId`, `XpReward`, and `Rank`
- At **runtime**, using validation logic inside factory functions and constructors

This prevents invalid states such as negative XP, empty titles, invalid module statuses, and malformed identifiers from entering the domain.

### Encapsulated Business Logic

Business rules are implemented inside the domain layer, rather than scattered across utilities or external services. Examples include:

- `passModule()` controlling module state transitions
- `completeModInCourse()` enforcing course completion rules
- Student XP and rank progression logic

This ensures the domain remains the single source of truth for system behaviour.

### Identity Across State Changes

Entities such as `Course`, `Module`, and `Student` maintain identity through branded identifiers. Even when state changes occur, the identity remains consistent via `ModuleId`, `CourseId`, and `StudentId`.

State transitions create new immutable objects while preserving their identity, allowing the system to reliably track entities over time.

### Event Broadcasting with Loose Coupling

The domain emits events when important transitions occur. Observers subscribe to these events without the domain needing to know about them.

This allows any number of listeners to react independently:

- Certificate generation
- Gamification systems
- Analytics tracking
- Notifications
- Leaderboard updates

New features can be added simply by subscribing additional observers, without modifying the core course logic. This design keeps the system extensible, maintainable, and loosely coupled.