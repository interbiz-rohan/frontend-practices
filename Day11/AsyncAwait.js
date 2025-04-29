// Dummy API URLs
const userAPI = 'https://jsonplaceholder.typicode.com/users/1';
const postsAPI = 'https://jsonplaceholder.typicode.com/posts?userId=1';

// Function to fetch user data
async function fetchUserData() {
  try {
    // Awaiting the fetch response for user data
    let response = await fetch(userAPI);
    
    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    // Awaiting the JSON data from the response
    let userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

// Function to fetch posts data
async function fetchUserPosts() {
  try {
    // Awaiting the fetch response for posts data
    let response = await fetch(postsAPI);
    
    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error('Failed to fetch posts data');
    }

    // Awaiting the JSON data from the response
    let postsData = await response.json();
    return postsData;
  } catch (error) {
    console.error('Error fetching posts data:', error);
  }
}

// Main async function to handle data fetching
async function fetchData() {
  try {
    // Fetching user and posts data in parallel
    let userDataPromise = await fetchUserData();
    let postsDataPromise = await fetchUserPosts();

    // Wait for both promises to resolve
    let [userData, postsData] = await Promise.all([userDataPromise, postsDataPromise]).then();

    // Display user data
    console.log('User Data:', userDataPromise);

    // Display posts data
    console.log('Posts Data:', postsDataPromise);

  } catch (error) {
    // Catching any error from the asynchronous operations
    console.error('Error during data fetching:', error);
  } finally {
    // Clean-up action that always runs
    console.log('Data fetching process is complete.');
  }
}

// Call the fetchData function
fetchData();

