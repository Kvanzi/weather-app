let weather = {
    'apikey': '8f8f18aace634572991f1640a256ed55',
    fetchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);

        document.querySelector('.city').innerText = `Weather in ${name}`;
        document.querySelector('.temp').innerText = `${Math.round(temp)}°`;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind speed: ${speed}km/h`;
    }
};

const findMyState = () => {

    const succes = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude${latitude}&longitude${longitude}localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            weather.fetchWeather(data.city);
        })
    }
    const error = () => {
        document.querySelector('.geo').innerText = 'Unnable for your state';
    }

    navigator.geolocation.getCurrentPosition(succes, error);
}

findMyState();