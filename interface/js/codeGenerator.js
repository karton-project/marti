var codeVariables = "";
var codeRest = "";
var variables = new Map();
var datatypes = new Map();
var blocks = new Map();

function mergeCode() {
    workspaceToCode();
    appendVariablesToCode();
    appendBlocksToCode();
    return codeVariables + codeRest;
}

function workspaceToCode() {
    if (_.isEqual(selectedSource, _picture)) {
        for (var blockID of containerBlockIds) {
            if (_.isEqual(blockID, _average + "_block")) {
                pictureAverage();
            }
            if (_.isEqual(blockID, _threshold + "_block")) {
                pictureApplyThreshold();
            }
        }
    }
}

function createCodeVariable(varName, varVal) {
    variables.set(varName, varVal);
}

function createNewDataType(varName, varVal){
    datatypes.set(varName, varVal);
}

function listVariableKeys() {
    return Array.from(variables.keys());
}

function listVariablesAsArray() {
    return Array.from(variables);
}
function listVariableKeysAsBlocklyDropdown() {
    var variableKeys = Array.from(variables.keys());
    var out = [];
    for(var i = 0; i<variableKeys.length; i++){
        out.push([variableKeys[i], variableKeys[i]]);
    }
    return out;
}

function getVariableValueByName(varName) {
    return variables.get(varName);
}

function createCodeBlocks(blockID, blockCode) {
    blocks.set(blockID, blockCode);
}

function appendBlocksToCode() {
    codeRest = "";
    for (var [key, value] of blocks) {
        codeRest += value + ';\n';
    }
}

function deleteFromCode(codeLine) {
    codeRest.replace(codeLine, '');
}

function appendVariablesToCode() {
    codeVariables = "";
    for (var [key, value] of variables) {
        codeVariables += "var " + key + " = " + JSON.stringify(value) + ';\n';
    }
}

function appendToCodingArea(blockID) {
    if (!_.isEqual(blockID, undefined)) {
        $('#right-copy-1tomany').append('<div class="codeblock ex-moved" id="' + blockID + '">' + blockID + '</div>');
    }
}

function clearOutputArea() {
    document.getElementById('outputText').innerHTML = '';
}

function runCode() {
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = mergeCode();
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}