function handleError(error) {
    // Handle the error and display an alert message
    alert('Oops, something is rotten here... Error: ' + error.message);
  }
  
  try {
    // Your code that might throw an error
  } catch (error) {
    // Call the error-handling function
    handleError(error);
  }