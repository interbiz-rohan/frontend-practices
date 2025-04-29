import {username} from './user.js';
import adminName from './admin.js';

console.log(username);  // Ravi
console.log(adminName); // Admin Ravi

async function loadMath() {
    const module = await import('./user.js');
    console.log(module.default(5, 6)); // 11
    console.log(module.sub(5, 6)); // -1
  }
  
  loadMath();

  JSON.parse("{name: 'Ravi'}"); 
