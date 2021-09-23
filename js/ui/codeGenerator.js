var variables = new Map();
var files = new Map();
var functionDefs = new Map();

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
    return Array.from(variables.keys());
}

function listFileKeys() {
    return Array.from(files.keys());
    //return Array.from(files.keys());
}

function getVariableValueByName(varName) {
    try {
        if (typeof files.get(varName) === "undefined") {
            if (_.contains(variables.get(varName).map(Number), NaN)) {
                return variables.get(varName);
            } else {
                return variables.get(varName).map(Number);
            }
        } else {
            return files.get(varName);
        }
    } catch (error) {
        appendToastText(error);
    }


}

function clearOutputArea() {
    document.getElementById('outputText').innerHTML = '';
}