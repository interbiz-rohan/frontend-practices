

console.log("\n \n union in set \n \n")

let setObj2 = new Set();
let arr1 = [1,2] , arr2=[2,3];

console.log("arr1 - ", arr1 , "arr2 - ", arr2);
setObj2.add(new Set([...arr1,...arr2]))
console.log("After union - " ,setObj2)


console.log("\n \n Intersection in set \n \n")
let arr3 = [1,2,3] , arr4=[2,3,4];
console.log("arr3 - ", arr3 , "arr4 - ", arr4);
setObj2.clear()
setObj2.add(new Set([...arr3].filter((value)=>arr4.includes(value))))
console.log("After Intersection - " ,setObj2)

setObj2.clear()


console.log("\n \n hasuniques string \n \n")

let str="hello";
setObj2.clear()
setObj2.add(new Set(Array.from(str)))
console.log("Has unique", setObj2.size==str.length)

