import type { Observer } from "./observer.js"

export const saveToDatabaseMock: Observer = (event) => {
	console.log(`Data saved to database for event ${event.type}`)
}
