var varName = "varName";
var varVal = ["valVal"];
var selectedSource = "";
var sliderMax = 100, sliderMin = 50;
let blockDiv;
let tableDiv;
let blockTitle;
let cntrow = 0;

function openBlockDetails(blockId) {
    prepareBlocks(blockId);
}

function appendOutputText(line, id, val, print) {
    print = (typeof print === 'undefined') ? true : print;
    val = (typeof val === 'undefined') ? "" : JSON.stringify(val, undefined, 2);
    val = (val.constructor === Array) ? val : [val];
    var $row = $('<tr />'),
        rowText = $('<td />', {id: id + cnt, text: line + (print ? val : "")}),
        rowSave = $('<td />', {id: id + cnt + "_savebuttondiv"});
    $('#outputTable').prepend($row.append(rowText, rowSave));
    if (typeof val !== "undefined") {
        appendExpandableSaveField($('#' + id + cnt + "_savebuttondiv"), id + cnt, val);
    }
    cnt++;
}

function appendOutputHTML(code) {
    $('#outputText').append(code);
}

function appendWarningText(text) {
    var warningBar = document.getElementById("snackbar");
    warningBar.innerText = text;
    warningBar.className = "show";
    setTimeout(function () {
        warningBar.className = warningBar.className.replace("show", "");
    }, 3000);
}

function appendExpandableSaveField(savediv, id, value) {
    savediv.append(
        '<div class="tooltip">\n' +
        '        <div class="fa fa-save"</div>\n' +
        '        <span class="savetext save-tooltip-container ">\n' +
        '           <input type="text" id="' + id + '_savevarname" name="savevarname" placeholder="' + _saveas_lang + '">\n' +
        '           <button id="' + id + '_savebutton"> OK </button>' +
        '        </span>\n' +
        '</div>');
    document.getElementById(id + "_savebutton").addEventListener('click', function () {
        saveVariableFromFunction(id, value);
    })
}

function prepareVariableModal(blockDiv, title, onclickfun) {
    $(function () {
        var $form = $('<form />'),
            frmSave = $('<p />', {id: "createVarText", text: title}),
            frmName = $('<input />', {id: 'varname', name: 'varname', placeholder: _varname_lang, type: 'text'}),
            frmVal = $('<input />', {id: 'varval', name: 'Value', placeholder: _varval_lang, type: 'text'}),
            frmButton = $('<input />', {
                id: 'savebutton',
                type: "button",
                name: "saveButton",
                value: _savebutton_lang,
                onClick: onclickfun
            }),
            warnText = $('<p id="variableWarning"></p>');
        $form.append(frmSave, frmName, frmVal, $('<br />'), frmButton, warnText).appendTo(blockDiv);
    });
}

function prepareBlocks(blockId) {
    // select the block in coding areas
    blockDiv = $("#right-copy-1tomany > ul > li > #" + blockId + "_modal");
    if (blockDiv.is(':empty')) {
        // General Operations

        // new data type
        if (blockId.includes(_newfunction)) {
            prepareVariableModal(blockDiv, _newfunction_text_lang, "saveNewFunc()");
        }

        // define variable
        if (blockId.includes(_variable)) {
            prepareVariableModal(blockDiv, _createvar_text_lang, "saveVariable()");
        }

        // average
        if (blockId.includes(_average)) {
            $(function () {
                prepareSelectVariableModal(_average_lang + '<br>' + _selectvar_text_lang, function (value) {
                    addAverageBlock(value);
                });
            });
        }

        // average
        if (blockId.includes(_count)) {
            $(function () {
                prepareSelectVariableModal(_count_lang + '<br>' + _count_text_lang, function (value) {
                    countedvar = value;
                });
                var $countDiv =
                    $('<input type="text" id="countinput" name="countinput" placeholder="' + _count_lang + '">' +
                        '<button onclick="countBlock()">' + _applybutton_lang + '</button>');
                $countDiv.appendTo(blockDiv);


            });
        }

        // select max element of array
        if (blockId.includes(_max)) {
            prepareSelectVariableModal(_selectvar_text_lang, function (value) {
                addMaxBlock(value);
            }, "maxopts");
        }

        // return sum of the array
        if (blockId.includes(_sum)) {
            prepareSelectVariableModal(_sum_txt_lang, function (value) {
                addSumBlock(value);
            }, "sumopts");
        }

        // select min element of array
        if (blockId.includes(_min)) {
            prepareSelectVariableModal(_selectvar_text_lang, function (value) {
                addMinBlock(value);
            }, "minopts");
        }

        // apply the given function to variable
        if (blockId.includes(_applyfunc)) {
            $(function () {
                prepareSelectVariableModal(_function_lang + '<br>' + _applyfunc_text_lang, function (value) {
                    applyFuncVar = value;
                });
                var $applyFuncDiv = $('<p>' + _applyfunc_text_lang + '</p>\n' +
                    '<input type="text" id="applyfuncinput" name="applyfuncinput" placeholder="' + _function_lang + '">' +
                    '<button onclick="applyFunctionBlock()">' + _applybutton_lang + '</button>');
                $applyFuncDiv.appendTo(blockDiv);
            })
        }

        // filter with the selected variable with comparison func
        if (blockId.includes(_filter)) {
            prepareSelectVariableModal(_selectfiltervar_text_lang, function (value) {
                variableValue = value;
            }, 'condVariableDiv');
            blockDiv.append('<p>' + _definecomparisonfunction_lang + '</p>');
            blockDiv.append(
                '<div class="bia-holder">' +
                '<select id="comparisonOperation">' +
                '<option id="selectVar">' + _operation_lang + '</option></select>' +
                '<input type="text" id="comparedValue" name="compared value" placeholder="' + _varval_lang + '"></div>\n');
            blockDiv.append('<button onclick="addFilterCode()"> ' + _applybutton_lang + ' </button>');
            createComparisonSelection();
        }

        // find peak values
        if (blockId.includes(_findpeaks)) {
            $(function () {
                prepareSelectVariableModal(_findpeaks_text_lang, function (value) {
                    findPeaksBlock(value);
                });
            });
        }

        // returns the unique values of selected variable
        if (blockId.includes(_uniquevals)) {
            prepareSelectVariableModal(_selectvar_text_lang, function (value) {
                uniqueValuesVariable = value;
            }, 'uniqueValsSelectDiv');
            blockDiv.append('<button onclick="addUniqueValuesCode()"> OK </button>');
        }

        // scale the given variable
        if (blockId.includes(_scale)) {
            prepareSelectVariableModal(_scale_lang, function (value) {
                scaledVariable = value;
            }, "scaleop");
            var $applyScaleDiv = $('<p>' + _applyfunc_text_lang + '</p>\n' +
                '<input type="text" id="applyscaleinput" name="applyscaleinput" placeholder="' + _scale_lang + '">' +
                '<button onclick="applyScale()">' + _applybutton_lang + '</button>');
            $applyScaleDiv.appendTo(blockDiv);
        }

        // Chart Operations

        // create line chart
        if (blockId.includes(_printTable)) {
            $(function () {
                tableDiv = $(
                    '<div style="display: block" class="add-row-container">' +
                    '<input type="text" id="rowinput' + cntrow + '" name="rowinput" placeholder="' + _add_row_lang + " " + cntrow + '">' +
                    '<i onclick="addRow()" class="fas fa-plus add-button"></i>' +
                    '</div>');
                blockDiv.append('<input type="text" id="headerinput" name="headerinput" placeholder="' + _add_headers_lang + '">');
                blockDiv.append(tableDiv);
                blockDiv.append('<button onclick="createTableWithHeaders()">' + _show_button_lang + '</button>');
                blockDiv.append('<button onclick="saveTable()">' + _savebutton_lang + '</button>');
            })
        }

        // create line chart
        if (blockId.includes(_drawchart)) {
            $(function () {
                prepareSelectVariableModal(_addXAxis_text_lang, function (value) {
                    xAxis_var = value;
                }, 'xAxisChooseDiv');

                prepareChartListModal(_select_chart_type_lang, function (value) {
                    chartTypeSel = value;
                    transformChart(value);
                }, 'chartTypeChooseDiv');

                blockDiv.append(
                    '<label for="chooseYaxis">' + _addYAxis_text_lang + '</label>\n' +
                    '<input type="text" id="chooseYaxis" name="chooseYaxis" placeholder="' + _addYAxis_lang + '">' +
                    '<label for="setChartTitle">' + _add_title_text_lang + '</label>\n' +
                    '<input type="text" id="setChartTitle" name="setChartTitle" placeholder="' + _add_title_lang + '">' +
                    '<button onclick="drawChart()">' + _applybutton_lang + '</button>');
            })
        }

        // File Operations

        // open csv file from computer
        if (blockId.includes(_opencsvfromcomputer)) {
            $(function () {
                var $openCSV = $(
                    '<p>' + _opencsv_comp_lang + '</p>' +
                    '<button onclick="activateCSVInput()">' + _selectfile_lang + '</button>'
                );
                $openCSV.appendTo(blockDiv);
            })
        }

        // open csv file via link
        if (blockId.includes(_opencsvfromlink)) {
            $(function () {
                var $openCSV = $(
                    '<label for="openCSVLink">' + _link_input_lang + '</label>\n' +
                    '<input type="text" id="openCSVLinkInput" name="openCSVLink" placeholder="' + _web_link_lang + '">' +
                    '<button onclick="openCSVWithLink()">' + _applybutton_lang + '</button>'
                );
                $openCSV.appendTo(blockDiv);
            })
        }

        // open json file from computer
        if (blockId.includes(_openjsonfromcomputer)) {
            $(function () {
                var $openJSON = $(
                    '<p>' + _openjsonfromcomputer_lang + '</p>' +
                    '<button onclick="activateJSONInput()">' + _selectfile_lang + '</button>'
                );
                $openJSON.appendTo(blockDiv);
            })
        }

        // open json file via link
        if (blockId.includes(_openjsonfromlink)) {
            $(function () {
                var $openJSON = $(
                    '<label for="openJSONLink">' + _opencsv_link_lang + '</label>\n' +
                    '<input type="text" id="openJSONLinkInput" name="openJSONLink" placeholder="' + _web_link_lang + '">' +
                    '<button onclick="openJSONWithLink()">' + _applybutton_lang + '</button>'
                );
                $openJSON.appendTo(blockDiv);
            })
        }

        // select a column from open file
        if (blockId.includes(_selectcolumn)) {
            prepareSelectVariableModal(_selectvar_text_lang, function (value) {
                selectedDataForColumn = value;
            }, 'selectedColumnDiv');
            blockDiv.append('<label for="selectedColumnInput">' + _selectcolumn_text_lang + '</label>\n' +
                '<input type="text" id="selectedColumnInput" name="selectedColumnInput">');
            blockDiv.append('<button onclick="selectColumnBlock()"> OK </button>');
        }

        // filter with the selected variable with comparison func
        if (blockId.includes(_filtertable)) {
            prepareSelectFileModal(_filtertable_detail_lang, function (value) {
                fileData = getFileValueByName(value);
            }, 'selFileDiv');
            blockDiv.append('<p>' + _definecomparisonfunction_lang + '</p>');
            blockDiv.append(
                '<div class="bia-holder">' +
                '<input type="text" id="variableValue" name="variablevalue" placeholder="' + _varname_lang + '"></div>\n' +
                '<select id="comparisonOperation">' +
                '<option id="selectVar">' + _operation_lang + '</option></select>' +
                '<input type="text" id="comparedValue" name="comparedvalue" placeholder="' + _varval_lang + '"></div>\n');
            blockDiv.append('<button onclick="addFilterTableCode()"> ' + _applybutton_lang + ' </button>');
            createComparisonSelection();
        }

        // get list of headers
        if (blockId.includes(_listheaders)) {
            $(function () {
                prepareSelectFileModal(_listheaders_text_lang, function (value) {
                    fileData = getFileValueByName(value);
                }, 'listHeadDiv');
                var $listHeaderDiv = $(
                    '<button onclick="listHeaderBlock()"> OK </button>'
                );
                $listHeaderDiv.appendTo(blockDiv);
            })
        }

        //Micro:bit Operations

        // connect micro:bit device
        if (blockId.includes(_connectdevice)) {
            $(function () {
                var $connectdeviceDiv = $(
                    '<p>' + _connectdevice_text_lang + '</p>' +
                    '<button onclick="searchDevice()">' + _connect_lang + '</button>'
                );
                $connectdeviceDiv.appendTo(blockDiv);
            })
        }

        // get temperature of micro:bit
        if (blockId.includes(_gettemperature)) {
            $(function () {
                var tempRecordingOpts = [_buttonTempRecordinA, _buttonTempRecordingB, _buttonTempRecordingAB, _timeInterval3, _timeInterval5, _timeInterval10, _timeInterval60];
                prepareSelectOptionModal(_gettemperature_text_lang, tempRecordingOpts, function (value) {
                    selectedTempRecordingOpt = value;
                }, 'selectTempRecordEvent');
                var $getTempDiv = $('<button onclick="startTemperatureRecording()">' + _start_lang + '</button>');
                $getTempDiv.appendTo(blockDiv);
            })
        }

        // Camera Operations

        // start device camera
        if (blockId.includes(_startwebcam)) {
            $(function () {
                var $startCamDiv = $(
                    '<p>' + _start_webcam_text_lang + '</p>' +
                    '<button onclick="startWebcam()">' + _start_lang + '</button>'
                );
                $startCamDiv.appendTo(blockDiv);
            })
        }

        // track selected color from webcam
        if (blockId.includes(_trackcolor)) {
            $(function () {
                var $rgbSlider = $(
                    '<p id="value-color-picker"></p>' +
                    '<div id="slider-color-picker"></div>'
                );
                $rgbSlider.appendTo(blockDiv);
                generateRGBSlider();
            })
        }

        // Map Operations

        // open GEOJSON file
        if (blockId.includes(_opengeojson)) {
            $(function () {
                var $openGeoJson = $(
                    '<p>' + _opengeojson_text_lang + '</p>' +
                    '<button onclick="openGEOJSON()">' + _selectfile_lang + '</button>'
                );
                $openGeoJson.appendTo(blockDiv);
            })
        }

        // add the  open geojson file
        if (blockId.includes(_addgeojson)) {
            $(function () {
                var $addGeoFileDiv = $('<p>' + _addgeojson_text_lang + '</p>\n' +
                    '<button onclick="addGEOJsonCode()">' + _add_lang + '</input>');
                $addGeoFileDiv.appendTo(blockDiv);
            });
        }

        // find position with name on map
        if (blockId.includes(_findposition)) {
            $(function () {
                var $findPosDiv = $(
                    '<label for="findPosInput">' + _findpos_text_lang + '</label>\n' +
                    '<input type="text" id="findPosInput" name="findPosInput" placeholder="' + _enter_position + '">' +
                    '<button onclick="findPositionCode()">' + _applybutton_lang + '</button>'
                );
                $findPosDiv.appendTo(blockDiv);
            })
        }

        // add marker to map
        if (blockId.includes(_addmarker)) {
            prepareSelectVariableModal(_selectvar_text_lang, function (value) {
                placesList = getVariableValueByName(value);
            }, 'placesSelectDiv');
            blockDiv.append('<button onclick="addMarkerCode()">' + _add_lang + '</button>');
        }

        // select map background
        if (blockId.includes(_selectMapBackground)) {
            $(function () {
                var $openMapBGDiv = $(
                    '<p>' + _select_mapbg_lang + '</p>' +
                    '<button onclick="openMap(0)">' + _map_bg_bw_lang + '</button>' +
                    '<button onclick="openMap(1)">' + map_bg_geog_lang + '</button>' +
                    '<button onclick="openMap(2)">' + map_bg_watercolor_lang + '</button>'
                );
                $openMapBGDiv.appendTo(blockDiv);
            });
        }

        // Picture Operations

        // select picture from computer
        if (blockId.includes(_openpicture)) {
            $(function () {
                var $openPic = $(
                    '<p>' + _openpic_comp_lang + '</p>' +
                    '<button onclick="openPictureFromComputer()">' + _selectfile_lang + '</button>'
                );
                $openPic.appendTo(blockDiv);
            })
        }

        // get the grayscale picture
        if (blockId.includes(_averagepic)) {
            $(function () {
                var $averagePicDiv = $(
                    '<p>' + _averagepic_lang + '</p>' +
                    '<button onclick="pictureAverage()">' + _applybutton_lang + '</button>'
                );
                $averagePicDiv.appendTo(blockDiv);
            })
        }

        // picture threshold
        if (blockId.includes(_threshold)) {
            $(function () {
                var $sliderDiv = $(
                    '<p>' + _threshold_text_lang + '</p>' +
                    '<div class="row align-items-center">' +
                    '<div class="col-sm-2">' +
                    '<p id="value-ra    nge"></p>' +
                    '</div>' +
                    '<div class="col-sm">' +
                    '<div id="slider-range"></div>' +
                    '</div>' +
                    '</div>' +
                    '<button onclick="pictureApplyThreshold()" ">' + _applybutton_lang + '</button>');

                $sliderDiv.appendTo(blockDiv);
                generateRangeSlider(0, 255, 1, null, [50, 100], 255);
            })
        }

        if (blockId.includes(_pointerevent)) {
            $(function () {
                var events = [_click_lang, _mousemove_lang];
                prepareSelectOptionModal(_selectvar_text_lang, events, function (value) {
                    addPointerEventForColor(value);
                    appendOutputText('Pointer event ' + value + ' is added. The current color:', _pointerevent + "outtext");
                    appendOutputHTML('<div id="color_output"></div>');
                    pickColorWithMouseEvent();
                }, 'selectPointerEvent');
            });
        }

        // Fill the title, background and collapsible areas
        blockTitle = $("#right-copy-1tomany > ul > li > #" + blockId);
        blockTitle.append('<div class="fa fa-chevron-up rotate"</div>');

        blockDiv.css({
            'background-color': rgbaTextToHslLightText(blockTitle.css("background-color")),
            'display': "block"
        });
        blockTitle.on('click', function () {
            if (document.getElementById(blockId + "_modal").style.display === "none") {
                document.getElementById(blockId + "_modal").style.display = "block";
            } else {
                document.getElementById(blockId + "_modal").style.display = "none";
            }
            blockTitle.find(".rotate").toggleClass("down");
        });
    }
}

function createComparisonSelection() {
    $(function () {
        var varKeys = [_equal, _greater, _less, _greateq, _lesseq];
        var select = document.getElementById('comparisonOperation');
        for (var i = 0; i < varKeys.length; i++) {
            var opt = varKeys[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }

        $('#comparisonOperation').change(function () {
            var value = $(this).val();
            console.log(value);
            operation = value;
        });

    })
}

function prepareSelectOptionModal(modalDefinition, options, callback, divID) {
    $(function () {
        divID = divID || 'selectVariable';
        blockDiv.prepend(
            '<p id="selectOptText">' + modalDefinition + '</p>' +
            '<select id="' + divID + '">' +
            '<option id="selectVar">' + _choose_option_lang + '</option>' +
            '</select>'
        );

        var varKeys = options;
        var select = document.getElementById(divID);
        for (var i = 0; i < varKeys.length; i++) {
            var opt = varKeys[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }

        $('#' + divID).change(function () {
            var value = $(this).val();
            callback(value);
        });

    })
}

function addRow() {
    let curr_row = getValueFromDomElement("rowinput" + cntrow);
    if (curr_row.length > 0) {
        cntrow += 1;
        tableDiv.append(
            '<div style="display: block" class="add-row-container">' +
            '<input type="text" class="add-input" id="rowinput' + cntrow + '" name="rowinput" placeholder="' + _add_row_lang + " " + cntrow + '">' +
            '<i onclick="addRow()" class="fas fa-plus add-button"></i>' +
            '</div>');
    }
}

function prepareSelectVariableModal(modalDef, callback, divID) {
    prepareSelectOptionModal(modalDef, listVariableKeys(), callback, divID);
}

function prepareSelectFileModal(modalDef, callback, divID) {
    prepareSelectOptionModal(modalDef, listFileKeys(), callback, divID);
}

function prepareChartListModal(modalDef, callback, divID) {
    prepareSelectOptionModal(modalDef, _chartTypes, callback, divID);
}

function setupCurrentBlock(blockID) {
    if (document.getElementById("trained_card_info") !== null)
        document.getElementById("trained_card_info").innerHTML = 'Training for: ' + blockID;
    selectedOperation = blockID;
}