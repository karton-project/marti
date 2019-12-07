var map, mapLoaded = false, geoJsonData;

function addMarker(lat, lon){
    var marker = L.marker([lat, lon]).addTo(map);
}

function addMarkerFromResult(result){
    if(typeof result["latitude"] === 'undefined'){
        addMarker(result["lat"], result["lon"]);
    }else{
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
    for(var result of results){
        var openStreetMapGeocoder = GeocoderJS.createGeocoder('openstreetmap');
        openStreetMapGeocoder.geocode(result, function(out) {
            console.log(out);
            addMarkerFromResult(out[0]);
        });
    }
}

function openMap(val) {
    $('#mapArea').addClass('mapArea');
    var layer = _terrain;
    if(mapLoaded){
        map.off();
        map.remove();
    }
    if (_.isEqual(0, val)){
        layer = "toner";
    }else if (_.isEqual(1, val)){
        layer = "terrain";
    }else if (_.isEqual(2, val)){
        layer = "watercolor";
    }

    map = new L.Map('mapArea', {
        center: new L.LatLng(0, 0),
        zoom: 1
    });
    map.addLayer(new L.StamenTileLayer(layer, {
        detectRetina: true
    }));
    mapLoaded = true;
    addGEOCoderSearchBar();
}

function openGEOJSON() {
    d3.select("#geoJSONFile").on("change", function () {
        var file = d3.event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                var dataUrl = evt.target.result;
                readJSONFile(dataUrl, function (data) {
                    geoJsonData = data;
                });
            };
            reader.readAsDataURL(file);
        }
    });

    $('#geoJSONFile').trigger('click');
}

function addGEOJSON() {
    L.geoJSON(jsonData, {}).addTo(map);
}

function addGEOCoderSearchBar() {
    var osmGeocoder = new L.Control.OSMGeocoder({placeholder: 'Search location...'});
    map.addControl(osmGeocoder);
}
