const factorial = function fact(n) {
    return n <= 1 ? 1 : n * fact(n - 1);
  };
  
  console.log(factorial(5)); // 120
  


  console.log("\n -------------- Function arguments \\n\n")

  function sumAll() {
    console.log(arguments.length)
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
      total += arguments[i];
    }
    console.log(sumAll.length)
    console.log(`Hello , ${Object.values(arguments).join(" ")}`)
    return total;
  }
  
  console.log(sumAll(2, 5, 7, 1)); // 15
  

  console.log("\n End -------------- Function arguments \\n\n")


  function greet(greeting = "Hi", ...names) {
  console.log(names.map(name => `${greeting}, ${name}`));
  }

  greet("Hello",
    'rohan' , "Rishabh" , "Amaan"
  )


  function get(){
    console.log("this function get called")
  }


  