// What is a Closure in JavaScript?
// A closure is a feature in JavaScript where a function retains access to variables from its lexical scope, even when the function is executed outside of that scope.

// In simple terms:

// A closure is created when a function "remembers" the environment in which it was created, even after that environment is no longer in scope.

// How Does It Work?
// In JavaScript, a function can be defined inside another function. When the inner function is executed, it still has access to variables from the outer function, 
// even if the outer function has already finished execution. This is the concept of closure.

function outerFunction() {
    let outerVariable = 'I am from outer function';
    
    function innerFunction() {
      console.log(outerVariable);  // Accessing the variable from the outer function
    }
    
    return innerFunction;
  }
  
  const closureExample = outerFunction();  // outerFunction returns innerFunction
  closureExample();  
  

  function createFunctions() {
    var result = [];
    for (let i = 0; i < 5; i++) {
      result.push(function() {
        console.log(i);
      });
    }
    return result;
  }
  
  const funcs = createFunctions();
  funcs.forEach(fn => fn());  