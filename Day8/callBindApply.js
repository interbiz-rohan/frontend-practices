function greeting(name){
    console.log(`${this.greet} ${name}`)
}

greeting.call({greet:"hello"},"rohan")

// Call send one more orgument as its object which we can access through this 

greeting.apply({greet:"hello"},["somebody"])

// Call send one more orgument as its object which we can access through this , but other argument will be in array 

const person = {
    greet: "Eva",
    greeting
  };

person.greeting("Binding name")

const bindFunction=person.greeting.bind(person)

bindFunction("Binding Name")

function name(a,a){
    console.log(a,a)
}

name("this","that")


document.getElementById("")