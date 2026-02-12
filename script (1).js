const apiKey = "YOUR_API_KEY_HERE"; // OpenWeather API Key

const loading = document.getElementById("loading");
const errorMsg = document.getElementById("errorMsg");
const weatherContent = document.getElementById("weatherContent");

function searchWeather() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        errorMsg.textContent = "Please enter a city name";
        return;
    }

    loading.style.display = "block";
    errorMsg.textContent = "";
    weatherContent.style.display = "none";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                throw new Error("City not found");
            }

            document.getElementById("location").textContent =
                `${data.name}, ${data.sys.country}`;

            document.getElementById("date").textContent =
                new Date().toDateString();

            document.getElementById("temperature").textContent =
                `${Math.round(data.main.temp)}°C`;

            document.getElementById("description").textContent =
                data.weather[0].description;

            document.getElementById("feelsLike").textContent =
                `${Math.round(data.main.feels_like)}°C`;

            document.getElementById("humidity").textContent =
                `${data.main.humidity}%`;

            document.getElementById("windSpeed").textContent =
                `${data.wind.speed} m/s`;

            document.getElementById("pressure").textContent =
                `${data.main.pressure} hPa`;

            document.getElementById("currentIcon").textContent =
                getIcon(data.weather[0].main);

            weatherContent.style.display = "block";
        })
        .catch(err => {
            errorMsg.textContent = err.message;
        })
        .finally(() => {
            loading.style.display = "none";
        });
}

function getIcon(type) {
    switch (type) {
        case "Clouds": return "☁️";
        case "Rain": return "🌧️";
        case "Clear": return "☀️";
        case "Snow": return "❄️";
        case "Thunderstorm": return "⛈️";
        default: return "🌡️";
    }
}