import type { DomainEvent } from "../../domain/events/events.js"

export type Observer = (event: DomainEvent) => void

export const observers: Observer[] = []
