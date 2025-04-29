// Simulating a function that fetches data asynchronously
function fetchData(userId, callback) {
  console.log('Fetching data for user ID:', userId);

  setTimeout(() => {
    const value= Math.random()  ;
    const error = value>0.7? 'Failed to fetch data' : null; // 30% chance of error
    let userData = null;
    console.log("random generated ",value)
    if (!error) {
      userData = {
        id: userId,
        name: 'John Doe',
        age: 30
      };
    }

    callback(error, userData);
  }, 1000);
}

function processUserData(error, userData) {
  if (error) {
    console.error('Error:', error);
    return false;  // Signal error
  }

  if (!userData || !userData.id || !userData.name || !userData.age) {
    console.error('Invalid user data:', userData);
    return false;
  }

  if (typeof userData.age !== 'number' || isNaN(userData.age)) {
    console.error('Invalid age value:', userData.age);
    return false;
  }

  console.log('Successfully fetched user data:', userData);
  return true; // Success
}

fetchData(1, (error1, data1) => {
  const success1 = processUserData(error1, data1);
  if (!success1) return console.log('Stopping 1 due to error.');

  fetchData(2, (error2, data2) => {
    const success2 = processUserData(error2, data2);
    if (!success2) return console.log('Stopping 2 due to error.');

    fetchData(3, (error3, data3) => {
      const success3 = processUserData(error3, data3);
      if (!success3) return console.log('Stopping 3 due to error.');

      fetchData(4, (error4, data4) => {
        const success4 = processUserData(error4, data4);
        if (!success4) return console.log('Stopping 4 due to error.');

        fetchData(5, (error5, data5) => {
          const success5 = processUserData(error5, data5);
          if (!success5) return console.log('Stopping 5 due to error.');

          console.log('All users processed successfully!');
        });
      });
    });
  });
});
