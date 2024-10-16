const API_KEY = 'd3ae7b0e9c79428eaca92717241510';
const DEFAULT_CITY = 'Dhaka';

const current = (cityName = DEFAULT_CITY) => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const { location, current } = data;
            const { name, country, localtime } = location;
            const { humidity, temp_c, wind_kph, condition } = current;

            document.getElementById('cityName').textContent = name;
            document.getElementById('country').textContent = country;
            document.getElementById('localTime').textContent = localtime;
            document.getElementById('day').textContent = getDayOfWeek();
            document.getElementById('humidity').textContent = humidity;
            document.getElementById('windKph').textContent = wind_kph;
            document.getElementById('temperature').textContent = temp_c;
            document.getElementById('condition-weather').textContent = condition.text;
            document.getElementById('icon').src = condition.icon;
        })
        .catch(error => console.log('Error fetching weather data: ', error));
    
    forecast(cityName);
};

const forecast = (cityName = DEFAULT_CITY) => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=5&aqi=no&alerts=no`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const { forecastday } = data.forecast;
            const forecastContainer = document.getElementById('forecast');
            forecastContainer.innerHTML = ''; 

            forecastday.forEach(({ date, day }) => {
                const { avghumidity, avgtemp_c, condition, maxtemp_c } = day;
                const { text, icon } = condition;

                const forecastDiv = document.createElement('div');
                forecastDiv.classList.add('forecastContainer');

                forecastDiv.innerHTML = `
                    <img class="iconElement" src="${icon}" alt="${text}">
                    <p class="dateElement">${date}</p>
                    <p>${text}</p>
                    <p>Humidity: ${avghumidity}%</p>
                    <p>Avg Temperature: ${avgtemp_c}&deg;C</p>
                    <p>Max Temperature: ${maxtemp_c}&deg;C</p>
                `;

                forecastContainer.appendChild(forecastDiv);
            });
        })
        .catch(error => console.log('Error fetching weather data: ', error));
};

const getDayOfWeek = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
};

function weather() {
    const cityName = document.getElementById('searchLocation').value;
    current(cityName);
}

current();
