let weather = {
    'apikey': '8f8f18aace634572991f1640a256ed55',
    fetchWeather(city) {
            localStorage.setItem('city', city);
            document.querySelector('.err').innerText = '';
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
            document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${city}')`;
    },
    displayWeather(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector('.city').innerText = `Weather in ${name}`;
        document.querySelector('.temp').innerText = `${Math.round(temp)}°`;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind speed: ${speed}km/h`;
    },
    search() {
        this.fetchWeather(document.querySelector('.search-bar').value);
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
        });
    }
    const error = () => {
        document.querySelector('.err').innerText = 'Something went wrong :( Try to find your city in the box above.';
    }

    navigator.geolocation.getCurrentPosition(succes, error);
}

document.querySelector('.search-bar').addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        weather.search();
    }
});

document.querySelector('.search__button').addEventListener('click', () => {
    weather.search();
});

const city = localStorage.getItem('city');

if (city === null || city === 'null') { findMyState() }  else { weather.fetchWeather(city) }