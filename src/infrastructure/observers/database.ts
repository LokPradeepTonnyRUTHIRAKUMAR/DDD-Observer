import { DomainEvent } from "../../domain/events/events"

export const saveToDatabaseMock = (event: DomainEvent) => {
	console.log("DATABASE SAVE:", JSON.stringify(event))
}