//sets initial city shown
function setWeatherDisplay() {
  if (!localStorage.getItem("searchedCity")) {
    displayCurrentWeather("Cleveland");
    displayFiveDay("Cleveland")
  } else {
    displayCurrentWeather(localStorage.getItem("searchedCity"));
    displayFiveDay(localStorage.getItem("searchedCity"));
  }
}

setWeatherDisplay();

//click function for search button
//creates list item with inputted city name
$(".btn").on("click", function (event) {

  event.preventDefault();

  var inputtedCity = $("#citySearch").val();

  var createdListItem = $("<li>" + inputtedCity + "</li>");

  var createdListItem = createdListItem.attr("data-name", inputtedCity);

  var createdListItem = createdListItem.attr("class", "list-group-item");

  $("#cityList").append(createdListItem);

  localStorage.setItem("searchedCity", inputtedCity);

  displayFiveDay(inputtedCity);
  displayCurrentWeather(inputtedCity);

});

//Current Weather API Call
function displayCurrentWeather(inputtedCity) {

  let cityName = inputtedCity;
  let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=5a57f19b58dbcee3e062fd11804936d7";

  $.ajax({

    url: currentWeatherURL,

    method: "GET"

  }).then(function (response) {

    //update jumbotron
    $(".tempText").text(" " + response.main.temp + " °F");
    $(".humidText").text(" " + response.main.humidity + " %");
    $(".windText").text(" " + response.wind.speed + " MPH");
    $("#city").text(response.name);
    $(".jumboDate").text(moment().format('L'));
    $(".jumboIcon").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

  })
}

//5 Day Forecast API Call
function displayFiveDay(inputtedCity) {

  let cityName = inputtedCity;
  let fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=5a57f19b58dbcee3e062fd11804936d7";

  $.ajax({

    url: fiveDayURL,

    method: "GET"

  }).then(function (response) {

    //date function
    function date(i) {
      var date = response.list[i].dt_txt;
      return moment(date).format("L");
    }

    //temp converstion function
    function temp(i) {
      var temp = response.list[i].main.temp;
      return temp;
    }

    //humidity function
    function humidity(i) {
      var humidity = response.list[i].main.humidity
      return humidity;
    }

    //icon function
    function weatherIcon(i) {
      var icon = response.list[i].weather[0].icon;
      var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
      return iconURL;
    }

    //Store lat and long as variables for UV Index call
    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;

    //Update 5 day forecast cards
    $(".day").each(function () {

      arrayIndex = $(this).attr("data-array");

      $(this).find(".date").text(date(arrayIndex));
      $(this).find(".temp").text(" " + temp(arrayIndex) + " °F");
      $(this).find(".humid").text(" " + humidity(arrayIndex) + " %");
      $(this).find(".img").attr("src", weatherIcon(arrayIndex));

    });

    //UV Index API call
    let uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=5a57f19b58dbcee3e062fd11804936d7";

    $.ajax({

      url: uvURL,

      method: "GET"

    }).then(function (uv) {

      //sets UV Index in jumbotron
      uvIndex = uv.value;
      uvText = $(".uvText")
      uvText.text(" " + uvIndex);

      //changes background color of UV Index in jumbotron
      if (uvIndex <= 2) {
        uvText.attr("id", "low");
      } else if (uvIndex <= 5) {
        uvText.attr("id", "moderate");
      } else if (uvIndex <= 7) {
        uvText.attr("id", "high");
      } else if (uvIndex <= 10) {
        uvText.attr("id", "veryHigh");
      } else {
        uvText.attr("id", "extreme");
      }
    })
  })
}

//Calls displayFiveDay function when a previous searched city is clicked
$(document).on("click", ".list-group-item", function () {
  displayFiveDay($(this).attr("data-name"));
  currentWeatherURL((this).attr("data-name"));
});
