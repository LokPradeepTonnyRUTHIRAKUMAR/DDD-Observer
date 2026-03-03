import type { ProductName, PriceNumber, ProductId, StockLevel, Quantity } from "./types.js"
import type { Product } from "./product.js"

export function createPrice(value: number): PriceNumber {
	if (value < 0) {
		throw new Error("Value must be positive")
	}

	return value as PriceNumber
}

export function createQuantity(quantityValue: number): Quantity {
	if (quantityValue < 0) {
		throw new Error("Value must be positive")
	}

	return quantityValue as Quantity
}

export function createStockLevel(levelValue: number): StockLevel {
	if (levelValue < 0) {
		throw new Error("Value must be positive")
	}

	return levelValue as StockLevel
}

export function reduceStock(current: StockLevel, qty: Quantity): StockLevel {
	if (current < qty) {
		throw new Error("Not enough stock")
	}
	if (qty < 0) {
		throw new Error("Quantity must be positive")
	}

	return (current - qty) as StockLevel
}

export function createProduct(
	id: string,
	name: ProductName,
	price: PriceNumber,
): Product {
	if (name !== "Shoes" && name !== "Shirt" && name !== "Pants") {
		throw new Error("Name must be Shoes, Shirt, or Pants")
	}

	if (!id) {
		throw new Error("Id must be provided")
	}

	if (price < 0) {
		throw new Error("Price must be positive")
	}

	return {
		id: id as ProductId,
		name,
		price,
	}
}
