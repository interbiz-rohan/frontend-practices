// Default export
export default function add(a, b) {
    return a + b;
  }
  
  // Named exports
  export function multiply(a, b) {
    return a * b;
  }
  
  export const greet = (name) => `Hello, ${name}!`;
  
  // Static object
  export const config = {
    appName: "ModuleDemoApp",
    version: "1.0.0"
  };
  
  // Example to show JSON-like structure
  export const user = {
    name: "Ravi",
    age: 25
  };
  