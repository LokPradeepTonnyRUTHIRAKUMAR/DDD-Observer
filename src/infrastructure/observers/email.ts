import type { Observer } from "./observer.js"

export const sendEmailMock: Observer = (event) => {
	console.log(`Email sent for event ${event.type}`)
}
