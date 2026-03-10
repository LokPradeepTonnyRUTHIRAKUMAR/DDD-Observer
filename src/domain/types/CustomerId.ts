import { Brand } from "./Brand"

export type CustomerId = Brand<string, "CustomerId">

export function createCustomerId(id: string): CustomerId {
  if (!id) throw new Error("Invalid CustomerId")
  return id as CustomerId
}