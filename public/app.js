
const current = (cityName = 'Dhaka') => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=d3ae7b0e9c79428eaca92717241510&q=${cityName}&aqi=no`)
        .then(response => response.json())
        .then(data => {
            if (!data) {
                throw new Error(`Data not found!`);
            }

            console.log(data);
            const { location, current } = data;
            const { name, country, localtime } = location;
            const { humidity, temp_c, wind_kph, condition, } = current;

            const cityName = name;
            const date = new Date();
            const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const day = dayOfWeek[date.getDay()];

            document.getElementById('cityName').innerHTML = cityName;
            document.getElementById('country').innerHTML = country;
            document.getElementById('localTime').innerHTML = localtime;
            document.getElementById('day').innerHTML = day;
            document.getElementById('humidity').innerHTML = humidity;
            document.getElementById('windKph').innerHTML = wind_kph;
            document.getElementById('temperature').innerHTML = temp_c;
            document.getElementById('condition-weather').innerHTML = condition.text;
            document.getElementById('icon').src = condition.icon;


            
        })
        
        .catch(error => console.log('Error fetching weather data: ', error));
        forecast();
}


const forecast = (cityName = "Dhaka") => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=d3ae7b0e9c79428eaca92717241510&q=${cityName}&days=5&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {
            if (!data) {
                throw new Error(`Data not found!`);
            }

            // console.log(data);
            const { forecast } = data;
            const { forecastday } = forecast;
            // console.log(forecastday);
            document.getElementById('forecast').innerHTML = '';
            forecastday.map((forecast) => {
                // console.log(idx,forecast.day);
                // const forecastContainer = document.getElementById('forecast');
                const { date, day } = forecast;

                const { avghumidity, avgtemp_c, condition, maxtemp_c } = day;
                const { text,icon} = condition;

                // console.log(day)
                // document.getElementById('forecast').innerHTML = '';

                const forecastContainer = document.createElement('div');

                const dateElement = document.createElement('p');
                const averageHumidityElement = document.createElement('p'); 
                const averageTemparatureElement = document.createElement('p'); 
                const maxTemparatureElement = document.createElement('p');
                const textElement = document.createElement('p');
                const iconElement = document.createElement('img');

                const dateContainer = document.createElement('div');
                iconElement.classList.add('iconElement')
                dateElement.classList.add('dateElement');

                dateContainer.appendChild(dateElement);
                iconElement.src = icon;
                dateElement.innerHTML = date;
                textElement.innerHTML = text;
                averageHumidityElement.innerHTML ="Humidity: "+avghumidity+"";
                averageTemparatureElement.innerHTML = "avgTemperature:"+ avgtemp_c+"&deg;C";
                maxTemparatureElement.innerHTML = "maxTemperature:"+maxtemp_c+"&deg;C";

                
                forecastContainer.appendChild(iconElement);
                forecastContainer.appendChild(dateElement);
                forecastContainer.appendChild(textElement);
                forecastContainer.appendChild(averageHumidityElement);
                forecastContainer.appendChild(averageTemparatureElement);
                forecastContainer.appendChild(maxTemparatureElement);

                forecastContainer.classList.add('forecastContainer');

                // document.getElementById('forecast').innerHTML = '';
                document.getElementById('forecast').appendChild(forecastContainer);



            })


        })
        .catch(error => console.log('Error fetching weather data: ', error));
}


current();
// forecast();

function weather() {
    const cityName = document.getElementById('searchLocation').value;
    current(cityName);
    forecast(cityName);
}


