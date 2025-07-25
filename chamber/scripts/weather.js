const currentWeather = document.querySelector('#current-weather');
const forecastWeather = document.querySelector('#w-forecast');
// const weatherIcon = document.querySelector('#weather-icon');
// const captionDesc = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=5.58&lon=-0.20&units=metric&appid=d562222067538f353d1f84912fe03a62'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=5.58&lon=-0.20&units=metric&appid=d562222067538f353d1f84912fe03a62'

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

async function fetchFore() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error(`HTTP error status ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error('Could not fetch data:', error);
    }
}

function getDayName(dateStr) {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        return 'Invalid Date'
    }

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return days[date.getDay()];
}

function displayResults(data, foreData) {
    currentWeather.innerHTML = `
        <p class="temperature">${data.main.temp}&deg;C</p>
        <p class="conditions">${data.weather[0].description}</p>
        <p>High: ${data.main.temp_max}&deg;C Low: ${data.main.temp_min}&deg;C</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;

    const initDayArr = foreData.list[0].dt_txt.split(' ');
    let initDay = initDayArr[0];
    let dayOne = '';
    let dayOneDay = '';
    let dayOneTemp = '';
    let dayTwo = '';
    let dayTwoTemp = '';
    let dayTwoDay = '';
    let dayThree = '';
    let dayThreeTemp = '';
    let dayThreeDay = '';
    foreData.list.forEach(forecastHour => {
        let datetimeStrArr = forecastHour.dt_txt.split(' ')
        if (dayOne == '') {
            if (datetimeStrArr[0] != initDay) {
                dayOne = datetimeStrArr[0];
                dayOneDay = getDayName(dayOne);
                dayOneTemp = forecastHour.main.temp;
            }
        } else if (dayOne != '' && dayTwo == '') {
            if (datetimeStrArr[0] != dayOne) {
                dayTwo = datetimeStrArr[0];
                dayTwoDay = getDayName(dayTwo);
                dayTwoTemp = forecastHour.main.temp;
            }
        } else if (dayTwo != '' && dayThree == '') {
            if (datetimeStrArr[0] != dayTwo) {
                dayThree = datetimeStrArr[0];
                dayThreeDay = getDayName(dayThree);
                dayThreeTemp = forecastHour.main.temp;
            }
        }
    });

    forecastWeather.innerHTML = `
        <h2>Weather Forecast</h2>
        <p>${dayOneDay}: ${dayOneTemp}°C</p>
        <p>${dayTwoDay}: ${dayTwoTemp}°C</p>
        <p>${dayThreeDay}: ${dayThreeTemp}°C</p>
    `;
    // const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    // let desc = data.weather[0].description;
    // weatherIcon.setAttribute('src', iconsrc);
    // captionDesc.textContent = `${desc}`
}

(async () => {
    const weatherData = await apiFetch();
    const forecast = await fetchFore();
    if (weatherData && forecast) {
        displayResults(weatherData, forecast);
    } else {
        console.log('Failed to get weather data, skipping display.');
    }
})();