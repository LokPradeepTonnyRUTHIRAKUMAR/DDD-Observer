import type { ProductId, ProductName, PriceNumber } from "./types.js"

export type Product = {
	id: ProductId
	name: ProductName
	price: PriceNumber
}
