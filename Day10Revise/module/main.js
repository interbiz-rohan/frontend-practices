// Import everything from helpers
import add, { multiply, greet, config, user } from './helpers.js';

console.log(" Add:", add(10, 5)); // Default export
console.log("Multiply:", multiply(10, 5)); // Named export
console.log("Greet:", greet("Ravi")); // Arrow function export
console.log("Config:", config); // Exporting object
console.log("User:", user); // Exporting static object

// Dynamic Import Example (Lazy loading)
async function loadDynamicModule() {
  const module = await import('./helpers.js');
  console.log("Dynamic import (multiply):", module.multiply(4, 5));
}
loadDynamicModule();

