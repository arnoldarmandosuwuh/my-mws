// function onLocationFound(e) {
//     var radius = e.accuracy / 2;

//     L.marker(e.latlng).addTo(mymap)
//         .bindPopup("You are within " + radius + " meters from this point").openPopup();

//     L.circle(e.latlng, radius).addTo(mymap);
// }

// mymap.on('locationfound', onLocationFound);
// function onLocationError(e) {
//     alert(e.message);
// }

// mymap.on('locationerror', onLocationError);

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

// mymap.on('click', onMapClick);

function findLocation (x,y) {
    for (var i=0; i< places.length;i++){
        if(places[i].lokasi[0]==x && places[i].lokasi[1]==y){
            L.marker(e.latlng).addTo(mymap)
             .bindPopup("You are within " + radius + " meters from this point").openPopup();
             return i;
        }
    }
    return -1;
}
function showLocation(e){
    let ix = findLocation(e.langlng.lat, e.langlng.lng);
    if(ix >= 0){
        img.src = places[ix].gambar;
        parent.textContent = places[ix].review;
    }
}
(async function(){
    const URL="peta.json";
    try {
        let resp = await(fetch(URL));
        let resp2 = await resp.json();
        localStorage.setItem('places', JSON.stringify(resp2.places));
    } catch (err) {
       console.log(err) 
    }
})();
let gmb = document.getElementById("gmb");
let rev = document.getElementById("review");
let img = document.getElementById('img');
let par = document.getElementById('p');
gmb.appendChild(img);
rev.appendChild(par);

let places = JSON.parse(localStorage.getItem('places'));
for (var p of places) {
    var marker = L.marker(p.lokasi).addTo(mymap).bindPopup(p.sponsor);
    marker.on('click', showLocation);
}