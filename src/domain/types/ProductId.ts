import { Brand } from "./Brand"

export type ProductId = Brand<string, "ProductId">

export function createProductId(id: string): ProductId {
  if (!id) throw new Error("Invalid ProductId")
  return id as ProductId
}