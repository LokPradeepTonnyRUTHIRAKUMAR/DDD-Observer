import { v4 as uuidv4 } from "uuid"
import { SurvivorId, Health, FoodStock, SurvivorName } from "./types"
import { Survivor } from "./survivor"

export function createSurvivorId(id: string): SurvivorId {
	if (!id) throw new Error("Survivor ID required")
	return id as SurvivorId
}

export function createHealth(value: number): Health {
	if (value < 0) throw new Error("Health cannot be negative")
	return value as Health
}

export function createFoodStock(value: number): FoodStock {
	if (value < 0) throw new Error("Food cannot be negative")
	return value as FoodStock
}

export function createSurvivor(
	name: SurvivorName,
	health: Health
): Survivor {

	return {
		id: createSurvivorId(uuidv4()),
		name,
		health
	}
}

export function damageSurvivor(
	survivor: Survivor,
	damage: number
): Survivor {

	const newHealth = survivor.health - damage

	return {
		...survivor,
		health: createHealth(Math.max(0, newHealth))
	}
}