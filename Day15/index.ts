// Primitive Types
let names: string = "Rohan";
let age: number = 25;
let isAdmin: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
let id: symbol = Symbol("id");
let bigValue: bigint = 9007199254740991n;

// Non-Primitive Types
let hobbies: string[] = ["coding", "reading"];
let tupleExample: [string, number] = ["score", 100];

enum Role {
  USER = "User",
  ADMIN = "Admin",
}

let myRole: Role = Role.ADMIN;

let person: { name: string; age: number } = { name: "Alice", age: 30 };

// Advanced Types
let data: string | number = "info";
let anything: any = true;
let unknownValue: unknown = "check";

function throwError(msg: string): never {
  throw new Error(msg);
}

// Custom Types
type Address = {
  street: string;
  city: string;
};

interface User {
  id: number;
  name: string;
  address: Address;
}

let user: User = {
  id: 1,
  name: "John",
  address: { street: "123 Main", city: "New York" },
};

// Type Alias & Intersection
type Admin = {
  accessLevel: number;
};

type SuperUser = User & Admin;

const superUser: SuperUser = {
  id: 2,
  name: "Admin",
  address: { street: "456 Road", city: "Delhi" },
  accessLevel: 5,
};

// Type Assertion
let someValue: unknown = "hello";
let strLength = (someValue as string).length;

// Type Guards
function isString(value: any): value is string {
  return typeof value === "string";
}

if (isString(someValue)) {
  console.log(someValue.toUpperCase());
}

// Generics
function identity<T>(arg: T): T {
  return arg;
}

let str = identity<string>("Hello");
let num = identity(100);

class Box<T> {
  content: T;
  constructor(value: T) {
    this.content = value;
  }
}

const stringBox = new Box<string>("Item");

// Complex Nested Tuple
type objType = { name: string; age: number };

const nestedTuple: [objType, [string, objType[], [[objType[]]]]] = [
  { name: "Rohan", age: 12 },
  [
    "Rohan",
    [{ name: "Rohan", age: 12 }],
    [[[{ name: "Rohan", age: 12 }]]],
  ],
];

function merge<T, U>(obj1: U, obj2: T): T {
    return { ...obj1, ...obj2 };
}


  
  const result = merge<{name:string},{age:number}>( { age: 30 },{ name: "Alice" });
  // result has type: { name: string; age: number; }
  console.log(result); 


  const CanFly = (Base) => class extends Base {
    fly() {
      console.log("Flying!");
    }
  };
  
  class Bird {}
  class FlyingBird extends CanFly(Bird) {}