// Simulate fetching user data from an API using Promises
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
      console.log(`Fetching data for user ID: ${userId}...`);
  
      // Simulate a network delay
      setTimeout(() => {
        if (userId === 1) {
          // Simulate a successful fetch operation
          resolve({
            id: userId,
            name: 'John Doe',
            age: 30,
          });
        } else if (userId === 2) {
          // Simulate another successful fetch with different data
          resolve({
            id: userId,
            name: 'Jane Smith',
            age: 25,
          });
        } else {
          resolve({
            id: userId,
            name: 'Jane parker',
            age: 25,
          });
          // Simulate a failure for invalid user ID
            reject(`User with ID ${userId} not found!`);
        }
      }, 2000); // Simulate a 2-second delay (network request)
    });
  }
  
  // Handle the result of the promise
  function handleUserData() {

    fetchUserData(1)
      .then((userData) => {
        console.log('Successfully fetched user data:', userData);
        throw new Error("Error message")
        return userData; // Return data to pass to the next step
      })
      .then((userData) => {
        console.log(`Welcome ${userData.name}, Age: ${userData.age}`);
        return userData; // Continue passing the result to next step
      })
      .catch((error) => {
        console.error('Error occurred while fetching user data:', error);
      });
  
    fetchUserData(3)
      .then((userData) => {
        console.log('Successfully fetched user data:', userData);
      })
      .catch((error) => {
        console.error('Error occurred while fetching user data:', error); // This will catch the rejection
      });
  
    fetchUserData(2)
      .then((userData) => {
        console.log('Successfully fetched user data:', userData);
      })
      .catch((error) => {
        console.error('Error occurred while fetching user data:', error);
      });

     Promise.all([fetchUserData(1),fetchUserData(2),fetchUserData(3)]).then((result)=>{
        console.log(result)
        result.forEach((value)=>{
            console.log(value)
        })
     }).catch((error)=>console.error(error))
  }
  
  // Call the function to execute the promise handling logic
  handleUserData();
  
//   Promise((resolve,reject)=>{

//   })
