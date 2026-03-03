import type { ProductId, ProductName, PriceNumber, StockLevel, Quantity } from "../product/types.js"

export type ProductCreatedEvent = {
	readonly type: "ProductCreated"
	readonly productId: ProductId
	readonly name: ProductName
	readonly price: PriceNumber
}

export type PriceUpdatedEvent = {
	readonly type: "PriceUpdated"
	readonly productId: ProductId
	readonly oldPrice: PriceNumber
	readonly newPrice: PriceNumber
}

// ✅ Precise — the event carries what changed and why
export type StockReducedEvent = {
	readonly type: "StockReduced"
	readonly productId: ProductId
	readonly newLevel: StockLevel
	readonly quantity: Quantity
}

export type DomainEvent = ProductCreatedEvent | PriceUpdatedEvent | StockReducedEvent
