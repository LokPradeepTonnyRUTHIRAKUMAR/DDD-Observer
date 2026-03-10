import { Brand } from "./Brand"

export type Price = Brand<number, "Price">

export function createPrice(value: number): Price {
  if (value <= 0) {
    throw new Error("Price must be greater than zero")
  }

  return value as Price
}

export function addPrice(a: Price, b: Price): Price {
  return createPrice(a + b)
}