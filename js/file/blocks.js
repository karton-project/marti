let operation, variableValue, listHeaders, selectedColumn, selectedDataForColumn, webLink,
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

function addFilterTableCode() {
    let comparedValue = getValueFromDomElement('comparedValue');
    let variableValue = getValueFromDomElement('variableValue');
    let output = filterTable(fileData, variableValue, comparedValue, operation);
    appendOutputText(_filter_Table_output_text, "filterResultDiv", output, false);
    drawTable(output);
}

function addUniqueValuesCode() {
    if (uniqueValuesVariable.length > 0) {
        let result = uniqueValues(getVariableValueByName(uniqueValuesVariable));
        appendOutputText(_uniquevals_output.format(uniqueValuesVariable), "uniqueValTextDiv", result);
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
        defineVariablesFromFileData(webLink);
        appendOutputText(_open_link_output, "linkOpenTextDiv", "");
    });
}

function openJSONWithLink() {
    webLink = getValueFromDomElement("openJSONLinkInput");
    d3.json(webLink).then(function (data) {
        fileData = data;
        drawTable(data);
        defineVariablesFromFileData();
        appendOutputText(_open_link_output, "linkOpenTextDiv", "");
    });
}