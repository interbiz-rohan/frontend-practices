function merge<T, U>(obj1: U, obj2: T): T {
    return { ...obj1, ...obj2 };
}


  
  const result = merge<{name:string},{age:number}>( { age: 30 },{ name: "Alice" });
  // result has type: { name: string; age: number; }
  console.log(result); 