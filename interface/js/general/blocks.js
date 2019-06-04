var applyFuncVar;
var peakout;

function addAverageBlock(varName) {
    let out = mean(getVariableValueByName(varName));
    appendOutputText('Average of the values: ', 'average_out', out);
}

function addMaxBlock(varName) {
    var out = max(getVariableValueByName(varName));
    appendOutputText('The maximum of the selected variable is: ', 'max_text', out);
}

function addMinBlock(varName) {
    var out = min(getVariableValueByName(varName));
    appendOutputText('The maximum of the selected variable is: ', 'max_text', out);
}

function addSumBlock(varName) {
    var out = sum(getVariableValueByName(varName));
    appendOutputText('The sum of the selected variable is: ', 'sum_text', out);
}

function applyFunctionBlock() {
    const arr = getVariableValueByName(applyFuncVar);
    const func = getValueFromDomElement('applyfuncinput');
    const out = eval("arr.map(x =>" + func + ")");
    appendOutputText('The result of the function is: ', 'appfunc_text', out);
}

function findPeaksBlock(varName) {
    var ricker = d3_peaks.ricker;
    var findPeaks = d3_peaks.findPeaks()
        .kernel(ricker)
        .gapThreshold(1)
        .minLineLength(2)
        .minSNR(1.0)
        .widths([1,2,3]);
    const out = mapData(findPeaks(getVariableValueByName(varName)), "index");
    appendOutputText('The indices of the peak values: ', 'findpeaks_text', out);
}

function saveVariable() {
    var varName = getValueFromDomElement("varname");
    var varVal = getValueFromDomElement("varval").split(/[.,;\/ -]/).filter(function (item, idx) {
        return item.length >= 1;
    });
    if (varName.length <= 0 || varVal.length <= 0) {
        appendWarningText('You cannot empty name or value.');
    } else {
        if (_.isEqual(varVal, getVariableValueByName(varName))) {
            appendWarningText('A variable with same value is already created.');
        } else {
            createCodeVariable(varName, varVal);
            appendWarningText(varName + _issaved_lang + varVal, "variable_text_" + varName);
        }
    }
}

function saveDataType() {
    var varName = getValueFromDomElement("varname");
    var varVal = getValueFromDomElement("varval").split(/[.,;\/ -]/).filter(function (item, idx) {
        return item.length >= 1;
    });
    if (varName.length <= 0 || varVal.length <= 0) {
        appendWarningText('You cannot empty name or property.');
    } else {
        if (_.isEqual(varVal, getVariableValueByName(varName))) {
            appendWarningText('A data type with same value is already created.');
        } else {
            createNewDataType(varName, varVal);
            appendWarningText(varName + _issaveddatatype_lang + varVal, "variable_text_" + varName);
        }
    }
}

function saveVariableFromFunction(id, varVal) {
    var varName = getValueFromDomElement(id + "_savevarname");
    if (varName.length <= 0) {
        appendWarningText('You cannot empty name or value.');
    } else {
        if (_.isEqual(varVal, getVariableValueByName(varName))) {
            appendWarningText('A variable with same value is already created.');
        } else {
            createCodeVariable(varName, varVal);
            appendWarningText(varName + _issaved_lang + varVal, "variable_text_" + varName);
        }
    }
}