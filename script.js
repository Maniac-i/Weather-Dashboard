//sets initial city shown
function setWeatherDisplay() {
  if (!localStorage.getItem("searchedCity")) {
    displayFiveDay("Cleveland");
  } else {
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

});

//5 Day Forecast API Call
function displayFiveDay(inputtedCity) {

  var cityName = inputtedCity;
  var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=5a57f19b58dbcee3e062fd11804936d7";

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

    //update jumbotron
    $(".tempText").text(" " + temp(0) + " °F");
    $(".humidText").text(" " + humidity(0) + " %");
    $(".windText").text(" " + response.list[0].wind.speed + " MPH");
    $("#city").text(response.city.name);
    $(".jumboDate").text(date(0));
    $(".jumboIcon").attr("src", weatherIcon(0));

    //update day 1
    $(".dateOne").text(date(5));
    $(".tempOne").text(" " + temp(5) + " °F");
    $(".humidOne").text(" " + humidity(5) + " %");
    $(".imgOne").attr("src", weatherIcon(5));

    //update day 2
    $(".dateTwo").text(date(13));
    $(".tempTwo").text(" " + temp(13) + " °F");
    $(".humidTwo").text(" " + humidity(13) + " %");
    $(".imgTwo").attr("src", weatherIcon(13));

    //update day 3
    $(".dateThree").text(date(21));
    $(".tempThree").text(" " + temp(21) + " °F");
    $(".humidThree").text(" " + humidity(21) + " %");
    $(".imgThree").attr("src", weatherIcon(21));

    //update day 4
    $(".dateFour").text(date(29));
    $(".tempFour").text(" " + temp(29) + " °F");
    $(".humidFour").text(" " + humidity(29) + " %");
    $(".imgFour").attr("src", weatherIcon(29));

    //update day 5
    $(".dateFive").text(date(37));
    $(".tempFive").text(" " + temp(37) + " °F");
    $(".humidFive").text(" " + humidity(37) + " %");
    $(".imgFive").attr("src", weatherIcon(37));

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
});
