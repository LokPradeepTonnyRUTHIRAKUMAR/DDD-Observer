import { v4 as uuidv4 } from "uuid";

/*
 **
 ** avoid any "weird" number as input
 */

/* 1.  factory function  */
/*  a factory function creates a new object  */

// create a primitive obsessed type

type Price = number & { readonly __brand: unique symbol };
type Currency = "EUR";
type Money = {
  readonly amount: Price;
  readonly currency: Currency;
};

type Email = string & { readonly __brand: unique symbol };

// smart constructors
function createEmail(value: string): Email {
  if (!value.includes("@")) {
    throw new Error("Invalid email");
  }
  return value as Email;
}

function createPrice(value: number): Price {
  if (value <= 0) {
    throw new Error("Price must be positive");
  }
  return value as Price;
}

function createMoney(amount: number, currency: Currency): Money {
  return {
    amount: createPrice(amount),
    currency,
  };
}

type Project = {
  clientName: string;
  clientEmail: Email;
  price: Money;
  immersive: boolean;
};

const project1: Project = {
  clientName: "Yann",
  clientEmail: createEmail("yan@mail.com"),
  price: createMoney(1000, "EUR"),
  immersive: true,
};

const project2: Project = {
  clientName: "Ilias",
  clientEmail: createEmail("ilias@mail.com"),
  price: createMoney(2000, "EUR"),
  immersive: true,
};

/* 2.  constructor function  */
// OOP
// a constructor function creates a new object and sets its properties

// modify this code for testing !!
// this replicates user input

try {
  const project3: Project = {
    clientName: "Karan",
    clientEmail: createEmail("karanihei.com"),
    price: createMoney(-3000, "EUR"),
    immersive: true,
  };

  console.log(project3);
} catch (error) {
  console.error("Error creating project3:", (error as Error).message);
}
