var placesList;

function addGEOJsonCode() {
    openGEOJSON();
    appendOutputText(_add_geojson_text);
}

function findPositionCode() {
    var  placeName = getValueFromDomElement("findPosInput");
    findPosition(placeName);
}

function addMarkerCode() {
    addMarkerArray(placesList);
    appendOutputText(_places_added_text);
}