function findLocation(x,y) {
    // console.log(x,y);    
    for (var i=0; i< places.length;i++) {
        if (places[i].lokasi[0]==x && 
            places[i].lokasi[1]==y) {
            return i;
        }
    }
    return -1;
}
function showLocation(e) {   
    //console.log("you clicked " + e.latlng.lat + " dan "+ e.latlng.lng);
    let ix= findLocation(e.latlng.lat,e.latlng.lng);
    if (ix >=0) {
        img.src= places[ix].gambar;
        par.textContent=places[ix].review;
    }
}

let gmb= document.getElementById("gmb");
let rev= document.getElementById("review");
let img= document.createElement('img');
let par= document.createElement('p');
gmb.appendChild(img);
rev.appendChild(par);

let r0="Sop Ayam Pak Min Klaten menyediakan sop ayam dengan rasa yang khas klaten dengan tempat dan harga yang terjangkau.";
let r1="Bakso Kalap ini enak-enak menunya. Harganya juga murah meriah";
let r2="Citra pemuda terkenal dengan ayam gorengnya. Namun kali ini saya nyobain menu lainnya, yaitu ayam bakar. Kalau disini, kamu nggak akan nemu ayam bakar karena nggak ada di menu. Di Citra pemuda mereka menyebutnya Kalasan.";
let r3="Menu yang menjadi Menu Favorit, yaitu Ayam Goreng Nelongso Plus Nasi, Cukup merogok kocek Rp 5000. Seperti di Outlet lainnya, di outlet Klampis ini juga terdapat 10 sambal favorit yang di sediakan kepada pelanggan secara gratis. ";
let r4="Rodo Pizza & Bar dengan segala macam varian menu INDONESIAN CUISINE ";
let places= [ 
    {"lokasi": [-7.2906328, 112.780654], "sponsor" : "Sop Ayam Pak Min Klaten", "gambar":"data/images/Sop.jpg","review": r0},
    {"lokasi": [-7.2900495, 112.7768881], "sponsor" : "Bakso Kalap & Ayam Bakar", "gambar":"data/images/Bakso.jpg","review": r1},
    {"lokasi": [-7.2910159, 112.7771672], "sponsor" : "Ayam Goreng Citra Pemuda", "gambar":"data/images/Citra.jpg","review": r2},
    {"lokasi": [-7.290106, 112.7766039], "sponsor" : "Ayam Goreng Nelongso Cab. Klampis", "gambar":"data/images/Nelongso.jpg","review": r3},
    {"lokasi": [-7.2901326, 112.7764376], "sponsor" : "Rodo Pizza & Bar", "gambar":"data/images/Rodo.jpg","review": r4}
];

for (var p of places) {
    var marker= L.marker(p.lokasi).addTo(mymap)
     .bindPopup(p.sponsor);
    marker.on('click', showLocation);
}