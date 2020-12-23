var map = L.map('mapid').setView([39.2, 35.2], 6.2);
mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors'
    }).addTo(map);


/*

// Add Stamen Watercolor Layer
map.addLayer(new L.StamenTileLayer("watercolor", {
    detectRetina: true
}));

for (var i = 0; i < cities.length -1; i++) {
    marker = new L.marker([cities[i].lat, cities[i].lon])
        .bindPopup(cities[i].name)
        .addTo(map);
}
*/

$.get('./data/unesco-2019.csv', function(csvString) {
    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;

    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
    for (var i in data) {
      var row = data[i]

      var marker = L.marker([row.Latitude, row.Longitude], {
        opacity: 1
      }).bindPopup(row.Zorluklar)
      
      marker.addTo(map)
    }

  });

function changeFormVisibility(visibility){
    if (visibility){
        document.getElementById("JotFormIFrame-202713730199051").style.visibility = "visible";
    }else {
        document.getElementById("JotFormIFrame-202713730199051").style.visibility = "hidden";
    }
}