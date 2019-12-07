var placesList;

function addGEOJsonCode() {
    addGEOJSON();
    appendOutputText('Added the selected geojson file to map.');
}

function findPositionCode() {
    var  placeName = getValueFromDomElement("findPosInput");
    findPosition(placeName);
}

function addMarkerCode() {
    addMarkerArray(placesList);
    appendOutputText('List of places is added to map');
}