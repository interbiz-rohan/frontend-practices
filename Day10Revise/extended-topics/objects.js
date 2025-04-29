
// 1. What is an object?
const user = {};

// 2. Object literal syntax {}
const person = {
  name: "Ravi",
  age: 25,
};

// 3. Accessing properties (dot . and bracket [] notation)
console.log("Dot notation:", person.name);
console.log("Bracket notation:", person["age"]);

// 4. Adding, updating, deleting properties
person.city = "Raipur";        // add
person.age = 26;               // update
delete person.city;            // delete
console.log("Updated person:", person);

// 5. Property shorthand
const name = "Rohit", age = 30;
const employee = { name, age }; // { name: "Rohit", age: 30 }
console.log("Property shorthand:", employee);

// 6. Computed property names
const dynamicKey = "country";
const data = { [dynamicKey]: "India" };
console.log("Computed property:", data);

// 7. Checking property existence
console.log("name" in person);               // true
console.log(person.hasOwnProperty("city"));  // false


// 8. Object methods (functions inside objects)
const car = {
  brand: "Toyota",
  start() {
    console.log(`${this.brand} car started!`);
  },
};
car.start();

// 9. `this` keyword in object methods
const player = {
  name: "Virat",
  greet() {
    console.log(`Hello, ${this.name}`);
  },
};
player.greet();

// 10. Iterating objects
for (let key in player) {
  console.log("for...in:", key, player[key]);
}
console.log("Object.keys:", Object.keys(player));
console.log("Object.values:", Object.values(player));
console.log("Object.entries:", Object.entries(player));

// 11. Destructuring objects
const { name: playerName, greet } = player;
console.log("Destructured name:", playerName);

// 12. Spread (...obj) and Rest (...rest)
const details = { ...person, city: "Mumbai" };
console.log("Spread:", details);
const { city, ...restDetails } = details;
console.log("Rest:", restDetails);

// 13. Object cloning (shallow and deep copy)
const shallowCopy = { ...person };
const deepCopy = JSON.parse(JSON.stringify(person));
console.log("Shallow copy:", shallowCopy);
console.log("Deep copy:", deepCopy);


// 14. Object.freeze(), Object.seal(), Object.preventExtensions()
const freezeObj = { a: 1 };
Object.freeze(freezeObj);
freezeObj.a = 100; // ignored
console.log("Freeze:", freezeObj);

const sealObj = { b: 2 };
Object.seal(sealObj);
sealObj.b = 200; // update allowed
delete sealObj.b; // delete not allowed
console.log("Seal:", sealObj);

const preventExtObj = { c: 3 };
Object.preventExtensions(preventExtObj);
preventExtObj.d = 4; // adding not allowed
console.log("Prevent Extensions:", preventExtObj);

// 15. Object.assign()
const obj1 = { x: 1 };
const obj2 = { y: 2 };
const merged = Object.assign({}, obj1, obj2);
console.log("Object.assign:", merged);

// 16. Prototype and Prototypal Inheritance
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  console.log(`${this.name} makes a noise.`);
};
const dog = new Animal("Dog");
dog.speak();

// 17. Constructor functions
function Student(name, roll) {
  this.name = name;
  this.roll = roll;
}

const stu1 = new Student("Ravi", 101);
console.log("Constructor:", stu1);

// 18. new keyword with objects
// (already shown above with Student())

// 19. Object.create()
const parentObj = { greet: function() { console.log("Hello from parent"); }};
const childObj = Object.create(parentObj);
childObj.name = "Child";
childObj.greet();

// 20. Getters and Setters
const personWithAge = {
  _age: 25,
  get age() {
    return this._age;
  },
  set age(val) {
    if (val > 0) this._age = val;
  },
};

personWithAge.age = 30;
console.log("Getter & Setter:", personWithAge.age);

// 21. Symbols as property keys
const symKey = Symbol('id');
const symObj = {
  [symKey]: 123
};
console.log("Symbol property:", symObj[symKey]);


// 22. Private properties via closure
function SecretHolder(secret) {
  let _secret = secret;
  return {
    getSecret: function() { return _secret; },
    setSecret: function(newSecret) { _secret = newSecret; }
  };
}
const secretObj = SecretHolder("hidden!");
console.log("Private via closure:", secretObj.getSecret());
secretObj.setSecret("revealed!");
console.log("Private updated:", secretObj.getSecret());


// 23. Shallow vs Deep Copying
const original = { user: { name: "Alex" } };
const shallow = { ...original };
shallow.user.name = "Max";
console.log("Shallow Copy Modified:", original); // original also changes!
const deep = JSON.parse(JSON.stringify(original));
deep.user.name = "ChangedAgain";
console.log("Deep Copy Modified:", original); // original stays same

// -------------------- End of File --------------------

