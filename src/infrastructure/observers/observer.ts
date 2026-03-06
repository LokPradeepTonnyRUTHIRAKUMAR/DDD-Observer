import { DomainEvent } from "../../domain/events/events"

export type Observer = (event: DomainEvent) => void

export const observers: Observer[] = []

export function emit(event: DomainEvent) {
	observers.forEach(observer => observer(event))
}