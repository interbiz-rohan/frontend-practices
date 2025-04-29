
// 1. call()
// The call() method calls a function with a specified this value and individual arguments passed directly to the function.

// Syntax: functionName.call(thisArg, arg1, arg2, ...)

// Use case: Used to immediately invoke a function with a specified this context and arguments.

// 2. apply()
// The apply() method is similar to call(), but instead of passing arguments individually, it takes an array (or array-like object) of arguments.

// Syntax: functionName.apply(thisArg, [arg1, arg2, ...])

// Use case: Used to immediately invoke a function with a specified this context and arguments passed as an array.

// 3. bind()
// The bind() method creates a new function that, when called, has its this set to the provided value and has predefined arguments.

// Syntax: const newFunction = functionName.bind(thisArg, arg1, arg2, ...)

// Use case: Used to create a new function with a fixed this context and optional arguments, which can be invoked later.

// In summary:

// call() and apply() invoke the function immediately with a specific this context and arguments.

// bind() returns a new function, which can be invoked later with a fixed this context and optional arguments.


function greet(city, country) {
    console.log(`${this.name} is from ${city}, ${country}.`);
  }
  
  const person = {
    name: "Alice"
  };
  
  // Using call()
  greet.call(person, "New York", "USA"); // Alice is from New York, USA
  
  // Using apply()
  greet.apply(person, ["London", "UK","Cananda"]); // Alice is from London, UK
  
  // Using bind()
  const boundGreet = greet.bind(person, "Tokyo");
  boundGreet("Japan"); // Alice is from Tokyo, Japan
  

  function multiply(a, b) {
    return a * b;
  }
  
  const double = multiply.bind(null, 2);
  console.log(double(3)); 