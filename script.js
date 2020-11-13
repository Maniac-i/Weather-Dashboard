



//Current Weather API Call to populate jumbotron
function displayCurrentWeather(inputtedCity) {

  let cityName = inputtedCity;
  var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=5a57f19b58dbcee3e062fd11804936d7";

  $.ajax({

    url: currentURL,

    method: "GET"

  }).then(function (city) {

    console.log(city);
    var temp = (city.main.temp - 273.15) * (9 / 5) + 32;
    lat = city.coord.lat;
    lon = city.coord.lon;
    $(".tempText").text(" " + temp.toFixed(1) + " °F");
    $(".humidText").text(" " + city.main.humidity + " %");
    $(".windText").text(" " + city.wind.speed + " MPH");
    $("#city").text(city.name);


    //UV Index API call
    let uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=5a57f19b58dbcee3e062fd11804936d7"

    $.ajax({

      url: uvURL,

      method: "GET"

    }).then(function (uv) {

      console.log(uv);
      $(".uvText").text(" " + uv.value)
    })
  })
}

//5 Day Forecast API Call
function displayFiveDay() {

  let cityName = "Columbus";
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=5a57f19b58dbcee3e062fd11804936d7";

  $.ajax({

    url: fiveDayURL,

    method: "GET"

  }).then(function (city) {

    //Do something

  })
}

//click function for search button
//creates list item with inputted city name
$(".btn").on("click", function (event) {

  event.preventDefault();

  var inputtedCity = $("#citySearch").val();

  var createdListItem = $("<li>" + inputtedCity + "</li>");

  var createdListItem = createdListItem.attr("data-name", inputtedCity);

  var createdListItem = createdListItem.attr("class", "list-group-item");

  $("#cityList").append(createdListItem);

  displayCurrentWeather(inputtedCity);


});