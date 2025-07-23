const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=5.58&lon=-0.20&units=metric&appid=d562222067538f353d1f84912fe03a62'

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error status ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Could not fetch data:', error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    captionDesc.textContent = `${desc}`
}

(async () => {
    const weatherData = await apiFetch();
    if (weatherData) {
        console.log('Fetched weather data for display:', weatherData);
        displayResults(weatherData);
    } else {
        console.log('Failed to get weather data, skipping display.');
    }
})();