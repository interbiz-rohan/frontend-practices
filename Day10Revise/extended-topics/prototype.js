
// In JavaScript, everything (almost) is an object.

// Every JavaScript object has a hidden property called [[Prototype]] (or simply prototype).

// Prototype is like a backup storage — if an object doesn't have a property or method, JavaScript will look up to its prototype to find it.

// "Prototype is an object from which other objects can inherit properties and methods."

//  Objects can borrow methods or properties from their prototype chain.

function Person(name) {
  this.name = name;
}

// Adding a method to prototype
Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}`);
};

const person1 = new Person("Ravi");
const person2 = new Person("Neha");

person1.sayHello(); // Hello, my name is Ravi
person2.sayHello(); // Hello, my name is Neha

console.log("Prototype of person1:", Object.getPrototypeOf(person1));
console.log("Prototype of person1:", person1.__proto__);


function Employee(name, job) {
  Person.call(this, name); // Inherit name property
  this.job = job;
}

// Inherit Person methods
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Adding new method to Employee
Employee.prototype.work = function() {
  console.log(`${this.name} is working as a ${this.job}`);
};

const emp1 = new Employee("Rohan", "Developer");
emp1.sayHello(); // Hello, my name is Rohan
emp1.work();     // Rohan is working as a Developer


console.log(emp1 instanceof Employee); // true
console.log(emp1 instanceof Person);   // true


Employee.prototype.sayHello = function() {
  console.log(`Hi, I'm ${this.name} and I work as ${this.job}`);
};

emp1.sayHello(); // Hi, I'm Rohan and I work as Developer


const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  }
};

const rabbit = Object.create(animal);
rabbit.hops = true;

rabbit.walk(); // Animal walks
console.log(rabbit.eats); // true
console.log(Object.getPrototypeOf(rabbit) === animal); // true


const car = { wheels: 4 };
const bike = {};

Object.setPrototypeOf(bike, car);
console.log(bike.wheels); // 4 (from car)

console.log(Object.getPrototypeOf(bike)); // car object


const bird = {};
bird.__proto__ = animal;
console.log(bird.eats); // true


Array.prototype.customMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(this[i]);
  }
  return result;
};

const nums = [1, 2, 3];
const doubled = nums.customMap(n => n * 2);
console.log(doubled); // [2, 4, 6]


const grandparent = { country: "India" };
const parent = Object.create(grandparent);
parent.city = "Raipur";

const child = Object.create(parent);
child.name = "Ravi";

console.log(child.name);      // Ravi (own)
console.log(child.city);      // Raipur (parent)
console.log(child.country);   // India (grandparent)


const base = {};
Object.freeze(base); // No modifications allowed
// base.newProp = 123; //  Error in strict mode

console.log("Base object after freeze:", base);
