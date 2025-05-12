"use strict";
// Primitive Types
let names = "Rohan";
let age = 25;
let isAdmin = true;
let nothing = null;
let notDefined = undefined;
let id = Symbol("id");
let bigValue = 9007199254740991n;
// Non-Primitive Types
let hobbies = ["coding", "reading"];
let tupleExample = ["score", 100];
var Role;

(function (Role) {
    Role["USER"] = "User";
    Role["ADMIN"] = "Admin";
})(Role || (Role = {}));

let myRole = Role.ADMIN;

let person = { name: "Alice", age: 30 };
// Advanced Types
let data = "info";
let anything = true;
let unknownValue = "check";
function throwError(msg) {
    throw new Error(msg);
}
let user = {
    id: 1,
    name: "John",
    address: { street: "123 Main", city: "New York" },
};

const superUser = {
    id: 2,
    name: "Admin",
    address: { street: "456 Road", city: "Delhi" },
    accessLevel: 5,
};
// Type Assertion
let someValue = "hello";
let strLength = someValue.length;
// Type Guards
function isString(value) {
    return typeof value === "string";
}
if (isString(someValue)) {
    console.log(someValue.toUpperCase());
}
// Generics
function identity(arg) {
    return arg;
}
let str = identity("Hello");
let num = identity(100);
class Box {
    constructor(value) {
        this.content = value;
    }
}
const stringBox = new Box("Item");
const nestedTuple = [
    { name: "Rohan", age: 12 },
    [
        "Rohan",
        [{ name: "Rohan", age: 12 }],
        [[[{ name: "Rohan", age: 12 }]]],
    ],
];
