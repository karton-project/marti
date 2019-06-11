let fileData;
let jsonData;
let dataArray = [];

function filter(data, variableValue, comparedValue, operation) {
    let output = data.filter(d => {
        return compare(d[variableValue], comparedValue, operation);
    });
    return output;
}

function mapData(data, mapField) {
    return data.map(d => d[mapField]);
}

function prepareDataArray(fileData, callback) {
    var titles = d3.keys(fileData[0]);
    var cnt = 0;
    for (var t of titles) {
        if (!_.isEqual(t, "ID")) {
            dataArray[cnt] = [t];
            fileData.map(function (d) {
                dataArray[cnt].push(d[t]);
            });
            cnt++;
        }
    }
    callback(dataArray);
}

function defineVariablesUserTable(title, data) {
    for(let i = 0; i < title.length; i++){
        let col = data.map(function(value, index) { return value[i]; });
        createCodeVariable(title[i], col);
    }
}

function defineVariablesFromFileData() {
    prepareDataArray(fileData, function (d) {
        var jsonData = Object.assign({}, d);
        createCodeVariable(fileName, fileData);
        for (var key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                createCodeVariable(jsonData[key][0], jsonData[key].slice(1, jsonData[0].length));
            }
        }
    })
}

function defineVariablesFromDataForBlockly() {
    prepareDataArray(fileData, function (data) {
        var jsonData = Object.assign({}, data);
        for (var key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                createCodeVariableForBlockly(jsonData[key][0], jsonData[key].slice(1, jsonData[0].length));
            }
        }
    })
}

function uniqueValues(data) {
    var output = data.filter(onlyUnique);
    return output;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
