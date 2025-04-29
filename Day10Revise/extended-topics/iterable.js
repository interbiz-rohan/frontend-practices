console.log("========= ARRAY Iterables =========");
const arr = [10, 20, 30];

// for...of
for (const num of arr) {
  console.log("for...of Array:", num);
}

// entries(), keys(), values()
console.log([...arr.entries()]); // [ [0,10], [1,20], [2,30] ]
console.log([...arr.keys()]);    // [0,1,2]
console.log([...arr.values()]);  // [10,20,30]

// // Manual iterator
// const arrIterator = arr[Symbol.iterator]();
// console.log(arrIterator.next());
// console.log(arrIterator.next());
// console.log(arrIterator.next());
// console.log(arrIterator.next()); // done: true

console.log("========= STRING Iterables =========");
const str = "Hi";

// for...of
for (const char of str) {
  console.log("for...of String:", char);
}



console.log("========= OBJECT Iterables (edge cases) =========");
const obj = { a: 1, b: 2 };

// Objects are NOT directly iterable!
// for (const item of obj) {} // Error: obj is not iterable

// Convert manually:
console.log("Object.keys:", Object.keys(obj));     // [ 'a', 'b' ]
console.log("Object.values:", Object.values(obj)); // [ 1, 2 ]
console.log("Object.entries:", Object.entries(obj)); // [ ['a',1], ['b',2] ]

// Iterate keys
for (const key of Object.keys(obj)) {
  console.log("Key:", key);
}

// Iterate entries
for (const [key, value] of Object.entries(obj)) {
  console.log(`Key: ${key}, Value: ${value}`);
}


// // entries() => [value, value]
// console.log([...mySet.entries()]); // [ ['a','a'], ['b','b'], ['c','c'] ]

console.log("========= MAP Iterables =========");
const myMap = new Map([
  ["name", "Alice"],
  ["age", 25]
]);

// for...of
for (const [key, value] of myMap) {
  console.log(`Map Key: ${key}, Value: ${value}`);
}

// keys(), values(), entries()
console.log([...myMap.keys()]);
console.log([...myMap.values()]);
console.log([...myMap.entries()]);

console.log("========= EDGE CASES =========");

// Empty Array
for (const x of []) {
  console.log("Will not run"); // Won't print anything
}


// Custom Iterable Object

const countdownDecreament={
    from:3,
    [Symbol.iterator](){
        return{
              next:()=>{
                if(this.from>=0)
                    return {value: this.from--,done:false};
                else
                return {done:true}
              }
        }
    }
}

for(let count of countdownDecreament){
    console.log(count);
}