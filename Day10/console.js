// File: console-debugging-demo.js

// 1. Basic log
console.log("Starting Application 🚀");

// 2. Error and warning
console.error("This is a fake error! ❗");
console.warn("This is a warning! ⚠️");

// 3. Displaying object nicely
const user = {
  name: "Ravi",
  age: 25,
  role: "Developer",
};
console.log("User Info:", user);

// 4. Table format
const users = [
  { name: "Ravi", age: 25 },
  { name: "John", age: 30 },
];
console.table(users);

// 5. Directory view (useful for DOM)
// console.dir(document.body);

// 6. Grouping logs
console.group("User Details Group");
console.log("Name:", user.name);
console.log("Age:", user.age);
console.groupEnd();

// 7. Assertion
const balance = -10;
console.assert(balance >= 0, "💥 Balance should not be negative!");

// 8. Timing code execution
console.time("Processing Time");
for (let i = 0; i < 1000000; i++) {
  // Simulate processing
}
console.timeEnd("Processing Time");

// 9. Counting how many times function called
function simulateLogin() {
  console.count("Login Attempt");
}
simulateLogin();
simulateLogin();
simulateLogin();
console.countReset("Login Attempt");
simulateLogin();

// 10. Styled log
console.log("%c Styled Important Message", "color: white; background-color: blue; font-size: 16px; padding: 4px;");

// 11. Trace function calls (call stack trace)
function first() {
  second();
}
function second() {
  third();
}
function third() {
  console.trace("Trace at third()");
}
first();

// 12. Clear console
// Uncomment next line if you want to clear logs
// console.clear();
