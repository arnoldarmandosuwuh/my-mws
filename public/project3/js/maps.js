var currentLocation = [];
var mymap;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(loc) {
        console.log(loc.coords.latitude);
        console.log(loc.coords.longitude);
        console.log(loc.coords.accuracy);

        currentLocation = [loc.coords.latitude, loc.coords.longitude];
        mymap = L.map('mapid').setView(currentLocation, 20);
        L.marker(currentLocation).addTo(mymap);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 20,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYXJub2xkYXJtYW5kbzA3IiwiYSI6ImNqbWV5ZW5ueTFvMjAzcWxodWk5aW1pNWkifQ.vpy9jJBkKHo_CJpC9XXcYw'
        }).addTo(mymap);
    });
}

var urlZomatos = "https://developers.zomato.com/api/v2.1/";
var locationSearch = urlZomatos + "locations?query=";
var searchRestoran = urlZomatos + "search?";
var userKey = "2c95c8b54e3bbc8251157a9f0f2041a2";

var requestLocation = function (e, self) {
    if (e.keyCode && e.keyCode === 13) {
        let query = self.value.trim();
        if (query) {
            let getLocationURl = locationSearch + query;
            fetch(getLocationURl, {
                method: 'GET',
                headers: {
                "Content-Type": "application/json; charset=utf-8",
                "user-key": userKey
                }
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                currentLocation = [data.location_suggestions[0].latitude, data.location_suggestions[0].longitude];
                mymap.setView(currentLocation, 11);
                L.marker(currentLocation).addTo(mymap);

                requestRestaurants(currentLocation);
            })
            .catch(err => console.log(err));
        }
        else {
            console.log("cannot set nul value");
        }
    }
}

var requestRestaurants = function (location) {
    let getRestaurantsURl = searchRestoran + `lat=${location[0]}&lon=${location[1]}&radius=200`;
    fetch(getRestaurantsURl, {
        method: "GET",
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            'user-key': userKey
        }
    })
    .then(response => response.json())
    .then(data => {
        let placeResponses = data.restaurants;

        for (m of placeResponses) {
          let p = m.restaurant.location;
          let place = [p.latitude, p.longitude];
          L.marker(place).addTo(mymap);
        }
    })
    .catch(err => console.log(err));
}