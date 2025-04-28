// 1. JavaScript Object (Normal Object)

console.log("\n--- JavaScript Object Example ---");

const user = {
  name: "Ravi",
  age: 25,
  isAdmin: true,
  hobbies: ["coding", "gaming"],
  address: {
    city: "Raipur",
    pincode: 493881
  },
  greet: function() {
    console.log("Hello, welcome!");
  },
  id: Symbol('id')
};

console.log("Original JS Object:", user);

// 2. JSON Overview

console.log("\n--- JSON Overview ---");

// JSON is just a plain text format (key-value pairs, only string keys)
// No functions, symbols allowed in JSON
// So we need to use JSON.stringify() to create a JSON string

// 3. JSON.stringify() Usage

console.log("\n--- JSON.stringify() Example ---");

// converting user object into JSON string
const jsonString = JSON.stringify(user);
console.log("JSON Stringified Object:", jsonString);

// Function, Symbol, undefined → automatically removed

// 4. JSON.parse() Usage

console.log("\n--- JSON.parse() Example ---");

// Now, parsing back JSON string into JS object
const parsedUser = JSON.parse(jsonString);
console.log("Parsed JS Object from JSON:", parsedUser);

// greet function, id symbol are lost after parsing.

// 5. Edge Cases Handling

console.log("\n--- Edge Case: Functions/Symbols/Undefined ---");

const weirdObj = {
  name: "EdgeCase",
  method: function() {},
  undef: undefined,
  sym: Symbol("sym"),
};

console.log("Weird Object:", weirdObj);

// Try to stringify
const weirdJSON = JSON.stringify(weirdObj);
console.log("After JSON.stringify (functions/symbols/undefined removed):", weirdJSON);

// =======================================
// 6. Edge Case: Circular Reference Error
// =======================================

console.log("\n--- Edge Case: Circular Reference ---");

const circularObj = {};
circularObj.self = circularObj; // It points to itself

try {
  const badJSON = JSON.stringify(circularObj);
  console.log(badJSON);
} catch (error) {
  console.log("Error during stringify:", error.message); 
  // Output: Converting circular structure to JSON
}

// =======================================
// 7. JSON.stringify Advanced: Filtering fields
// =======================================

console.log("\n--- JSON.stringify() with filtering fields ---");

const filteredJSON = JSON.stringify(user, ["name", "age"]);
console.log("Filtered JSON (only name & age):", filteredJSON);

// 8. JSON.stringify Advanced: Pretty Print

console.log("\n--- JSON.stringify() with pretty print ---");

const prettyJSON = JSON.stringify(user, null, 2);
console.log("Pretty Printed JSON:\n", prettyJSON);

// 9. JSON.stringify() with callback (replacer function)

console.log("\n--- JSON.stringify() with replacer function ---");

const callbackJSON = JSON.stringify(user, (key, value) => {
  if (key === "" || key === "name") return value; // Keep root and 'name'
  return undefined; // Remove everything else
});
console.log("Callback Filtered JSON:", callbackJSON);