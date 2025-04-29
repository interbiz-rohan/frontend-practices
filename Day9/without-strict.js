// without-strict.js

// 1. Undeclared variable - Allowed!
x = 10;
console.log("x =", x);

// 2. Duplicated parameter - Allowed!
function add(a, a) {
  return a + 5;
}

console.log("Duplicate param:", add(3, 7));

// 3. Writing to a read-only property - Fails silently
Object.defineProperty(this, "PI", { value: 3.14, writable: false });
PI = 3.14159; // No error thrown
console.log("PI =", PI);

// 4. `this` in function refers to global object
function showThis() {
  console.log("this is", this);
}

showThis();


function funwithVar(){
    var value={"":""};
}

console.log(va)