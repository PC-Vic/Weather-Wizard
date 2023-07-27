var apiKey = "467be7c6794ab9fbe3d9aab8decc7326"
var lat;
var lon;
var inputEl = document.querySelector('#navBarSearchForm')
var formEl = document.querySelector('#weather-form')

var cityNameElement = document.getElementById("city-name");
var temperatureElement = document.getElementById("temperature");
var humidityElement = document.getElementById("humidity");




function Submit(event){
   
    event.preventDefault()
    var userInput = inputEl.value

    // using their input we want to store it into localStorage
    // after that we want to create the cards line 30 in html as example
    // Get the card the text of the user input



    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+ userInput + '&appid='+ apiKey).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
        lat = data[0].lat
        console.log(lat)
        lon = data[0].lon
        console.log(lon)
        getForecast(lat, lon)
    })

}

function getForecast(lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon=' + lon + '&appid=' + apiKey).then(function(weatherData) {
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
        
        // var mainFiveDay = document.getElementById("five-day")
        // var fiveDayWeather = document.createElement("h4")
        // fiveDayWeather.appendChild(mainFiveDay)

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


formEl.addEventListener('submit', Submit)

// You will need an addeventListener for when the cities buttons/cards are clicked, it reruns the weather app using their textContent



