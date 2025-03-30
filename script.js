const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const cities = {
    sanFrancisco: { latitude: 37.7749, longitude: -122.4194, name: "San Francisco" },
    newYork: { latitude: 40.7128, longitude: -74.0060, name: "New York" },
    hongKong: { latitude: 22.3193, longitude: 114.1694, name: "Hong Kong" },
    singapore: { latitude: 1.3521, longitude: 103.8198, name: "Singapore" },
    paris: { latitude: 48.8566, longitude: 2.3522, name: "Paris" }
};

const temperatureTab = document.getElementById('temperature-tab');
const conditionsTab = document.getElementById('conditions-tab');
const temperatureData = document.getElementById('temperature-data');
const conditionsData = document.getElementById('conditions-data');

// Fetch and display temperature data
function fetchTempData() {
    Object.keys(cities).forEach(cityKey => {
        const city = cities[cityKey];
        fetch(BASE_URL + `?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FNew_York`)
            .then(response => response.json())
            .then(data => {
                // Get current temperature
                const temperature = data.hourly.temperature_2m[0];
                const cityElement = document.createElement('div');
                cityElement.classList.add('weather-item');
                cityElement.innerHTML = `
                    <h3>${city.name}</h3>
                    <p>${temperature}°F</p>
                `;
                temperatureData.appendChild(cityElement);
            });
    });
}

// Fetch and display weather conditions
function fetchConditionsData() {
    Object.keys(cities).forEach(cityKey => {
        const city = cities[cityKey];
        fetch(BASE_URL + `?latitude=${city.latitude}&longitude=${city.longitude}&hourly=weathercode&timezone=America%2FNew_York`)
            .then(response => response.json())
            .then(data => {
                // Get weather condition
                const conditionCode = data.hourly.weathercode[0];
                // Default condition
                let conditionText = "Clear";
                switch (conditionCode) {
                    case 1:
                        conditionText = "Clear";
                        break;
                    case 2:
                        conditionText = "Partly Cloudy";
                        break;
                    case 3:
                        conditionText = "Cloudy";
                        break;
                    case 4:
                        conditionText = "Rainy";
                        break;
                    default:
                        conditionText = "Unknown";
                }
                const cityElement = document.createElement('div');
                cityElement.classList.add('weather-item');
                cityElement.innerHTML = `
                    <h3>${city.name}</h3>
                    <p>${conditionText}</p>
                `;
                conditionsData.appendChild(cityElement);
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Fetch temperature data for the home page
    if (temperatureData) {
        fetchTempData();
    }
    // Fetch weather conditions for the conditions page
    if (conditionsData) {
        fetchConditionsData(); 
    }
});
