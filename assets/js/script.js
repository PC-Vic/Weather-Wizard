var apiKey = "467be7c6794ab9fbe3d9aab8decc7326"
var latt;
var long;

var inputEl = document.querySelector('#navBarSearchForm')
var formEl = document.querySelector('form')
function Submit(event){
    // this line stops the page from refreshing because forms by default will refresh the page
    event.preventDefault()
    var userInput = inputEl.value
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+ userInput + '&appid='+ apiKey).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
        lat = data[0].lat
        console.log(lat)
        lon = data[0].lon
        console.log(lon)
        getForecast()
    })

}
function getForecast(){
    fetch('api.openweathermap.org/data/2.5/forecast?lat='+ latt '&lon=' + long + '&appid=' + apiKey)
    
}


formEl.addEventListener('submit', Submit)