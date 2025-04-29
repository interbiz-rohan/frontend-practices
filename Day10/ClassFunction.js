import {add} from './module.js'

console.log("under the hood it uses function proof")

class Person{

    constructor(name){
        this.name=name;
    }

    static namePrint(){
      console.log(this.name)
    }

    sayHello(){
        console.log(`hello , ${this.name}`)
    }
}


console.log(typeof Person)

// new Person("Rohan")
// console.log("Name-----",Person.namePrint())


class User{

    constructor(name,age){
        if(!name || !age)
        {
            throw new Error("Both field required")
        }
        this.name=name;
        this.age=age;
    }
}


const user1=new User("Test","No Error");


console.log(" private fields #private \n \n")

class Bank{

    #balance=0;

    constructor(holdername){
        this.holdername=holdername;
    }

    deposit(amount){
        if(amount<0) throw new Error("Amount must be positive");
        this.#balance+=amount;
        console.log("Data set",amount,this.#balance)
    }

    withdraw(amount){
        if(amount>this.#balance){
            console.log("Insufficient funds");
      return;
        }
        this.#balance-=this.amount;
    }

    get balance() { // added this getter
        return this.#balance;
      }

      set balance(amount){
        throw new Error("Direct balance modification is not allowed!");
    }
}

const acc1 = new Bank("Ravi");
acc1.deposit(5000);
console.log(acc1.balance); 

// acc1.balance=100000;
console.log(acc1.balance)

class Animal {
   
    constructor(name) {
      this.name = name;
    }
  
    speak() {
      console.log(`${this.name} makes a noise.`);
    }
  }
  
  class Dog extends Animal {
    constructor(name, breed) {
      super(name); // call parent constructor
      this.breed = breed;
    }
  
    bark() {
      console.log(`${this.name} barks. It's a ${this.breed}`);
    }
  }
  
  const dog1 = new Dog("Tommy", "German Shepherd");
  dog1.speak(); 
  dog1.bark();  
  

  add()