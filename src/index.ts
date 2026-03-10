import { EventBus } from "./observer/EventBus"
import { createCustomerId } from "./domain/types/CustomerId"
import { createProductId } from "./domain/types/ProductId"
import { createPrice } from "./domain/types/Price"
import { Product } from "./domain/Product"
import { OrderItem } from "./domain/OrderItem"
import { Order } from "./domain/Order"

const bus = new EventBus()

// observers
bus.subscribe("OrderConfirmed", (event) => {
  console.log("Email sent:", event)
})

bus.subscribe("OrderConfirmed", (event) => {
  console.log("Analytics updated:", event)
})

try {
  const customerId = createCustomerId("customer-1")

  const product = new Product(
    createProductId("product-1"),
    "Laptop",
    createPrice(1000)
  )

  const order = new Order(customerId, bus)

  order.addItem(new OrderItem(product, 2))

  console.log("Total:", order.getTotal())

  order.confirm()

} catch (error) {
  console.error("Handled safely:", error)
}
