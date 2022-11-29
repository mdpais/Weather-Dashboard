var cityInput = document.getElementById("search");
var searchButton = document.querySelector(".search-btn");
var weatherToday = document.querySelector(".weather-today");
var todayContent = document.querySelector(".today-content");
var weatherFiveDay = document.querySelector(".weather-5day");

var lat;
var lon;

function getWeather(lat, lon) {
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&cnt=6&appid=d1c747d37a69b86b9558f11ef1f6d753";
    console.log(lat);
    console.log(lon);
    todayContent.textContent = "";
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data.list[0].weather[0].icon);
            var todayDate = document.createElement("h5");
            var todayTemp = document.createElement("p");
            var todayWind = document.createElement("p");
            var todayHumidity = document.createElement("p");
            var todayImage = document.createElement("img");
            todayDate.textContent = data.city.name + ", " + data.city.country + " (" + dayjs().format("D MMMM YYYY") + ")";
            todayTemp.textContent = "Temperature: " + data.list[0].main.temp + "°C";
            todayWind.textContent = "Wind Speed: " + data.list[0].wind.speed + " kmph";
            todayHumidity.textContent = "Humidity: " + data.list[0].main.humidity + "%";
            todayImage.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png");
            todayDate.setAttribute("class", "card-title");
            todayTemp.setAttribute("class", "card-text");
            todayWind.setAttribute("class", "card-text");
            todayHumidity.setAttribute("class", "card-text");
            todayContent.appendChild(todayDate);
            todayDate.appendChild(todayImage);
            todayContent.appendChild(todayTemp);
            todayContent.appendChild(todayWind);
            todayContent.appendChild(todayHumidity);
            weatherToday.style.display = "block";
            weatherFiveDay.style.display = "flex";
            cityInput.value = "";
        });
}

function getLatLon() {
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+cityInput.value+"&appid=d1c747d37a69b86b9558f11ef1f6d753";
    console.log(cityInput.value);
    fetch(requestUrl)
        .then(function(response) {
            if (response.status === 404) {
                throw new Error();
            }    
            return response.json();        })
        .then(function(data) {
            console.log("reached here");
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
            getWeather(lat, lon);
            //add code to store city in local storage
        })    
        .catch(function(error) {
            return;
        });
}

searchButton.addEventListener("click", getLatLon);