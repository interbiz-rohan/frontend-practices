const getter = ()=>({"Rohan":"kansari"});

console.log(getter())


const obj = {
    name:"Rohan",
    greet: function(){return `Hello , ${this.name}`}
}

console.log(obj.greet())


export const obj2 = {
    name:"Rohan",
    // greet: function(){return `Hello , ${this.name}`}
}

console.log(obj2.greet())


function greet(){
    this.name= arguments[0];
    this.newFunc = function (){
        console.log("new function run using this")
    }
    console.log(arguments)
}

greet(2,3,498,34,39)

const greet2=()=>{

    console.log(this)
}

greet2(2,3,498,34,39)


const construct= new greet("Test Name");
const construct2= new greet("Test Name2");

construct.newFunc()

console.log("constructor 1 and 2 method comparison - ", construct.newFunc==construct2.newFunc)

function greetProto(){
    this.name= arguments[0];
   
    console.log(arguments)
}

const construct3= new greetProto("Test Name");
const construct4= new greetProto("Test Name2");

greet.prototype.newFunc=  function (){
    console.log("new function run using this")
}

construct.newFunc()

console.log("constructor 1 and 2 method comparison - ", construct3.newFunc==construct4.newFunc)

