var codeVariables = "";
var codeRest = "";
var variables = new Map();
var files = new Map();
var functionDefs = new Map();
var blocks = new Map();

function createCodeVariable(varName, varVal) {
    variables.set(varName, varVal);
}

function createFileVariable(varName, varVal) {
    files.set(varName, varVal);
}


function createNewFunc(varName, varVal) {
    functionDefs.set(varName, varVal);
}

function listVariableKeys() {
    return Array.from(variables.keys()).concat(Array.from(files.keys()));
}

function listFileKeys() {
    return Array.from(files.keys()).concat(Array.from(variables.keys()));
}

function listVariablesAsArray() {
    return Array.from(variables);
}

function listVariableKeysAsBlocklyDropdown() {
    var variableKeys = Array.from(variables.keys());
    var out = [];
    for (var i = 0; i < variableKeys.length; i++) {
        out.push([variableKeys[i], variableKeys[i]]);
    }
    return out;
}

function getVariableValueByName(varName) {
    if (typeof files.get(varName) === "undefined") {
        if (_.contains(variables.get(varName).map(Number), NaN)) {
            return variables.get(varName);
        } else {
            return variables.get(varName).map(Number);
        }
    } else {
        return files.get(varName);
    }
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

function clearOutputArea() {
    document.getElementById('outputText').innerHTML = '';
}