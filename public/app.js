
const current = (cityName = 'Dhaka') => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=d3ae7b0e9c79428eaca92717241510&q=${cityName}&aqi=no`)
        .then(response => response.json())
        .then(data => {
            if (!data) {
                throw new Error(`Data not found!`);
            }

            console.log(data);

            const country = data.location.country;
            const cityName = data.location.name;
            const localTime = data.location.localtime;
            const humidity = data.current.humidity;
            const temperature = data.current.temp_c;
            const wind_kph = data.current.wind_kph;
            const condition = data.current.condition.text;
            const icon = data.current.condition.icon;

            document.getElementById('cityName').innerHTML = cityName;
            document.getElementById('country').innerHTML = country;
            document.getElementById('localTime').innerHTML = localTime;
            document.getElementById('humidity').innerHTML = humidity;
            document.getElementById('windKph').innerHTML = wind_kph;
            document.getElementById('temperature').innerHTML = temperature;
            document.getElementById('condition-weather').innerHTML = condition;
            document.getElementById('icon').src = icon;
        })
        .catch(error=>console.log('Error fetching weather data: ',error));
}

current();

function weather() {
    const cityName = document.getElementById('searchLocation').value;
    current(cityName);
}