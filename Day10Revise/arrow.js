// Arrow Function - `this` behavior

console.log("\n--- Arrow Function and 'this' ---");

const person = {
  name: "Ravi",
  regularFunction: function() {
    console.log("Regular function this.name:", this.name); 
  },
  arrowFunction: () => {
    console.log("Arrow function this.name:", this.name); // Undefined 
  }
};

person.regularFunction();
person.arrowFunction();

// Arrow Function - `arguments` behavior

console.log("\n--- Arrow Function and 'arguments' ---");

function regularFunctionExample() {
  console.log("Regular function arguments:", arguments);
}

const arrowFunctionExample = () => {
  console.log("Arrow function arguments:", arguments); // Error if called outside function
}

regularFunctionExample(1, 2, 3);

// Uncomment below to see error
// arrowFunctionExample(1, 2, 3); 

// Correct way to demonstrate:
function wrapperFunction() {
  const arrow = () => console.log("Arrow function inside normal function arguments:", arguments);
  arrow(1, 2, 3);
}

wrapperFunction(10, 20, 30);

// Arrow Function - `new` keyword restriction

console.log("\n--- Arrow Function and 'new' keyword ---");

// Regular function can be used as constructor
function RegularConstructor(name) {
  this.name = name;
}       

const obj1 = new RegularConstructor("Ravi");
console.log("Created with regular function:", obj1);

// Arrow functions CANNOT be used as constructors
const ArrowConstructor = (name) => {
  this.name = name;
};

// Uncomment below to see error
// const obj2 = new ArrowConstructor("Ravi"); 

console.log("Cannot use 'new' with arrow functions because they don't have [[Construct]] behavior.");
