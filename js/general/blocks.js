var applyFuncVar, countedvar, scaledVariable;

function addAverageBlock(varName) {
    let out = mean(getVariableValueByName(varName));
    appendOutputText(_average_result_text, 'average_out', out);
}

function addMaxBlock(varName) {
    var out = max(getVariableValueByName(varName));
    appendOutputText(_max_result_text, 'max_text', out);
}

function addMinBlock(varName) {
    var out = min(getVariableValueByName(varName));
    appendOutputText(_min_result_text, 'max_text', out);
}

function addSumBlock(varName) {
    var out = sum(getVariableValueByName(varName));
    appendOutputText(_sum_result_test, 'sum_text', out);
}

function applyFunctionBlock() {
    const arr = getVariableValueByName(applyFuncVar);
    const func = getValueFromDomElement('applyfuncinput');
    const out = eval("arr.map(x =>" + func + ")");
    appendOutputText(_apply_func_result_text, 'appfunc_text', out);
}

function addFilterCode() {
    let comparedValue = getValueFromDomElement('comparedValue');
    let data = getVariableValueByName(variableValue);
    let output = filter(data, comparedValue, operation);
    appendOutputText(_filter_var_result_text = 'Filtered variable is printed', "filterVarResultDiv", output, true);
}

function applyScale() {
    let scaleRange = getValueFromDomElement("applyscaleinput").split(/[.,;\/ -]/).filter(function (item, idx) {
        return item.length >= 1;
    });
    scaleRange = scaleRange.map(Number);
    let out = scale(getVariableValueByName(scaledVariable), scaleRange);
    appendOutputText(_scaling_result_text = 'The result of the scaling is: ', 'scale_text', out);
}

function countBlock() {
    var out = count(getVariableValueByName(countedvar), getValueFromDomElement("countinput"));
    appendOutputText(_count_result_text, 'cnt_text', out);
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
    appendOutputText(_peak_indices_text, 'findpeaks_text', out);
}

function saveVariable() {
    var varName = getValueFromDomElement("varname");
    var varVal = getValueFromDomElement("varval").split(/[.,;\/ -]/).filter(function (item, idx) {
        return item.length >= 1;
    });
    if (varName.length <= 0 || varVal.length <= 0) {
        appendToastText(_empty_variable_name_warning);
    } else {
        if (_.isEqual(varVal, variables.get(varName))) {
            appendToastText(_variable_with_same_name_warning);
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
        appendToastText(_empty_function_name_warning);
    } else {
        if (_.isEqual(varVal, variables.get(varName))) {
            appendToastText(_function_with_same_name_warning);
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
        appendToastText(_empty_variable_name_warning);
    } else {
        if (_.isEqual(varVal, variables.get(varName))) {
            appendToastText(_variable_with_same_value_warning);
        } else {
            (_.isObject(varVal[0])) ? createFileVariable(varName, varVal): createCodeVariable(varName, varVal);
            appendToastText(varName + _issaved_lang + varVal, "variable_text_" + varName);
        }
    }
}