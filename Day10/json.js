const obj = {
    name: "Ravi",
    age: 25,
    greet: function () {
      console.log("Hello!");
    },
    secret: undefined,
    id: Symbol('id')
  };

  console.log(obj);
  
  const jsonString = JSON.stringify(obj);
  console.log("Removed silently unsupported data"+jsonString);


  console.log("Filter field in json", JSON.stringify(obj,["name"]))


  console.log("Filter field in json with call back", JSON.stringify(obj,(key,value)=>{
    if (key === "" || key === "name") return value; // <-- root allowed
    return undefined;
  }))