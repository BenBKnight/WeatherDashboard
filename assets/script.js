
$("#citySearch").on("click", function (e) {
    weatherPull();
});





function weatherPull() {
    var weatherApiKey = "&appid=b8b85456ce2e8007f70d09f5a693fd00";
    var searchedCity = $("#citySearched").val();
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    var completeUrl = weatherUrl + searchedCity + weatherApiKey;

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=houston&appid=b8b85456ce2e8007f70d09f5a693fd00",
        method: "GET"
    }).then(function (response) {
        var placeForCity = $("#cityName");
        var placeForTemp = $("#temperature");
        var placeForHumid = $("#humidity");
        var placeForWind = $("#windSpeed");

        console.log(response)
        placeForCity.text(response.name);
        placeForTemp.text(response.main.temp);
        placeForHumid.text(response.main.humidity);
        placeForWind.text(response.wind.speed);


    });
    console.log(completeUrl)
};
