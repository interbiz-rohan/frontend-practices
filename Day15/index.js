"use strict";
function merge(obj1, obj2) {
    return Object.assign(Object.assign({}, obj1), obj2);
}
const result = merge({ age: 30 }, { name: "Alice" });
// result has type: { name: string; age: number; }
console.log(result);
