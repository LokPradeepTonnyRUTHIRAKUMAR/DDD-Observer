import { DomainEvent } from "../../domain/events/events"

export const sendEmailMock = (event: DomainEvent) => {
	console.log("EMAIL SENT:", event.type)
}