// SET QUESTIONS
// 🔹 1. Remove Duplicates from Nested Arrays Using Set
// javascript
// Copy
// Edit
// const arr = [1, [2, 3], 1, [2, 3], 4];
// // Expected: [1, [2, 3], 4] without deep equality duplicates
// 🔹 2. Unique Characters in a String (Case-Insensitive)
// javascript
// Copy
// Edit
// const str = "AbcaB";
// // Output: true if all characters are unique ignoring case
// 🔹 3. Check If Two Arrays Have Any Common Elements (Using Set)
// javascript
// Copy
// Edit
// const a = [1, 2, 3, 4];
// const b = [5, 6, 3, 7];
// // Expected output: true (since 3 is common)
// 🔹 4. Count Unique Elements After Multiple Union Operations
// javascript
// Copy
// Edit
// const sets = [
//   new Set([1, 2, 3]),
//   new Set([3, 4]),
//   new Set([5, 1])
// ];
// // Expected: Set with [1,2,3,4,5]
// 🔹 5. Set Equality Check Function (Deep Compare)
// javascript
// Copy
// Edit
// // Write function isEqual(set1, set2) => true if both sets have same elements
// 🔷 ARRAY QUESTIONS
// 🔹 6. Deep Flatten with Deduplication
// javascript
// Copy
// Edit
// const arr = [1, [2, [3, [4]]], 2, [3]];
// // Output: [1, 2, 3, 4] — deeply flattened and unique
// 🔹 7. Find the First Non-Repeating Number in an Array
// javascript
// Copy
// Edit
// const arr = [9, 4, 9, 6, 7, 4];
// // Output: 6
// 🔹 8. Group Elements by Type
// javascript
// Copy
// Edit
// const arr = [1, "hello", true, 3, "world", false];
// // Output:
// // {
// //   number: [1, 3],
// //   string: ["hello", "world"],
// //   boolean: [true, false]
// // }
// 🔶 MAP QUESTIONS
// 🔹 9. Word Frequency Counter (Case-Insensitive, Clean Punctuation)
// javascript
// Copy
// Edit
// const str = "Hello, hello! How are you? Are you okay?";
// // Output: Map { "hello" => 2, "how" => 1, "are" => 2, "you" => 2, "okay" => 1 }
// 🔹 10. Convert an Array of Objects into a Map by Key
// javascript
// Copy
// Edit
// const users = [
//   { id: 1, name: "Ravi" },
//   { id: 2, name: "Neha" }
// ];
// // Output: Map with id as key
// // Map(2) { 1 => { id: 1, name: 'Ravi' }, 2 => { id: 2, name: 'Neha' } }

console.log("solve all questions") 

console.log(...[1,4,3])

const arrVariable = [1,2,3,6,7]
function arr(a,b,c){
console.log(a,b,c);

}

arr(...arrVariable)

console.log("swallow copy")
const user = { name: "Alice", age: 25 };
const cloned = { ...user };
console.log(cloned)

cloned.name="changes name";


console.log(user.name)


console.log("deep copy")

const user2 = [{ name: "Alice", age: 25 }];
const cloned2 = [...user2];
console.log(cloned2)
cloned2[0].name="changes name";


console.log(user2[0].name)


console.log("\n \n ");

let color = "red";

function paint() {
  let color = "blue";

  function mix() {
    let color = "green";
    console.log(color);
  }

  mix();
}

paint();


console.log([1].includes(1))



const arr2= [1,2,3][1,2,3]

console.log(arr2)


const arrNew = [3,6,54,3];

arrNew.splice(2,1,64)

console.log(arrNew)

console.log(arrNew.slice(2,3))

