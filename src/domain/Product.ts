import { ProductId } from "./types/ProductId"
import { Price } from "./types/Price"

export class Product {
    constructor(
        public readonly id: ProductId,
        public readonly name: string,
        public readonly price: Price
    ) {
        if (!name) throw new Error("Product needs a name")
    }
}