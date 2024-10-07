const apiKey = '6604d65fedc1c7273184507ba41e5b9b'; // Your OpenWeather API key

// Function to get current weather data and hourly forecast based on city name
function getWeather() {
  const city = document.getElementById('city-input').value; // Get the city from the input field
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  // Fetch the current weather data from the OpenWeather API
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert('City not found! Please enter a valid city name.');
        return;
      }

      // Update the weather information on the page
      document.getElementById('city-name').innerText = data.name;
      document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
      document.getElementById('description').innerText = data.weather[0].description; // Weather description
      document.getElementById('icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Set weather icon
      document.getElementById('city-name').style.display = 'block';
      document.getElementById('temperature').style.display = 'block';
      document.getElementById('description').style.display = 'block';
      document.getElementById('icon').style.display = 'block';

      // Fetch the hourly forecast data from the OpenWeather API
      return fetch(forecastUrl);
    })
    .then(response => response.json())
    .then(data => {
      const hourlyData = data.list.slice(0, 8); // Get the next 8 periods
      displayHourlyForecast(hourlyData); // Function to display the hourly data
    })
    .catch(error => {
      console.error('Error fetching the weather data:', error);
      alert('Failed to fetch the weather data. Please try again later.');
    });
}

// Event listener for Enter key on the input field
document.getElementById('city-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') { // Check if the pressed key is Enter
    console.log("Enter key pressed"); // Debugging line
    event.preventDefault(); // Prevent default form submission
    getWeather(); // Call the getWeather function
  }
});

// Function to display hourly forecast
function displayHourlyForecast(hourlyData) {
  const forecastContainer = document.querySelector('.hourly-forecast'); // Updated to use class selector
  
  // Clear previous content
  forecastContainer.innerHTML = '';

  // Loop through each hour and display its data
  hourlyData.forEach(hour => {
    const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Corrected time format
    const temp = Math.round(hour.main.temp);
    const iconUrl = `http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`; // Get weather icon URL

    // Create an HTML element for each hour without weather description
    const hourlyItem = `
      <div class="hour">
        <p>${time}</p>
        <img src="${iconUrl}" alt="Weather icon" /> <!-- Hourly weather icon -->
        <p>${temp}°C</p>
      </div>
    `;

    // Add each hourly forecast to the container
    forecastContainer.innerHTML += hourlyItem;
  });

  // Show the hourly forecast container
  forecastContainer.style.display = 'flex';
}



