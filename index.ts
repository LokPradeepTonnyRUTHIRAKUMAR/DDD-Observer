import { v4 as uuidv4 } from "uuid"

type ProductName = "Shoes" | "Shirt" | "Pants"
type PriceNumber = number & { readonly __brand: unique symbol }
type ProductId = string & { readonly __brand: unique symbol }
type StockLevel = number & { readonly __brand: unique symbol }
type Quantity = number & { readonly __brand: unique symbol }

function createPrice(value: number): PriceNumber {
    if (value < 0) {
        throw new Error("Value must be positive")
    }
    return value as PriceNumber
}

function createStockLevel(value: number): StockLevel {
    if (value < 0) {
        throw new Error("Stock level cannot be negative")
    }
    return value as StockLevel
}

function createQuantity(value: number): Quantity {
    if (value <= 0) {
        throw new Error("Quantity must be greater than zero")
    }
    return value as Quantity
}

type Product = {
    id: ProductId
    name: ProductName
    price: PriceNumber
    stockLevel: StockLevel
}

function createProduct(
    id: string,
    name: ProductName,
    price: PriceNumber,
    stockLevel: StockLevel
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
    if (stockLevel < 0) {
        throw new Error("Stock level cannot be negative")
    }
    
    return {
        id: id as ProductId,
        name,
        price,
        stockLevel,
    }
}

type ProductCreatedEvent = {
    readonly type: "ProductCreated"
    readonly productId: ProductId
    readonly name: ProductName
    readonly price: PriceNumber
}

type PriceUpdatedEvent = {
    readonly type: "PriceUpdated"
    readonly productId: ProductId
    readonly oldPrice: PriceNumber
    readonly newPrice: PriceNumber
}

type StockReducedEvent = {
    readonly type: "StockReduced"
    readonly productId: ProductId
    readonly newLevel: StockLevel
    readonly quantity: Quantity
}

type DomainEvent = ProductCreatedEvent | PriceUpdatedEvent | StockReducedEvent

type Observer = (event: DomainEvent) => void

const observers: Observer[] = []

const sendEmailMock: Observer = (event: DomainEvent) => {
    console.log(`Email sent for event ${event.type}`)
}

const saveToDatabaseMock: Observer = (event: DomainEvent) => {
    console.log(`Data saved to database for event ${event.type}`)
}

observers.push(sendEmailMock)
observers.push(saveToDatabaseMock)

function reduceStock(product: Product, quantity: Quantity): Product {
    const newStockLevel = product.stockLevel - quantity

    if (newStockLevel < 0) {
        throw new Error("Stock cannot drop below zero")
    }

    const updatedProduct: Product = {
        ...product,
        stockLevel: newStockLevel as StockLevel,
    }

    const event: StockReducedEvent = {
        type: "StockReduced",
        productId: updatedProduct.id,
        newLevel: updatedProduct.stockLevel,
        quantity: quantity,
    }

    observers.forEach((observer) => observer(event))

    return updatedProduct
}

try {
    const initialProductId = uuidv4()
    let myProduct = createProduct(
        initialProductId,
        "Shirt",
        createPrice(50),
        createStockLevel(10)
    )
    
    console.log(myProduct)

    observers.forEach((observer) =>
        observer({
            type: "ProductCreated",
            productId: myProduct.id,
            name: myProduct.name,
            price: myProduct.price,
        })
    )

    myProduct = reduceStock(myProduct, createQuantity(3))
    console.log(myProduct)

    myProduct = reduceStock(myProduct, createQuantity(100))

} catch (error) {
    if (error instanceof Error) {
        console.error(error.message)
    } else {
        console.error("Unknown error")
    }
}