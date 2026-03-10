import { CustomerId } from "./types/CustomerId"
import { OrderItem } from "./OrderItem"
import { Price, createPrice } from "./types/Price"
import { EventBus } from "../observer/EventBus"

export class Order {
  private confirmed = false
  private items: OrderItem[] = []

  constructor(
    public readonly customerId: CustomerId,
    private eventBus: EventBus
  ) {}

  addItem(item: OrderItem) {
    if (this.confirmed) {
      throw new Error("Order already confirmed")
    }

    this.items.push(item)
  }

  getTotal(): Price {
    const total = this.items.reduce(
      (sum, item) => sum + item.total,
      0
    )

    return createPrice(total)
  }

  confirm() {
    if (this.items.length === 0) {
      throw new Error("Order must contain items")
    }

    this.confirmed = true

    this.eventBus.publish("OrderConfirmed", {
      customerId: this.customerId,
      total: this.getTotal()
    })
  }
}