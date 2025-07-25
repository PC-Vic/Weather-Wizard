var apiKey = "467be7c6794ab9fbe3d9aab8decc7326"
var lat;
var lon;
var inputEl = document.querySelector('#navBarSearchForm')
var formEl = document.querySelector('#weather-form')
var cityHistory = document.getElementById("city-history")
var cityCard = document.querySelector(".city-card")
var cityNameElement = document.getElementById("city-name");
var temperatureElement = document.getElementById("temperature");
var humidityElement = document.getElementById("humidity");
var cityArray = JSON.parse(localStorage.getItem("city-array")) || []

function displayCityHistory() {
    while (cityCard.firstChild) {
        cityCard.removeChild(cityCard.firstChild);
    }

    cityArray.forEach((city) => {
        var pastCityEl = document.createElement("h4")
        pastCityEl.textContent = city
        cityCard.append(pastCityEl)
    })
}


function Submit(event){
   
    event.preventDefault()
    var userInput = inputEl.value
    display()


    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+ userInput + '&appid='+ apiKey).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
        lat = data[0].lat
        console.log(lat)
        lon = data[0].lon
        console.log(lon)
        getForecast(lat, lon)
    })
    .catch(function(error) {
        console.error('Fetch error:', error);
    });
}


function display() {
    var cityName = inputEl.value.trim();
    var cityEl = document.createElement("h4")
    cityEl.textContent = cityName
    cityCard.append(cityEl)
    if(!cityArray.includes(cityName)) {
        cityArray.push(cityName)
        localStorage.setItem("city-array", JSON.stringify(cityArray));
    }
        localStorage.setItem("cityName", cityName);
}





function getForecast(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon=' + lon + '&appid=' + apiKey).then(function(weatherData) {
        console.log(weatherData)
        return weatherData.json()
        
    }).then(function(data) {
        console.log(data)
        //temp convert F
        var index = 0;
        var temperatureKelvin = data.list[index].main.temp;
        var temperatureFahrenheit = (temperatureKelvin - 273.15) * (9 / 5) + 32;
        var humidity = data.list[index].main.humidity;

        cityNameElement.textContent = data.city.name;
        temperatureElement.textContent = temperatureFahrenheit.toFixed(2);
        humidityElement.textContent = humidity;
        //temp convert F
        var forecastHeading = document.createElement("h4");
        forecastHeading.textContent = "5-Day Forecast:";

        var fiveDayParent = document.querySelector(".weather-cards-container");
        fiveDayParent.insertBefore(forecastHeading, fiveDayParent.firstChild);
        
        // Display City History
        function displayMessage(type, message) {
            inputEl.textContent = message;
            inputEl.setAttribute("class", type);
        }


        if(inputEl.value === "") {
            displayMessage("Ooops, city name is required")
        } else {
            displayMessage("Here is the weather!")
            localStorage.setItem("navBar", inputEl);
        };   


        for(var i = 0; i < data.list.length; i+= 8) {
            var fiveDayWeather = document.createElement("div")
            fiveDayWeather.setAttribute('class', 'col-12 col-md-6 col-lg-3 weather-card')
        console.log(data.list[i].main.humidity.temp)
            var temperatureKelvin = data.list[i].main.temp;
            var date = data.list[i].dt_txt.split(' ')[0]
            console.log(date);
            var temperatureFahrenheit = ((temperatureKelvin - 273.15) * (9 / 5) + 32).toFixed(0)
            var humidity = data.list[i].main.humidity;
            fiveDayWeather.innerHTML = `
            <ul>
            <li>Date: ${date} </li>
            <li>Temp: ${temperatureFahrenheit} </li>
            <li>Humidity: ${humidity} </li>
            </ul>
            `
            var fiveDay = document.getElementById("five-day")
            fiveDay.appendChild(fiveDayWeather)
            console.log("Temperature (Fahrenheit):", temperatureFahrenheit);
            console.log("Humidity:", humidity);
        }
    })    
}

if (cityArray.length > 0) {
    displayCityHistory();
}

formEl.addEventListener('submit', Submit)


// displayCityHistory()
// formEl.addEventListener('submit', Submit)