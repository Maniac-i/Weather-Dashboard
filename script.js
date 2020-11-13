var cityName = ""

//Current Weather API call URL
var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=5a57f19b58dbcee3e062fd11804936d7"

//5 Day API call URL
var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=5a57f19b58dbcee3e062fd11804936d7"


//Current Weather API Call
function displayCurrentWeather() {
  
  let cityName = "";
  var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=5a57f19b58dbcee3e062fd11804936d7";

  $.ajax({

  url: currentURL,

  method: "GET"

}).then(function(city){

//Do something

  })
}

//5 Day Forecast API Call
function displayFiveDay() {

  let cityName = "";
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=5a57f19b58dbcee3e062fd11804936d7";

$.ajax({

  url: fiveDayURL,

  method: "GET"

}).then(function(city){

//Do something

  })
}

//click function for search button
//creates list item with inputted city name
$(".btn").on("click", function(event) {
  
  event.preventDefault();
  
  var inputtedCity = $("#citySearch").val();
  
  var createdListItem = $("<li>" + inputtedCity + "</li>");
  
  var createdListItem = createdListItem.attr("data-name", inputtedCity);
  
  var createdListItem = createdListItem.attr("class", "list-group-item");
  
  $("#cityList").append(createdListItem);
  
  

});