$("#citySearch").on("click", function (e) {
    weatherPull();
    var currentSearch = $("#citySearched").val()
    var createP = $("<p>", {class: "box"})
    var getHistory = $(".history")
    getHistory.prepend(createP.text(currentSearch))

});

function weatherPull() {
    var weatherApiKey = "&appid=b8b85456ce2e8007f70d09f5a693fd00";
    var searchedCity = $("#citySearched").val();
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    var completeUrl = weatherUrl + searchedCity + weatherApiKey;
    $.ajax({
        url: completeUrl,
        method: "GET"
    }).then(function (response) {
        var placeForCity = $("#cityName");
        var placeForTemp = $("#temperature");
        var placeForHumid = $("#humidity");
        var placeForWind = $("#windSpeed");
        placeForCity.text(response.name);
        placeForTemp.text((((response.main.temp-273.15)*1.8)+32).toFixed(1));
        placeForHumid.text(response.main.humidity);
        placeForWind.text(response.wind.speed);

        var uvApiKey = "uvi?appid=b8b85456ce2e8007f70d09f5a693fd00";
        var uvSearchedCity = $("#citySearched").val();
        var uvUrl = "http://api.openweathermap.org/data/2.5/";
        var latitude = "&lat=" + response.coord.lat;
        var longitude = "&lon=" + response.coord.lon;
        var uvCompleteUrl = uvUrl + uvApiKey + latitude + longitude;

        $.ajax({
            url: uvCompleteUrl,
            method: "GET"
        }).then(function (response){
            var uvIndex = response.value;
            var placeForUv = $("#uvIndex");
            if (uvIndex <= 2){
                $("#uvIndex").text(response.value);
                $("#uvIndex").removeClass("yellowBackGround orangeBackGround redBackGround")
                $("#uvIndex").addClass("greenBackGround")
            } else if (uvIndex > 2 && uvIndex <= 5){
                $("#uvIndex").text(response.value);
                $("#uvIndex").removeClass("greenBackGround orangeBackGround redBackGround")
                $("#uvIndex").addClass("yellowBackGround")
            } else if (uvIndex > 5 && uvIndex <= 8){
                $("#uvIndex").text(response.value);
                $("#uvIndex").removeClass("yellowBackGround greenBackGround redBackGround")
                $("#uvIndex").addClass("orangeBackGround")
            } else {
                $("#uvIndex").text(response.value);
                $("#uvIndex").removeClass("yellowBackGround orangeBackGround greenBackGround")
                $("#uvIndex").addClass("redBackGround")
            };


            
            placeForUv.text(response.value);




        });

        var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q="
        var fiveDayComplete = fiveDayUrl + searchedCity + weatherApiKey

        $.ajax({
            url:fiveDayComplete,
            method: "GET"
        }).then(function(response){
            var fiveDayArray = [response.list[0], response.list[8], response.list[16], response.list[24], response.list[32]];
            console.log(response)
            for (i = 0; i < fiveDayArray.length; i++){






                console.log(fiveDayArray[i].dt_txt)
                var fiveDayDate = $("<p>").text("Date: " + fiveDayArray[i].dt_txt)
                var newTile = $("<div>", {class: "tile is-parent alignedRight "})
                var newDiv = $("<div>", {class: "is-child tile notification fiveDayStyle blueBackGround"});
                var toFahrenheit =  (((fiveDayArray[i].main.temp-273.15)*1.8)+32).toFixed(1);
                var nextDayTemp = $("<p>").text("Temp: " + toFahrenheit + "°F");
                var nextDayHumid = $("<p>").text("Humidity: " + fiveDayArray[i].main.humidity + "%");
                newTile.append(newDiv)
                newDiv.append(fiveDayDate)
                newDiv.append(nextDayTemp);
                newDiv.append(nextDayHumid);
                var fiveDayBox = $("#fiveDayBox")
                fiveDayBox.append(newTile)
                fiveDayBox.children().first().remove()
                




            }
        });

        
        
        
        


        // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
        
    });




        // var uvApiKey = "uvi?appid=b8b85456ce2e8007f70d09f5a693fd00";
        // var uvSearchedCity = $("#citySearched").val();
        // var uvUrl = "http://api.openweathermap.org/data/2.5/";
        // var latitude = "&lat=" + response.coord.lat;
        // var longitude = "&lon=" + response.coord.lon;
        // var uvCompleteUrl = uvUrl + uvApiKey + latitude + longitude;






};

// function uvPull() {
//     var uvApiKey = "&appid=b8b85456ce2e8007f70d09f5a693fd00";
//     var uvSearchedCity = $("#citySearched").val();
//     var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=";
//     var latitude = "&lat=" + "";
//     var longitude = "&lon=" + "";
//     var uvCompleteUrl = uvUrl + uvApiKey + latitude + longitude;
//}






//http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}














