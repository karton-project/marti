function closeTab(tabID) {
    $("#" + tabID + "_key").remove();
    $("#" + tabID + "_tabcontent").remove();
}

function appendNewTab(tabID) {
    if (!$("#" + tabID + "_tabcontent").length) {
        $("#tab_list").append('<li id="' + tabID + '_key" class="tab-link" data-tab="' + tabID + '_tabcontent">' + tabID + '\t<i id="' + tabID + '_closebutton" class="fa fa-times" aria-hidden="true"></i></li>');
        $("#visualContainer").append(
            '<div id="' + tabID + '_tabcontent" class="tab-content">' +
            '   <div id="visualization_' + tabID + '"> </div>' +
            '</div>');
        document.getElementById(tabID + "_closebutton").addEventListener('click', function () {
            closeTab(tabID);
        });
        prepareTabList();
    }
    $("ul").find("[data-tab='" + tabID + "_tabcontent']").trigger('click');
}

function prepareTabList() {
    $('ul.tabs li').click(function () {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })
}

function activateCSVInput() {
    d3.select("#csvFile").on("change", function () {
        var file = d3.event.target.files[0];
        printCSVFiles(file);
        defineVariablesFromDataForBlockly();
    });
}

function changeViewForCamera() {
    appendNewTab(_camera);
    document.getElementById('visualization_' + _camera).innerHTML =
        '<video id="video" width="600" height="450" preload autoplay loop muted controls></video>';
    startWebcam();
}

function changeViewForFile() {
    appendNewTab(_file);
    document.getElementById('visualization_' + _file).innerHTML =
        '<div id="tableArea"></div>';
}

function changeViewForMap() {
    appendNewTab(_map);
    document.getElementById('visualization_' + _map).innerHTML =
        '<div id="mapArea"></div>';
    openMap(1);
}

function changeViewForPicture() {
    appendNewTab(_picture);
    document.getElementById('visualization_' + _picture).innerHTML =
        '<canvas id="source-canvas" width="600"></canvas>';
}

function changeViewForVisual() {
    appendNewTab(_visual, function () {
        document.getElementById('visualization_' + _visual).innerHTML =
            '<div id="chartArea"></div>' + '<div id="tableArea"></div>';
    });
}

function changeViewForP5() {
    appendNewTab(_p5, function () {
        document.getElementById('visualization_' + _p5).innerHTML =
            '<div id="p5Container" width="500px" height="500px"></div>';
    });
}