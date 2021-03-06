var containerBlockIds = [];
var selectedSource = 'default';
var cnt = 0;
var isTangibleInterface = false;

function incrementBlockCounter() {
    cnt += 1;
}

function createSourceTable() {
    const table = $('#dataSourceTable');
    const sources = [_general, _visual, _file, _map, _media, _microbit];
    const source_names = [_general_lang, _visual_lang, _file_lang, _map_lang, _media_lang, _microbit_lang];
    const source_colors = [_general_color, _visual_color, _file_color, _map_color, _picture_color, _microbit_color];
    for (let i = 0; i < sources.length; i++) {
        table.append(
            '<div class="icon" style="background:' + source_colors[i] + '" id="' + sources[i] + '">' +
            '<img class="icon" src="./media/type_icons/' + sources[i] + '.png">' +
            '<p id="' + sources[i] + '_icon" class="icon">' + source_names[i] + '</p>' +
            '</div>');
        addSourceClickFunctions(sources[i]);
    }
    blockMap.forEach(function (val, key) {
        isTangibleInterface ? appendBlockToTangible(key, val) : appendBlockToHolder(key, val);
    })
}

function appendBlockToTangible(blockID, source) {
    $('#left-copy-1tomany').append(
        '<ul class="collapsible" id="' + blockID + '_block">' +
        '    <li>' +
        '      <div class="collapsible-header" id="' + blockID + '"></div>' +
        '    </li>' +
        '</ul>'
    );
    giveBackgroundColor($('#' + blockID), source);
}

function appendBlockToHolder(blockID, source) {
    $('#left-copy-1tomany').append(
        '<ul class="collapsible" id="' + blockID + '_block">' +
        '    <li>' +
        '      <div class="collapsible-header" id="' + blockID + '"></div>' +
        '      <div class="collapsible-body" id="' + blockID + '_modal"></div>' +
        '    </li>' +
        '</ul>'
    );
    giveBackgroundColor($('#' + blockID), source);
}

function showBlockDialog(blockID, source, callback) {
    $('<ul class="collapsible" id="' + blockID + '_block">' +
        '    <li>' +
        '      <div class="collapsible-body" id="' + blockID + '_modal"></div>' +
        '    </li>' +
        '</ul>').dialog();
    giveBackgroundColor($('div#' + blockID + "_modal"), source);
    callback();
}

function giveBackgroundColor(currentBlock, source) {
    switch (source) {
        case _visual:
            currentBlock.css({
                'background-color': _visual_color,
                'color': 'white'
            });
            break;
        case _file:
            currentBlock.css({
                'background-color': _file_color,
                'color': 'white'
            });
            break;
        case _general:
            currentBlock.css({
                'background-color': _general_color,
                'color': 'white'
            });
            break;
        case _map:
            currentBlock.css({
                'background-color': _map_color,
                'color': 'white'
            });
            break;
        case _microbit:
            currentBlock.css({
                'background-color': _microbit_color,
                'color': 'white'
            });
            break;
        case _media:
            currentBlock.css({
                'background-color': _picture_color,
                'color': 'white'
            });
            break;
        default:
            break;
    }
}

function closeTab(tabID) {
    $("#" + tabID + "_key").remove();
    $("#" + tabID + "_tabcontent").remove();
}

function appendNewTab(tabID, callback) {
    if ($("#" + tabID + "_tabcontent").length <= 0) {
        $("#tab_list").append(
            '<li id="' + tabID + '_key" class="tab-link" data-tab="' + tabID + '_tabcontent">' + tabID +
            //'<i id="' + tabID + '_closebutton" class="fa fa-times" aria-hidden="true"></i>' +
            '</li>');
        $("#visualContainer").append(
            '<div id="' + tabID + '_tabcontent" class="tab-content">' +
            '   <div id="visualization_' + tabID + '"> </div>' +
            '</div>');
        /*document.getElementById(tabID + "_closebutton").addEventListener('click', function () {
            closeTab(tabID);
        });*/
        prepareTabList();
        callback();
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

function scrollToBlock(blockID) {
    var elmnt = document.getElementById(blockID + '_block');
    elmnt.scrollIntoView();
}

function addSourceClickFunctions(source) {
    $('#' + source).click(function () {
        selectedSource = source;
        changeSourceView(source);
    });
}

function changeSourceView(source) {
    if (source === _file)
        changeViewForFile();
    else if (source === _general)
        changeViewForGeneral();
    else if (source === _map)
        changeViewForMap();
    else if (source === _microbit)
        changeViewForMicrobit();
    else if (source === _media)
        changeViewForPicture();
    else if (source === _visual)
        changeViewForVisual();
}

function startOutputTabs() {
    appendNewTab(_file, function () {
        document.getElementById('visualization_' + _file).innerHTML =
            '<div id="tableArea"></div>';
    });
    appendNewTab(_visual, function () {
        document.getElementById('visualization_' + _visual).innerHTML =
            '<div id="chartArea"></div>' + '<div id="tableArea"></div>';
    });
    appendNewTab(_map, function () {
        document.getElementById('visualization_' + _map).innerHTML =
            '<div id="mapArea"></div>';
        openMap();
    });
}

function changeViewForFile() {
    appendNewTab(_file, function () {
        document.getElementById('visualization_' + _file).innerHTML =
            '<div id="tableArea"></div>';
    });
    scrollToBlock(_printtable);
}

function changeViewForGeneral() {
    scrollToBlock(_variable);
}

function changeViewForVisual() {
    appendNewTab(_visual, function () {
        document.getElementById('visualization_' + _visual).innerHTML =
            '<div id="chartArea"></div>' + '<div id="tableArea"></div>';
    });
    scrollToBlock(_drawchart);
}

function changeViewForMap() {
    appendNewTab(_map, function () {
        document.getElementById('visualization_' + _map).innerHTML =
            '<div id="mapArea"></div>';
    });
    scrollToBlock(_opengeojson);
    openMap();
}

function changeViewForMicrobit() {
    appendNewTab(_microbit, function () {
        document.getElementById('visualization_' + _microbit).innerHTML =
            '<div id="microbitsketch">' +
            '      <div class="property" style="max-width: 460px; min-width: 460px">\n' +
            '\n' +
            '        Led Matrix:\n' +
            '        <br/>\n' +
            '\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell1" onchange="updatePixel(0,0,this.checked)" /><label for="matrixCell1"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell2" onchange="updatePixel(0,1,this.checked)" /><label for="matrixCell2"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell3" onchange="updatePixel(0,2,this.checked)" /><label for="matrixCell3"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell4" onchange="updatePixel(0,3,this.checked)" /><label for="matrixCell4"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell5" onchange="updatePixel(0,4,this.checked)" /><label for="matrixCell5"></label></div>\n' +
            '        <br/>\n' +
            '\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell6" onchange="updatePixel(1,0,this.checked)" /><label for="matrixCell6"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell7" onchange="updatePixel(1,1,this.checked)" /><label for="matrixCell7"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell8" onchange="updatePixel(1,2,this.checked)" /><label for="matrixCell8"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell9" onchange="updatePixel(1,3,this.checked)" /><label for="matrixCell9"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell10" onchange="updatePixel(1,4,this.checked)" /><label for="matrixCell10"></label></div>\n' +
            '        <br/>\n' +
            '\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell11" onchange="updatePixel(2,0,this.checked)" /><label for="matrixCell11"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell12" onchange="updatePixel(2,1,this.checked)" /><label for="matrixCell12"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell13" onchange="updatePixel(2,2,this.checked)" /><label for="matrixCell13"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell14" onchange="updatePixel(2,3,this.checked)" /><label for="matrixCell14"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell15" onchange="updatePixel(2,4,this.checked)" /><label for="matrixCell15"></label></div>\n' +
            '        <br/>\n' +
            '\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell16" onchange="updatePixel(3,0,this.checked)" /><label for="matrixCell16"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell17" onchange="updatePixel(3,1,this.checked)" /><label for="matrixCell17"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell18" onchange="updatePixel(3,2,this.checked)" /><label for="matrixCell18"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell19" onchange="updatePixel(3,3,this.checked)" /><label for="matrixCell19"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell20" onchange="updatePixel(3,4,this.checked)" /><label for="matrixCell20"></label></div>\n' +
            '        <br/>\n' +
            '\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell21" onchange="updatePixel(4,0,this.checked)" /><label for="matrixCell21"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell22" onchange="updatePixel(4,1,this.checked)" /><label for="matrixCell22"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell23" onchange="updatePixel(4,2,this.checked)" /><label for="matrixCell23"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell24" onchange="updatePixel(4,3,this.checked)" /><label for="matrixCell24"></label></div>\n' +
            '        <div class="matrixCell"><input type="checkbox" id="matrixCell25" onchange="updatePixel(4,4,this.checked)" /><label for="matrixCell25"></label></div>\n' +
            '\n' +
            '\n' +
            '        <br/>\n' +
            '      </div>' +
            '</div>';
    });
    scrollToBlock(_connectdevice);
}

function changeViewForPicture() {
    appendNewTab(_media, function () {
        document.getElementById("imageFile").addEventListener("change", handleImageFiles);
        document.getElementById('visualization_' + _media).innerHTML =
            '<canvas id="source-canvas" width="600"></canvas>';
    });
    scrollToBlock(_openpicture);
}

function fillHTML() {
    // Translate index.html
    fillHTMLText('_cat', _cat_lang);
    fillHTMLText('_blocks', _blocks_lang);
    fillHTMLText('_output', _output_lang);
    fillHTMLText('_coding', _coding_lang);
    fillHTMLText('_func_def', _function_defs);
    fillHTMLText('_tuts', _tuts);
    fillHTMLText('_data_sets', _datasets);

    // Translate Block Titles
    fillHTMLText(_variable, _var_lang);
    fillHTMLText(_average, _average_lang);
    fillHTMLText(_pointerevent, _pointer_event_lang);
    fillHTMLText(_findpeaks, _findpeaks_lang);
    fillHTMLText(_max, _max_lang);
    fillHTMLText(_min, _min_lang);
    fillHTMLText(_scale, _scale_lang);
    fillHTMLText(_applyfunc, _applyfunc_lang);
    fillHTMLText(_trackcolor, _trackcolor_lang);
    fillHTMLText(_opencsvfromcomputer, _opencsv_comp_lang);
    fillHTMLText(_opencsvfromlink, _opencsv_link_lang);
    fillHTMLText(_listheaders, _listheaders_lang);
    fillHTMLText(_filter, _filter_lang);
    fillHTMLText(_uniquevals, _uniquevals_lang);
    fillHTMLText(_addgeojson, _addgeojson_lang);
    fillHTMLText(_findposition, _findpos_lang);
    fillHTMLText(_addmarker, _addmarker_lang);
    fillHTMLText(_threshold, _threshold_lang);
    fillHTMLText(_openpicture, _openpicture_lang);
    fillHTMLText(_averagepic, _averagepic_lang);
    fillHTMLText(_selectcolumn, _select_column_lang);
    fillHTMLText(_drawchart, _drawchart_lang);
    fillHTMLText(_drawchartwithvariable, _drawchartwithvariable_lang);
    fillHTMLText(_startwebcam, _start_webcam_lang);
    fillHTMLText(_histogram, _histogram_lang);
    fillHTMLText(_selectMapBackground, _select_mapbg_lang);
    fillHTMLText(_printtable, _print_table_chart_lang);
    fillHTMLText(_opengeojson, _opengeojson_lang);
    fillHTMLText(_sum, _sum_lang);
    fillHTMLText(_openjsonfromcomputer, _openjsonfromcomputer_lang);
    fillHTMLText(_openjsonfromlink, _openjsonfromlink_lang);
    fillHTMLText(_connectdevice, _connectdevice_lang);
    fillHTMLText(_gettemperature, _gettemperature_lang);
    fillHTMLText(_newfunction, _newfunction_lang);
    fillHTMLText(_count, _count_lang);
    fillHTMLText(_filtertable, _filtertable_lang);

    if (isTangibleInterface) {
        $(".collapsible").on('click', function (event) {
            let name = event.target.id;
            setupCurrentBlock(name);
            if (classes.indexOf(name) < 0) {
                classes.push(name);
                buttonColor.push(0);
            }
        });
    }
}

function fillHTMLText(id, tr) {
    if (document.getElementById(id) !== null) {
        document.getElementById(id).innerText = tr;
    }
}