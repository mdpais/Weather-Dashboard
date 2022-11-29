var cityInput = document.getElementById("search");
var searchButton = document.querySelector(".search-btn");

var lat;
var lon;

function getWeather(lat, lon) {
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=d1c747d37a69b86b9558f11ef1f6d753";
    console.log(lat);
    console.log(lon);
    fetch(requestUrl)
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
        console.log(data)
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