var cityInput = $("#search");
var searchButton = $(".search-btn");
var weatherToday = document.querySelector(".weather-today");
var todayContent = document.querySelector(".today-content");
var weatherFiveDay = document.querySelector(".weather-5day");
var dayContent = document.querySelector(".weather-5day").children;
var citiesList = document.querySelector(".searched-places");
var cities = [];
var lat;
var lon;

function getWeather(lat, lon) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=d1c747d37a69b86b9558f11ef1f6d753";
    todayContent.textContent = "";
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var todayDate = document.createElement("h5");
            var todayTemp = document.createElement("p");
            var todayWind = document.createElement("p");
            var todayHumidity = document.createElement("p");
            var todayImage = document.createElement("img");
            todayDate.textContent = data.name + ", " + data.sys.country + " (" + dayjs().format("D MMMM YYYY") + ")";
            todayTemp.textContent = "Temperature: " + data.main.temp + "°C";
            todayWind.textContent = "Wind Speed: " + data.wind.speed + " kmph";
            todayHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            todayImage.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            todayDate.setAttribute("class", "card-title");
            todayTemp.setAttribute("class", "card-text");
            todayWind.setAttribute("class", "card-text");
            todayHumidity.setAttribute("class", "card-text");
            todayContent.appendChild(todayDate);
            todayDate.appendChild(todayImage);
            todayContent.appendChild(todayTemp);
            todayContent.appendChild(todayWind);
            todayContent.appendChild(todayHumidity);
        })
        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&appid=d1c747d37a69b86b9558f11ef1f6d753";
        todayContent.textContent = "";
        fetch(requestUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
            for (var i = 1; i < 6; i++) {
                dayContent[i-1].textContent = "";
                var j = (i*8)-4;
                var dayDate = document.createElement("h5");
                var newDiv = document.createElement("div");
                var dayTemp = document.createElement("p");
                var dayWind = document.createElement("p");
                var dayHumidity = document.createElement("p");
                var dayImage = document.createElement("img");
                dayDate.textContent = dayjs(data.list[j].dt_txt).format("D MMMM YYYY");
                dayTemp.textContent = "Temperature: " + data.list[j].main.temp + "°C";
                dayWind.textContent = "Wind Speed: " + data.list[j].wind.speed + " kmph";
                dayHumidity.textContent = "Humidity: " + data.list[j].main.humidity + "%";
                dayImage.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[j].weather[0].icon + ".png");
                dayDate.setAttribute("class", "card-header");
                newDiv.setAttribute("class", "card-body");
                dayTemp.setAttribute("class", "card-text");
                dayWind.setAttribute("class", "card-text");
                dayHumidity.setAttribute("class", "card-text");
                dayContent[i-1].appendChild(dayDate);
                dayContent[i-1].appendChild(newDiv);
                newDiv.appendChild(dayImage);
                newDiv.appendChild(dayTemp);
                newDiv.appendChild(dayWind);
                newDiv.appendChild(dayHumidity);
            }
            weatherToday.style.display = "block";
            weatherFiveDay.style.display = "flex";
            cityInput.val("");
        });
}

function getLatLon() {
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+cityInput.val()+"&appid=d1c747d37a69b86b9558f11ef1f6d753";
    fetch(requestUrl)
        .then(function(response) {
            if (response.status === 404) {
                throw new Error();
            }    
            return response.json();
        })
        .then(function(data) {
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
            getWeather(lat, lon);
        })    
        .catch(function(error) {
            return;
        });
}

function renderCities() {
    citiesList.innerHTML = "";
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      var button = document.createElement("button");
      button.textContent = city;
      button.setAttribute("class", "btn btn-block btn-secondary search-btn");
      citiesList.appendChild(button);
    }
  }

function init() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));
    if (storedCities !== null) {
        cities = storedCities;
    }
    renderCities();
}

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function addCity() {
    var cityText = cityInput.val();
    if (cityText === "") {
    return;
    }
    cities.push(cityText);
    console.log(cities);
    storeCities();
    renderCities();
};

citiesList.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
        cityInput.val(element.textContent);
        getLatLon();
        console.log(element.textContent);
    }
  });

init()
// searchButton.on("click", getLatLon);
searchButton.on("click", function(event) {
    event.preventDefault();
    getLatLon();
    addCity();
});