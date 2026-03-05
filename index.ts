import { notifyObservers, observers } from "./infrastructure/observers/observer"
import { sendEmailMock } from "./infrastructure/observers/email"
import { saveToDatabaseMock } from "./infrastructure/observers/database"
import { createModuleTitle, createModule, submitQuiz } from "./src/domain/module/factories"
import { createCourseTitle, createCourse, evaluateCourseCompletion } from "./src/domain/course/factories"

// ─── Wire Up Observers ────────────────────────────────────────────────────────
// This is the only place observers are plugged in.
// The domain knows nothing about these functions.

observers.push(sendEmailMock)
observers.push(saveToDatabaseMock)

console.log("\n═══════════════════════════════════════")
console.log("   LMS Domain — Course Completion")
console.log("═══════════════════════════════════════\n")

// ─── Phase 2b: Dumb object — silent bugs ──────────────────────────────────────
// This is what happens WITHOUT branded types or smart constructors.
// The program runs but the data is wrong — a silent bug.

console.log("── Phase 2b: Silent bug with dumb object ──")
type DumbModule = { title: string; score: number; status: string }
const dumbModule: DumbModule = { title: "", score: -50, status: "whatever" }
console.log("[SILENT BUG] No error thrown:", dumbModule)

// ─── Phase 3 + 4: Smart constructors catching invalid data ────────────────────

console.log("\n── Phase 4: Smart constructors — impossible data ──")

// Test: empty module title
try {
  createModule(createModuleTitle(""))
} catch (e) {
  if (e instanceof Error) console.error("[ERROR CAUGHT]", e.message)
}

// Test: score below 0
try {
  createModule(createModuleTitle("Intro to TypeScript"))
  submitQuiz(createModule(createModuleTitle("Intro to TypeScript")), -10, notifyObservers)
} catch (e) {
  if (e instanceof Error) console.error("[ERROR CAUGHT]", e.message)
}

// Test: score above 100
try {
  submitQuiz(createModule(createModuleTitle("Intro to TypeScript")), 150, notifyObservers)
} catch (e) {
  if (e instanceof Error) console.error("[ERROR CAUGHT]", e.message)
}

// ─── Phase 6 + 7: Entities + Observer pattern ─────────────────────────────────

console.log("\n── Phase 6+7: Module state changes + observers ──")

// Create modules
let module1 = createModule(createModuleTitle("Intro to TypeScript"))
let module2 = createModule(createModuleTitle("Domain-Driven Design"))
let module3 = createModule(createModuleTitle("Observer Pattern"))

// Fail module1 twice — observers react each time
module1 = submitQuiz(module1, 45, notifyObservers)
module1 = submitQuiz(module1, 55, notifyObservers)

// Third failure — module gets locked
module1 = submitQuiz(module1, 60, notifyObservers)

// Test: attempt on locked module
try {
  module1 = submitQuiz(module1, 90, notifyObservers)
} catch (e) {
  if (e instanceof Error) console.error("[ERROR CAUGHT]", e.message)
}

// Pass module2 and module3
module2 = submitQuiz(module2, 85, notifyObservers)
module3 = submitQuiz(module3, 95, notifyObservers)

// ─── Course with locked module — should NOT complete ──────────────────────────

console.log("\n── Course evaluation — locked module blocks completion ──")
let course = createCourse(
  createCourseTitle("TypeScript Mastery"),
  [module1, module2, module3]
)
course = evaluateCourseCompletion(course, notifyObservers)
console.log(`Course status (should be InProgress): ${course.status}`)

// ─── Course where all modules pass — should complete ─────────────────────────

console.log("\n── Course evaluation — all modules passed ──")
let moduleA = createModule(createModuleTitle("Intro to TypeScript"))
let moduleB = createModule(createModuleTitle("Domain-Driven Design"))
let moduleC = createModule(createModuleTitle("Observer Pattern"))

moduleA = submitQuiz(moduleA, 75, notifyObservers)
moduleB = submitQuiz(moduleB, 88, notifyObservers)
moduleC = submitQuiz(moduleC, 92, notifyObservers)

let completedCourse = createCourse(
  createCourseTitle("TypeScript Mastery"),
  [moduleA, moduleB, moduleC]
)
completedCourse = evaluateCourseCompletion(completedCourse, notifyObservers)
console.log(`Course status (should be Completed): ${completedCourse.status}`)

// ─── Test: empty course ───────────────────────────────────────────────────────

console.log("\n── Empty course throws ──")
try {
  createCourse(createCourseTitle("Empty Course"), [])
} catch (e) {
  if (e instanceof Error) console.error("[ERROR CAUGHT]", e.message)
}

// ─── Test: empty course title ─────────────────────────────────────────────────
try {
  createCourseTitle("")
} catch (e) {
  if (e instanceof Error) console.error("[ERROR CAUGHT]", e.message)
}