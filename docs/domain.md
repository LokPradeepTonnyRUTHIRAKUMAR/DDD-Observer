# Domain: Online Order Management System

## Overview

The system manages customer orders in an online shop.
Customers can create orders containing products, and the system ensures that all business rules are respected before an order becomes valid.

The goal of the system is to guarantee that invalid orders cannot exist.

---

## Core Concepts

### Customer

A customer represents a person placing an order.

Rules:

* Every customer must have a unique CustomerId.
* A customer must have a valid email address.

---

### Product

A product represents an item that can be purchased.

Rules:

* A product must have a unique ProductId.
* A product must have a name.
* Product price must always be greater than zero.

---

### Order

An order represents a purchase created by a customer.

Rules:

* An order must belong to exactly one customer.
* An order must contain at least one product.
* An order total price cannot be negative.
* An order cannot be modified after confirmation.

---

### Order Item

An order item connects a product with a quantity.

Rules:

* Quantity must be greater than zero.
* Product price is captured at order creation time.
* Total item price equals product price multiplied by quantity.

---

## Business Rules

1. An order can only be created using valid products.
2. Invalid prices or quantities must be rejected immediately.
3. The system must prevent creation of orders with empty item lists.
4. Once confirmed, an order becomes immutable.
5. All monetary values must be validated before entering the domain.

---

## Domain Events

The system emits events when important actions occur.

### OrderCreated

Triggered when a valid order is successfully created.

Possible reactions:

* Log order creation
* Send confirmation email
* Update analytics statistics

### OrderConfirmed

Triggered when an order is confirmed.

Possible reactions:

* Notify warehouse
* Reserve inventory
* Start delivery process

---

## Error Handling

Invalid data must never exist inside the domain.

If invalid data is provided:

* Smart constructors must throw errors or return invalid results.
* Errors must be handled safely using try/catch blocks.

---

## Design Principles

* Illegal states must be impossible.
* Validation happens at system boundaries.
* Domain objects protect business rules.
* Side effects are handled using the Observer pattern.
