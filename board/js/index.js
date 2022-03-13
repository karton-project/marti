let mode = 0;
let mainMap;
let popupArr;

const customPop = [
    {
        'className': 'racePop'
    },
    {
        'className': 'rushPop'
    },
    {
        'className': 'vocabPop'
    }
];

function createHTMLPopup(imageURL, title, text, city) {
    return '<img src="' + imageURL +
        '"><b>' + title +
        '</b><br><p>' + text +
        '</p><br><a href=' + '../index.html#' + city + '#' + mode + '>' + see_details + '</a>';
}

function populateHTMLPopups() {
    popupArr = [
        createHTMLPopup("", eu_h1, eu_h2, eu),
        createHTMLPopup("", ist_h1, ist_h2, tr),
        createHTMLPopup("", oslo_h1, oslo_h2, nor),
        createHTMLPopup("", liverpool_h1, liverpool_h2, uk),
        createHTMLPopup("", sydney_h1, sydney_h2, aus),
        createHTMLPopup("", silicon_h1, silicon_h2, silicon)
    ];
}

function buildMap() {
    populateHTMLPopups();
    document.getElementById('main_map').innerHTML = "";
    mainMap = L.map('main_map').setView(coordinates[0], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 6,
        minZoom: 2,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mainMap);
    L.marker(coordinates[0]).bindPopup(popupArr[0], customPop[mode]).addTo(mainMap).openPopup();
    for (var i = 1; i < coordinates.length; i++) {
        L.marker(coordinates[i])
            .bindPopup(popupArr[i], customPop[mode]).addTo(mainMap);
    }
}