var cityName;

function buildQueryUrl() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?";

    var queryParams = { "appid": "81f7cb822ccc97ed0abc74ae92129ee2" };
    queryParams.q = $("#search-term").val().trim();
    queryParams.units = "imperial"
    return queryURL + $.param(queryParams);
}

function buildFiveDayQueryUrl() {
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?";
    var fiveDayQueryParams = { "appid": "81f7cb822ccc97ed0abc74ae92129ee2" };
    fiveDayQueryParams.id = data.id;
    fiveDayQueryParams.units = "imperial";
    return fiveDayQueryURL + $.param(fiveDayQueryParams);
}

var citiesListEl = $("#city-list")
var cities = []
init();

function renderCities() {
    if (cities.length > 5) {
        cities.shift();
    }
    for (var i = 0; i < cities.length; i++) {

        var city = cities[i];
        var li = $("<li>")
        var button = $("<button class='btn btn-info buttons'>");
        button.text(city);
        button.attr("data-index", i);
        li.prepend(button)
        $("#city-list").prepend(li)
    }
}

$("#city-list").on("click", "button", function () {
    $("#current-day-forecast").empty();
    $("#five-day-forecast").empty();
    cityName = $(this).text();

    function buildButtonsUrl() {
        var buttonsUrl = "https://api.openweathermap.org/data/2.5/forecast?";
        var buttonsQueryParams = { "appid": "81f7cb822ccc97ed0abc74ae92129ee2" };
        buttonsQueryParams.q = cityName;
        buttonsQueryParams.units = "imperial";
        return buttonsUrl + $.param(buttonsQueryParams);
    }

    buttonsUrl = buildButtonsUrl();
    $.ajax({
        url: buttonsUrl,
        method: "GET"
    }).then(function (data) {
        function buildCurrentWeatherCard() {
            var date = moment().format("MMM Do YY");
            var weatherData = data;
            var currentWeatherIcon = data.list[0].weather[0].icon;
            var currentWeatherIconEl = "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
            var weathericon = $("<img/>", {
                id: "weather-icon",
                src: currentWeatherIconEl,
                width: 75
            });
            var weatherCard = $("<div>").addClass("card weather-card current-day-weather rounded-lg").attr("style", "width: 18rem");
            var cityDateEl = $("<h5>").addClass("card-title").text(weatherData.city.name + " " + "(" + date + ")");
            var tempEl = $("<p>").addClass("card-text").text("Temperature: " + weatherData.list[0].main.temp + " F");
            var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + weatherData.list[0].main.humidity + " %");
            var windspeedEl = $("<p>").addClass("card-text").text("Windspeed: " + weatherData.list[0].wind.speed + " mph");
            $(weatherCard).append(cityDateEl);
            $(weatherCard).append(weathericon)
            $(weatherCard).append(tempEl);
            $(weatherCard).append(humidityEl);
            $(weatherCard).append(windspeedEl);
            $("#current-day-forecast").append(weatherCard);
        }

        function buildFiveDayQueryUrl() {
            var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?";
            var fiveDayQueryParams = { "appid": "81f7cb822ccc97ed0abc74ae92129ee2" };
            fiveDayQueryParams.id = data.id;
            fiveDayQueryParams.q = cityName;
            fiveDayQueryParams.units = "imperial";
            return fiveDayQueryURL + $.param(fiveDayQueryParams);
        }

        fiveDayQueryURL = buildFiveDayQueryUrl();

        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        }).then(function (fiveData) {
            var fiveDayList = fiveData.list;

            var dayOne = fiveDayList[7]
            var dayOneIcon = dayOne.weather[0].icon;
            var dayOneWeatherIcon = "https://openweathermap.org/img/wn/" + dayOneIcon + ".png";
            dayOneIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayOneWeatherIcon,
                width: 50
            })
            var dayOneCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayOneDate = $("<h5>").addClass("card-title").text(moment().add(1, 'days').format('L'));
            var dayOneTemp = $("<p>").addClass("card-text").text("Temperature: " + dayOne.main.temp + "F");
            var dayOneHum = $("<p>").addClass("card-text").text("Humidity: " + dayOne.main.humidity);
            $(dayOneCard).append(dayOneDate);
            $(dayOneCard).append(dayOneIconEl)
            $(dayOneCard).append(dayOneTemp);
            $(dayOneCard).append(dayOneHum);
            $("#five-day-forecast").append(dayOneCard);
            // ------------------------
            var dayTwo = fiveDayList[15]
            var dayTwoIcon = dayTwo.weather[0].icon;
            var dayTwoWeatherIcon = "https://openweathermap.org/img/wn/" + dayTwoIcon + ".png";
            dayTwoIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayTwoWeatherIcon,
                width: 50
            })
            //------------------------------
            var dayTwoCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayTwoDate = $("<h5>").addClass("card-title").text(moment().add(2, 'days').format('L'));
            var dayTwoTemp = $("<p>").addClass("card-text").text("Temperature: " + dayTwo.main.temp + "F");
            var dayTwoHum = $("<p>").addClass("card-text").text("Humidity: " + dayTwo.main.humidity);
            $(dayTwoCard).append(dayTwoDate);
            $(dayTwoCard).append(dayTwoIconEl);
            $(dayTwoCard).append(dayTwoTemp);
            $(dayTwoCard).append(dayTwoHum);
            $("#five-day-forecast").append(dayTwoCard);
            // ------------------------
            var dayThree = fiveDayList[23]
            var dayThreeIcon = dayThree.weather[0].icon;
            var dayThreeWeatherIcon = "https://openweathermap.org/img/wn/" + dayThreeIcon + ".png";
            dayThreeIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayThreeWeatherIcon,
                width: 50
            })
            //----------------------------------
            var dayThreeCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayThreeDate = $("<h5>").addClass("card-title").text(moment().add(3, 'days').format('L'));
            var dayThreeTemp = $("<p>").addClass("card-text").text("Temperature: " + dayThree.main.temp + "F");
            var dayThreeHum = $("<p>").addClass("card-text").text("Humidity: " + dayThree.main.humidity);
            $(dayThreeCard).append(dayThreeDate);
            $(dayThreeCard).append(dayThreeIconEl);
            $(dayThreeCard).append(dayThreeTemp);
            $(dayThreeCard).append(dayThreeHum);
            $("#five-day-forecast").append(dayThreeCard);
            // ------------------------
            var dayFour = fiveDayList[31]
            var dayFourIcon = dayFour.weather[0].icon;
            var dayFourWeatherIcon = "https://openweathermap.org/img/wn/" + dayFourIcon + ".png";
            dayFourIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayFourWeatherIcon,
                width: 50
            })
            //------------------------------------------
            var dayFourCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayFourDate = $("<h5>").addClass("card-title").text(moment().add(4, 'days').format('L'));
            var dayFourTemp = $("<p>").addClass("card-text").text("Temperature: " + dayFour.main.temp + "F");
            var dayFourHum = $("<p>").addClass("card-text").text("Humidity: " + dayFour.main.humidity);
            $(dayFourCard).append(dayFourDate);
            $(dayFourCard).append(dayFourIconEl);
            $(dayFourCard).append(dayFourTemp);
            $(dayFourCard).append(dayFourHum);
            $("#five-day-forecast").append(dayFourCard);
            // ------------------------
            var dayFive = fiveDayList[39]
            var dayFiveIcon = dayFive.weather[0].icon;
            var dayFiveWeatherIcon = "https://openweathermap.org/img/wn/" + dayFiveIcon + ".png";
            dayFiveIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayFiveWeatherIcon,
                width: 50
            })
            //------------------------------------
            var dayFiveCard = $("<div>").addClass("card weather-card col bg-info text-white").attr("style", "width: 18rem");
            var dayFiveDate = $("<h5>").addClass("card-title").text(moment().add(5, 'days').format('L'));
            var dayFiveTemp = $("<p>").addClass("card-text").text("Temperature: " + dayFive.main.temp + "F");
            var dayFiveHum = $("<p>").addClass("card-text").text("Humidity: " + dayFive.main.humidity);
            $(dayFiveCard).append(dayFiveDate);
            $(dayFiveCard).append(dayFiveIconEl);
            $(dayFiveCard).append(dayFiveTemp);
            $(dayFiveCard).append(dayFiveHum);
            $("#five-day-forecast").append(dayFiveCard);
        })

        var uvIndexEl;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "&appid=81f7cb822ccc97ed0abc74ae92129ee2"
        buildCurrentWeatherCard();

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {
            uvIndexEl = response.value
            uvIndexTag = $("<p>").text("UV Index: " + uvIndexEl)
            $(".current-day-weather").append(uvIndexTag)
        })
        $("#search-term").val(" ")
        init();
    });
});

function init() {
    $("#city-list").empty();
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cities = storedCities;
    }

    renderCities();
}

$(".search-button").on("click", function search(event) {
    event.preventDefault();

    var searchHistory = $("#search-term").val().trim();
    cities.push(searchHistory)
    localStorage.setItem("cities", JSON.stringify(cities));


    $("#current-day-forecast").empty();
    $("#five-day-forecast").empty();
    var queryURL = buildQueryUrl();
    var fiveDayQueryURL;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {
        function buildCurrentWeatherCard() {
            var date = moment().format("MMM Do YY");
            var weatherData = data;
            var currentWeatherIcon = data.weather[0].icon;
            var currentWeatherIconEl = "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png";
            var weathericon = $("<img/>", {
                id: "weather-icon",
                src: currentWeatherIconEl,
                width: 75
            });
            var weatherCard = $("<div>").addClass("card weather-card current-day-weather rounded-lg").attr("style", "width: 18rem");
            var cityDateEl = $("<h5>").addClass("card-title").text(weatherData.name + " " + "(" + date + ")");
            var tempEl = $("<p>").addClass("card-text").text("Temperature: " + weatherData.main.temp + " F");
            var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + weatherData.main.humidity + " %");
            var windspeedEl = $("<p>").addClass("card-text").text("Windspeed: " + weatherData.wind.speed + " mph");
            $(weatherCard).append(cityDateEl);
            $(weatherCard).append(weathericon)
            $(weatherCard).append(tempEl);
            $(weatherCard).append(humidityEl);
            $(weatherCard).append(windspeedEl);
            $("#current-day-forecast").append(weatherCard);
        }

        function buildFiveDayQueryUrl() {
            var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?";
            var fiveDayQueryParams = { "appid": "81f7cb822ccc97ed0abc74ae92129ee2" };
            fiveDayQueryParams.id = data.id;
            fiveDayQueryParams.units = "imperial";
            return fiveDayQueryURL + $.param(fiveDayQueryParams);
        }

        fiveDayQueryURL = buildFiveDayQueryUrl();

        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        }).then(function (fiveData) {
            var fiveDayList = fiveData.list;

            var dayOne = fiveDayList[7]
            var dayOneIcon = dayOne.weather[0].icon;
            var dayOneWeatherIcon = "https://openweathermap.org/img/wn/" + dayOneIcon + ".png";
            dayOneIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayOneWeatherIcon,
                width: 50
            })
            var dayOneCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayOneDate = $("<h5>").addClass("card-title").text(moment().add(1, 'days').format('L'));
            var dayOneTemp = $("<p>").addClass("card-text").text("Temperature: " + dayOne.main.temp + "F");
            var dayOneHum = $("<p>").addClass("card-text").text("Humidity: " + dayOne.main.humidity);
            $(dayOneCard).append(dayOneDate);
            $(dayOneCard).append(dayOneIconEl)
            $(dayOneCard).append(dayOneTemp);
            $(dayOneCard).append(dayOneHum);
            $("#five-day-forecast").append(dayOneCard);
            // ------------------------
            var dayTwo = fiveDayList[15]
            var dayTwoIcon = dayTwo.weather[0].icon;
            var dayTwoWeatherIcon = "https://openweathermap.org/img/wn/" + dayTwoIcon + ".png";
            dayTwoIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayTwoWeatherIcon,
                width: 50
            })
            //------------------------------
            var dayTwoCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayTwoDate = $("<h5>").addClass("card-title").text(moment().add(2, 'days').format('L'));
            var dayTwoTemp = $("<p>").addClass("card-text").text("Temperature: " + dayTwo.main.temp + "F");
            var dayTwoHum = $("<p>").addClass("card-text").text("Humidity: " + dayTwo.main.humidity);
            $(dayTwoCard).append(dayTwoDate);
            $(dayTwoCard).append(dayTwoIconEl);
            $(dayTwoCard).append(dayTwoTemp);
            $(dayTwoCard).append(dayTwoHum);
            $("#five-day-forecast").append(dayTwoCard);
            // ------------------------
            var dayThree = fiveDayList[23]
            var dayThreeIcon = dayThree.weather[0].icon;
            var dayThreeWeatherIcon = "https://openweathermap.org/img/wn/" + dayThreeIcon + ".png";
            dayThreeIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayThreeWeatherIcon,
                width: 50
            })
            //----------------------------------
            var dayThreeCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayThreeDate = $("<h5>").addClass("card-title").text(moment().add(3, 'days').format('L'));
            var dayThreeTemp = $("<p>").addClass("card-text").text("Temperature: " + dayThree.main.temp + "F");
            var dayThreeHum = $("<p>").addClass("card-text").text("Humidity: " + dayThree.main.humidity);
            $(dayThreeCard).append(dayThreeDate);
            $(dayThreeCard).append(dayThreeIconEl);
            $(dayThreeCard).append(dayThreeTemp);
            $(dayThreeCard).append(dayThreeHum);
            $("#five-day-forecast").append(dayThreeCard);
            // ------------------------
            var dayFour = fiveDayList[31]
            var dayFourIcon = dayFour.weather[0].icon;
            var dayFourWeatherIcon = "https://openweathermap.org/img/wn/" + dayFourIcon + ".png";
            dayFourIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayFourWeatherIcon,
                width: 50
            })
            //------------------------------------------
            var dayFourCard = $("<div>").addClass("card weather-card col bg-info text-white mr-md-4").attr("style", "width: 18rem");
            var dayFourDate = $("<h5>").addClass("card-title").text(moment().add(4, 'days').format('L'));
            var dayFourTemp = $("<p>").addClass("card-text").text("Temperature: " + dayFour.main.temp + "F");
            var dayFourHum = $("<p>").addClass("card-text").text("Humidity: " + dayFour.main.humidity);
            $(dayFourCard).append(dayFourDate);
            $(dayFourCard).append(dayFourIconEl);
            $(dayFourCard).append(dayFourTemp);
            $(dayFourCard).append(dayFourHum);
            $("#five-day-forecast").append(dayFourCard);
            // ------------------------
            var dayFive = fiveDayList[39]
            var dayFiveIcon = dayFive.weather[0].icon;
            var dayFiveWeatherIcon = "https://openweathermap.org/img/wn/" + dayFiveIcon + ".png";
            dayFiveIconEl = $("<img/>", {
                id: "weather-icon",
                src: dayFiveWeatherIcon,
                width: 50
            })
            //------------------------------------
            var dayFiveCard = $("<div>").addClass("card weather-card col bg-info text-white").attr("style", "width: 18rem");
            var dayFiveDate = $("<h5>").addClass("card-title").text(moment().add(5, 'days').format('L'));
            var dayFiveTemp = $("<p>").addClass("card-text").text("Temperature: " + dayFive.main.temp + "F");
            var dayFiveHum = $("<p>").addClass("card-text").text("Humidity: " + dayFive.main.humidity);
            $(dayFiveCard).append(dayFiveDate);
            $(dayFiveCard).append(dayFiveIconEl);
            $(dayFiveCard).append(dayFiveTemp);
            $(dayFiveCard).append(dayFiveHum);
            $("#five-day-forecast").append(dayFiveCard);
        })

        var uvIndexEl;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?" + "lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&appid=81f7cb822ccc97ed0abc74ae92129ee2"
        buildCurrentWeatherCard();

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (response) {
            uvIndexEl = response.value
            uvIndexTag = $("<p>").text("UV Index: " + uvIndexEl)
            $(".current-day-weather").append(uvIndexTag)
        })
        $("#search-term").val(" ")
        init();
    });
})