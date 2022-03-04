var applyFuncVar, countedvar, scaledVariable;

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

function addFilterCode() {
    let comparedValue = getValueFromDomElement('comparedValue');
    let data = getVariableValueByName(variableValue);
    let output = filter(data, comparedValue, operation);
    appendOutputText('Filtered variable is printed', "filterVarResultDiv", output, true);
}

function applyScale() {
    let scaleRange = getValueFromDomElement("applyscaleinput").split(/[.,;\/ -]/).filter(function (item, idx) {
        return item.length >= 1;
    });
    scaleRange = scaleRange.map(Number);
    let out = scale(getVariableValueByName(scaledVariable), scaleRange);
    appendOutputText('The result of the scaling is: ', 'scale_text', out);
}

function countBlock() {
    var out = count(getVariableValueByName(countedvar), getValueFromDomElement("countinput"));
    appendOutputText('The total count of the selected variable is: ', 'cnt_text', out);
}

function findPeaksBlock(varName) {
    var ricker = d3_peaks.ricker;
    var findPeaks = d3_peaks.findPeaks()
        .kernel(ricker)
        .gapThreshold(1)
        .minLineLength(2)
        .minSNR(1.0)
        .widths([1, 2, 3]);
    const out = mapData(findPeaks(getVariableValueByName(varName)), "index");
    appendOutputText('The indices of the peak values: ', 'findpeaks_text', out);
}

function saveVariable() {
    var varName = getValueFromDomElement("varname");
    var varVal = getValueFromDomElement("varval").split(/[.,;\/ -]/).filter(function (item, idx) {
        return item.length >= 1;
    });
    if (varName.length <= 0 || varVal.length <= 0) {
        appendToastText('You cannot empty name or value.');
    } else {
        if (_.isEqual(varVal, variables.get(varName))) {
            appendToastText('A variable with same value is already created.');
        } else {
            createCodeVariable(varName, varVal);
            appendToastText(varName + _issaved_lang + varVal, "variable_text_" + varName);
        }
    }
}

function saveNewFunc() {
    var varName = getValueFromDomElement("varname");
    var varVal = getValueFromDomElement("varval").split(/[.,;\/ -]/).filter(function (item, idx) {
        return item.length >= 1;
    });
    if (varName.length <= 0 || varVal.length <= 0) {
        appendToastText('You cannot empty name or property.');
    } else {
        if (_.isEqual(varVal, variables.get(varName))) {
            appendToastText('A function with same operation is already created.');
        } else {
            createNewFunc(varName, varVal);
            appendToastText(varName + _issaveddatatype_lang + varVal, "variable_text_" + varName);
        }
    }
}

function saveVariableFromFunction(id, varVal) {
    var varName = getValueFromDomElement(id + "_savevarname");
    varVal = JSON.parse(varVal);
    if (varName.length <= 0) {
        appendToastText('You cannot empty name or value.');
    } else {
        if (_.isEqual(varVal, variables.get(varName))) {
            appendToastText('A variable with same value is already created.');
        } else {
            (_.isObject(varVal[0])) ? createFileVariable(varName, varVal): createCodeVariable(varName, varVal);
            appendToastText(varName + _issaved_lang + varVal, "variable_text_" + varName);
        }
    }
}