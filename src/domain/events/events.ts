
export type ModuleCompleted = {
  type: "ModuleCompleted"
  moduleId: string
  moduleTitle: string
}

export type CourseCompleted = {
  type: "CourseCompleted"
  courseId: string
  courseTitle: string
}

export type DomainEvent = ModuleCompleted | CourseCompleted

export type Observer = (event: DomainEvent) => void