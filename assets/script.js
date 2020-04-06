// onClick Listener for City Search
$("#citySearch").on("click", function (e) {
    // Call Main Function
    weatherPull();
    var currentSearch = $("#citySearched").val();
    var createHistoryButton = $("<button>", { class: "button"});
    var getHistory = $(".history");
    // Add searched City to history list
    getHistory.prepend(createHistoryButton.text(currentSearch));

});
// Start of pseudo code for local storage and functionality of history searches
// Create event listeners for history buttons
// alter function weather pull to use past searched
// Function that calls weather pull function for history button

// Pseudo code for local storage
// Create an array for past searches
// Set searches into the array
// Create an onload to generate buttons of past searches

function weatherPull() {
    // Variables for current weather call
    var weatherApiKey = "&appid=b8b85456ce2e8007f70d09f5a693fd00";
    var searchedCity = $("#citySearched").val();
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    var completeUrl = weatherUrl + searchedCity + weatherApiKey;
    // Api call for current Day Weather
    $.ajax({
        url: completeUrl,
        method: "GET"
    }).then(function (response) {
        var placeForCity = $("#cityName");
        // Gives Icon for weather for current day weather
        if (response.weather[0].main === "clear sky" || response.weather[0].main === "clear"){
            placeForCity.html(response.name + " (" + moment().format("MMM Do YY") + ")" + "<i class='fas fa-sun'></i>");
        } else if (response.weather[0].main.toLowerCase() === "few clouds" || response.weather[0].main.toLowerCase() === "broken clouds" || response.weather[0].main.toLowerCase() === "scattered clouds"){
            placeForCity.html(response.name + " (" + moment().format("MMM Do YY") + ")" + "<i class='fas fa-cloud-sun'></i>");
        } else if (response.weather[0].main.toLowerCase() === "clouds"){
            placeForCity.html(response.name + " (" + moment().format("MMM Do YY") + ")" + "<i class='fas fa-cloud'></i>");
        } else if (response.weather[0].main.toLowerCase() === "rain" || response.weather[0].main.toLowerCase() === "shower rain"){
            placeForCity.html(response.name + " (" + moment().format("MMM Do YY") + ")" + "<i class='fas fa-cloud-showers-heavy'></i");
        } else if (response.weather[0].main.toLowerCase() === "thunderstorm"){
            placeForCity.html(response.name + " (" + moment().format("MMM Do YY") + ")" + "<i class='fas fa-bolt'></i>");
        } else if (response.weather[0].main.toLowerCase() === "snow"){
            placeForCity.html(response.name + " (" + moment().format("MMM Do YY") + ")" + "<i class='far fa-snowflake'></i>");
        } else if (response.weather[0].main.toLowerCase() === "mist"){
            placeForCity.html(response.name + " (" + moment().format("MMM Do YY") + ")" + "<i class='fas fa-smog'></i>");        
        } else {
            placeForCity.html(response.name + " (" + moment().format("MMM Do YY") + ")");  
        }
        var placeForTemp = $("#temperature");
        var placeForHumid = $("#humidity");
        var placeForWind = $("#windSpeed");
        // Input data for current day forecast
        placeForTemp.text((((response.main.temp - 273.15) * 1.8) + 32).toFixed(1));
        placeForHumid.text(response.main.humidity);
        placeForWind.text(response.wind.speed);
        // Variables for UV api call
        var uvApiKey = "uvi?appid=b8b85456ce2e8007f70d09f5a693fd00";
        var uvSearchedCity = $("#citySearched").val();
        var uvUrl = "http://api.openweathermap.org/data/2.5/";
        var latitude = "&lat=" + response.coord.lat;
        var longitude = "&lon=" + response.coord.lon;
        var uvCompleteUrl = uvUrl + uvApiKey + latitude + longitude;
        // Api call UV call 
        $.ajax({
            url: uvCompleteUrl,
            method: "GET"
        }).then(function (response) {
            var uvIndex = response.value;
            var placeForUv = $("#uvIndex");
            // If function that applies color based on intensity of UV
            if (uvIndex <= 2) {
                $("#uvIndex").text(response.value);
                $("#uvIndex").removeClass("yellowBackGround orangeBackGround redBackGround")
                $("#uvIndex").addClass("greenBackGround")
            } else if (uvIndex > 2 && uvIndex <= 5) {
                $("#uvIndex").text(response.value);
                $("#uvIndex").removeClass("greenBackGround orangeBackGround redBackGround")
                $("#uvIndex").addClass("yellowBackGround")
            } else if (uvIndex > 5 && uvIndex <= 8) {
                $("#uvIndex").text(response.value);
                $("#uvIndex").removeClass("yellowBackGround greenBackGround redBackGround")
                $("#uvIndex").addClass("orangeBackGround")
            } else {
                $("#uvIndex").text(response.value);
                $("#uvIndex").removeClass("yellowBackGround orangeBackGround greenBackGround")
                $("#uvIndex").addClass("redBackGround")
            };
        });
        // Variables for 5 day forecast
        var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q="
        var fiveDayComplete = fiveDayUrl + searchedCity + weatherApiKey
        // Api call for 5 day forecast call
        $.ajax({
            url: fiveDayComplete,
            method: "GET"
        }).then(function (response) {
            // Make array for same time of day for next 5 days
            var fiveDayArray = [response.list[0], response.list[8], response.list[16], response.list[24], response.list[32]];
            var dayArray = [moment().add(1, 'days').format('L'), moment().add(2, 'days').format('L'), moment().add(3, 'days').format('L'), moment().add(4, 'days').format('L'), moment().add(5, 'days').format('L')];
            // For loop that inserts next 5 days worth of information
            for (i = 0; i < fiveDayArray.length; i++) {
                // If condition set weather icon variable depending on data returned
                if (fiveDayArray[i].weather[0].main.toLowerCase() === "clear sky" || fiveDayArray[i].weather[0].main.toLowerCase() === "clear"){
                    var weatherIcon = $("<p>").html("<i class='fas fa-sun'></i>");
                } else if (fiveDayArray[i].weather[0].main.toLowerCase() === "few clouds" || fiveDayArray[i].weather[0].main.toLowerCase() === "broken clouds" || fiveDayArray[i].weather[0].main.toLowerCase() === "scattered clouds"){
                    var weatherIcon = $("<p>").html("<i class='fas fa-cloud-sun'></i>");
                } else if (fiveDayArray[i].weather[0].main.toLowerCase() === "clouds"){
                    var weatherIcon = $("<p>").html("<i class='fas fa-cloud'></i>");
                } else if (fiveDayArray[i].weather[0].main.toLowerCase() === "rain" || fiveDayArray[i].weather[0].main.toLowerCase() === "shower rain"){
                    var weatherIcon = $("<p>").html("<i class='fas fa-cloud-showers-heavy'></i");
                } else if (fiveDayArray[i].weather[0].main.toLowerCase() === "thunderstorm"){
                    var weatherIcon = $("<p>").html("<i class='fas fa-bolt'></i>");
                } else if (fiveDayArray[i].weather[0].main.toLowerCase() === "snow"){
                    var weatherIcon = $("<p>").html("<i class='far fa-snowflake'></i>");
                } else if (fiveDayArray[i].weather[0].main.toLowerCase() === "mist"){
                    var weatherIcon = $("<p>").html("<i class='fas fa-smog'></i>");
                } else {
                    placeForCity.html(response.name + " (" + moment().format("MMM Do YY") + ")");
                }
                //Setting variables to be appended
                var fiveDayDate = $("<p>").text(dayArray[i]);
                var newTile = $("<div>", { class: "tile is-parent alignedRight " });
                var newDiv = $("<div>", { class: "is-child tile notification fiveDayStyle blueBackGround" });
                var toFahrenheit = (((fiveDayArray[i].main.temp - 273.15) * 1.8) + 32).toFixed(1);
                var nextDayTemp = $("<p>").text("Temp: " + toFahrenheit + "°F");
                var nextDayHumid = $("<p>").text("Humidity: " + fiveDayArray[i].main.humidity + "%");
                // Appending variables
                newTile.append(newDiv);
                newDiv.append(fiveDayDate);
                newDiv.append(weatherIcon);
                newDiv.append(nextDayTemp);
                newDiv.append(nextDayHumid);
                var fiveDayBox = $("#fiveDayBox");
                // Appends new children
                fiveDayBox.append(newTile);
                // Removes old children
                fiveDayBox.children().first().remove();
            }
        });
    });
};