import { v4 as uuidv4 } from "uuid";

/*
 **
 ** avoid any "weird" number as input
 */

/* 1.  factory function  */
/*  a factory function creates a new object  */

// create a primitive obsessed type

type Price = number & { readonly __brand: unique symbol };
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

type Project = {
  clientName: string;
  clientEmail: Email;
  price: Price;
  immersive: boolean;
};

const project1: Project = {
  clientName: "Yann",
  clientEmail: createEmail("yan@mail.com"),
  price: createPrice(1000),
  immersive: true,
};

const project2: Project = {
  clientName: "Ilias",
  clientEmail: createEmail("ilias@mail.com"),
  price: createPrice(2000),
  immersive: true,
};

/* 2.  constructor function  */
// OOP
// a constructor function creates a new object and sets its properties

// modify this code for testing !!
// this replicates user input
const project3: Project = {
  clientName: "Karan",
  clientEmail: createEmail("karanihei.com"),
  price: createPrice(-3000),
  immersive: true,
};

console.log(project3);
