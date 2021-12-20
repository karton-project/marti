var map, mapLoaded = false,
    geoJsonData;

function addMarker(lat, lon) {
    var marker = L.marker([lat, lon]).addTo(map);
}

function addMarkerFromResult(result) {
    if (typeof result["latitude"] === 'undefined') {
        addMarker(result["lat"], result["lon"]);
    } else {
        addMarker(result["latitude"], result["longitude"]);
    }
}

function findPosition(placeName) {
    var openStreetMapGeocoder = GeocoderJS.createGeocoder('openstreetmap');
    openStreetMapGeocoder.geocode(placeName, function(out) {
        addMarkerFromResult(out[0]);
        appendOutputText('Place is added to coordinate: ', "findPosTextDiv", JSON.stringify(out[0]));
    });
}

function addMarkerArray(results) {
    for (var result of results) {
        var openStreetMapGeocoder = GeocoderJS.createGeocoder('openstreetmap');
        openStreetMapGeocoder.geocode(result, function(out) {
            console.log(out);
            addMarkerFromResult(out[0]);
        });
    }
}

function openMap() {
    $('#mapArea').addClass('mapArea');

    if (mapLoaded) {
        map.off();
        map.remove();
    }
    map = L.map('mapArea').setView([38, 27], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    mapLoaded = true;
    addGEOCoderSearchBar();
}

function openGEOJSON() {
    let geo = L.geoJson({ features: [] }, {
        onEachFeature: function popUp(f, l) {
            var out = [];
            if (f.properties) {
                for (var key in f.properties) {
                    out.push(key + ": " + f.properties[key]);
                }
                l.bindPopup(out.join("<br />"));
            }
        }
    }).addTo(map);

    d3.select("#geoJSONFile").on("change", function() {
        var file = d3.event.target.files[0];
        if (file) {
            shp(file).then(function(data) {
                geo.addData(data);
            });
        }
    });

    $('#geoJSONFile').trigger('click');


}

function addGEOJSON() {
    L.geoJSON(jsonData, {}).addTo(map);
}

function addGEOCoderSearchBar() {
    var osmGeocoder = new L.Control.OSMGeocoder({ placeholder: 'Search location...' });
    map.addControl(osmGeocoder);
}