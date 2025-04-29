// A generator in JavaScript is a special type of function that can be paused and resumed. 
// It is defined using the function* syntax and uses the yield keyword to return values one by one from the function. 
// Unlike regular functions that run from start to finish, 
// a generator can pause its execution (using yield) and later resume where it left off, preserving its internal state.

// A simple generator function that counts from 1 to 3
function* countUpToThree() {
    yield 1;
    yield 2;
    yield 3;
  }
  
  // Create a generator instance
  const counter = countUpToThree();
  
  // Manually calling next() on the generator
  console.log(counter.next().value); // { value: 1, done: false }
  console.log(counter.next().value); // { value: 2, done: false }
  console.log(counter.next().value); // { value: 3, done: false }
  console.log(counter.next().value); // { value: undefined, done: true }
  