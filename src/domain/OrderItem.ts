import { Product } from "./Product"
import { Price, createPrice } from "./types/Price"

export class OrderItem {
  readonly total: Price

  constructor(
    public readonly product: Product,
    public readonly quantity: number
  ) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero")
    }

    this.total = createPrice(
      product.price * quantity
    )
  }
}