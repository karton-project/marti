let comparedValue, operation, variableValue, listHeaders, selectedColumn, selectedDataForColumn, webLink,
    uniqueValuesVariable = "";

function activateCSVInput() {
    $('#csvFile').trigger('click');
    d3.select("#csvFile").on("change", function () {
        var file = d3.event.target.files[0];
        printCSVFiles(file);
        appendOutputText(file.name + _file_is_selected_lang, "fileSelectTextDiv", "");
    });
}

function activateJSONInput() {
    $('#jsonFile').trigger('click');
    d3.select("#jsonFile").on("change", function () {
        var file = d3.event.target.files[0];
        printJSONFiles(file);
        appendOutputText(file.name + _file_is_selected_lang, "jsonelectTextDiv", "");
    });
}

function addFilterCode() {
    comparedValue = getValueFromDomElement('comparedValue');
    let output = filter(fileData, variableValue, comparedValue, operation);
    appendOutputText('Filtered table is printed', "filterResultDiv", output, false);
    drawTable(output);
}

function addUniqueValuesCode() {
    if (uniqueValuesVariable.length > 0) {
        let result = uniqueValues(getVariableValueByName(uniqueValuesVariable));
        appendOutputText('Unique values are mapped from ' + uniqueValuesVariable + 'and the result is: ', "uniqueValTextDiv", result);
    } else {
        appendWarningText('You need to select a variable.');
        console.log("Hello");
    }
}

function listHeaderBlock() {
    var lke = listKeyElements(fileData);
    createCodeVariable(listHeaders, lke);
    appendOutputText('List of headers: ', "listHeadersDiv", lke);
}

function selectColumnBlock() {
    selectedColumn = getValueFromDomElement('selectedColumnInput');
    var result = mapData(getVariableValueByName(selectedDataForColumn), selectedColumn);
    createCodeVariable("selectedColumn", result);
    appendOutputText(selectedColumn + ' column is selected. Column contains the values: ', "selectColumnTextDiv", result);
}

function openCSVWithLink() {
    webLink = getValueFromDomElement("openCSVLinkInput");
    d3.csv(webLink).then(function (data) {
        fileData = data;
        drawTable(data);
        defineVariablesFromFileData();
        appendOutputText("CSV from weblink is opened.", "linkOpenTextDiv", "");
    });
}

function openJSONWithLink() {
    webLink = getValueFromDomElement("openJSONLinkInput");
    d3.json(webLink).then(function (data) {
        fileData = data;
        drawTable(data);
        defineVariablesFromFileData();
        appendOutputText("JSON from weblink is opened.", "linkOpenTextDiv", "");
    });
}