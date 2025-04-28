// 1. Basic Class Structure

console.log("\n--- Basic Class Structure ---");

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const person1 = new Person("Ravi", 25);
person1.greet();

// 2. Inheritance

console.log("\n--- Inheritance ---");

class Employee extends Person {
  constructor(name, age, role) {
    super(name, age); // important: call parent's constructor
    this.role = role;
  }

  work() {
    console.log(`${this.name} is working as a ${this.role}.`);
  }
}

const emp1 = new Employee("Ravi", 26, "Developer");
emp1.greet(); // inherited method
emp1.work();  // child method

// 3. Method Overriding

console.log("\n--- Method Overriding ---");

class Manager extends Employee {
  constructor(name, age, department) {
    super(name, age, "Manager");
    this.department = department;
  }

  work() { // overriding work()
    console.log(`${this.name} manages the ${this.department} department.`);
  }
}

const mgr1 = new Manager("Ravi", 30, "IT");
mgr1.greet();
mgr1.work(); // overridden method

// 4. Why Method Overloading Not Supported

console.log("\n--- Why Method Overloading is Not Supported ---");

class Calculator {
  add(a, b) {
    return a + b;
  }

  // If you define another add(), it will override the first one.
  add(a, b, c) {
    return a + b + c;
  }
}

const calc = new Calculator();
console.log("Addition (method overloading not real):", calc.add(2, 3)); // NaN because c is undefined


// 5. Private Fields/Methods

console.log("\n--- Private Fields and Methods ---");

class Account {
  #balance = 0; // private field

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`${this.owner} deposited ${amount}. Current balance: ${this.#balance}`);
    }
  }

  #calculateInterest() { // private method
    return this.#balance * 0.05;
  }

  showInterest() {
    console.log(`Interest earned: ${this.#calculateInterest()}`);
  }
}

const acc = new Account("Ravi");
acc.deposit(1000);
acc.showInterest();
// console.log(acc.#balance); // Private field cannot be accessed outside

// 6. Static Methods

console.log("\n--- Static Methods ---");

class MathHelper {
  static add(x, y) {
    return x + y;
  }

  static multiply(x, y) {
    return x * y;
  }
}

console.log("Static Add:", MathHelper.add(5, 10));
console.log("Static Multiply:", MathHelper.multiply(3, 4));

// Cannot call static methods from instance
// const helper = new MathHelper();
// helper.add(5, 10); // Error: add is not a function

