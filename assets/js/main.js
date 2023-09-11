
//ERROR HANDLING: ISSUE:16
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

//CURRENT WEATHER: ISSUE: 9
function getCurrentWeather() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=57.048820&lon=9.921747&appid=1c8284d2cba51f9f680a3c09e5602ea8`;
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  getCurrentWeather();

  //TIMETABLE FOR SELECTED DAY: ISSUE 12

  function getTimeTableForNextDays() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=57.048820&lon=9.921747&appid=1c8284d2cba51f9f680a3c09e5602ea8`;
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  getTimeTableForNextDays();


