// const apiKey = "d3ae7b0e9c79428eaca92717241510";
// const location = "Dhaka";
// console.log(location)

// fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`)
// .then(res=>res.json())
// .then(data=>console.log(data));


const current = fetch('http://api.weatherapi.com/v1/current.json?key=d3ae7b0e9c79428eaca92717241510&q=London&aqi=no')
.then(response=>response.json())
.then(data=>{
    console.log(data);

    const country = data.location.country;
    const cityName = data.location.name;
    const localTime = data.location.localtime;
    const humidity = data.current.humidity;
    const temperature = data.current.temp_c;
    const wind_kph = data.current.wind_kph;

    // document.getElementById('city-name').innerHTML = cityName;
})