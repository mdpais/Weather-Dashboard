var cityInput = document.getElementById("search");
var searchButton = document.querySelector(".search-btn");

var lat;
var lon;

function getWeather() {
    var requestUrl = "api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=d1c747d37a69b86b9558f11ef1f6d753";
    console.log("weather");
}

function getLatLon() {
    var requestUrl = "api.openweathermap.org/data/2.5/forecast?q="+cityInput.value+"&appid=d1c747d37a69b86b9558f11ef1f6d753";
    console.log(cityInput.value);
        
        getWeather(lat,lon);
}

searchButton.addEventListener("click", getLatLon);