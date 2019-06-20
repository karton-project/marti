/*
// A higher level language for tangible data manipulation
// Author: Alpay Sabuncuoglu
// email: sabuncuoglualpay@gmail.com
*/
//var csvData;

// Find the closest number from the data
function closestNumber(data, num) {
    var curr = data[0];
    var diff = Math.abs(num - curr);
    for (var val = 0; val < data.length; val++) {
        var newdiff = Math.abs(num - data[val]);
        if (newdiff < diff) {
            diff = newdiff;
            curr = data[val];
        }
    }
    return curr;
}

// compare two values
function compare(data1, data2, op) {
    op = op || 'default';
    if(!_.isEqual(parseFloat(data1), NaN)){
        data1 = parseFloat(data1);
    }
    if(!_.isEqual(parseFloat(data2), NaN)){
        data2 = parseFloat(data2);
    }
    switch (op) {
        case _less:
            return data1 < data2;
        case _greater:
            return data1 > data2;
        case _lesseq:
            return data1 <= data2;
        case _greateq:
            return data1 >= data2;
        case _equal:
            return data1 === data2;
        case 'default':
            return false;
    }
}

function count(data, el){
    let count = 0;
    if (el.length > 0){
        for(let i = 0; i < data.length; ++i){
            if(_.isEqual(data[i],el)){
                count++;
            }
        }
        return count;
    }else{
        var result = { };
        for(var i = 0; i < data.length; ++i) {
            if(!result[data[i]])
                result[data[i]] = 0;
            ++result[data[i]];
        }
        return result;
    }
}

// Return an array with equal size partition
function equalSlice(data, d) {

    if (d === null || d < 1) {
        console.log("Not a valid slice div number.")
        return data;
    }

    if (data === null || data.length <= 0) {
        console.log("Array is empty");
        return [];
    }

    var length = data.length;
    var index = length / d;
    var returnArr = [];

    for (var i = 0; i < d; i++) {
        returnArr.push(data.slice(i * index, (i + 1) * index));
    }

    return returnArr;
}

function filter(data, comparedValue, operation) {
    let output = data.filter(d => {
        return compare(d, comparedValue, operation);
    });
    return output;
}

function findLocalPeaks(data) {
    return findPeaks(data);
}

// Lists the key values of json object or map
function listKeyElements(data) {
    data = data || fileData;
    var keyArray = [];
    if (d3.keys(data[0]).length > 0) {
        keyArray = d3.keys(data[0]);
    }
    return keyArray;
}

// Find the mean value
function mean(data) {
    let output = d3.mean(data);
    return output;
}


function map(data, callee) {
    return data.map(callee);
}

// Finds the maximum value from a json object if key is provided, else returns the maximum value from array
function max(data, key) {
    key = key || 0;
    if (typeof data === "object"){
        data = Object.keys( data ).map(function ( key ) { return data[key]; });
    }
    let output = (key === 0) ? d3.max(data) : d3.max(data, function (d) {
        return d[key]
    });
    return output;
}

// Finds the minimum value from a json object if key is provided, else returns the maximum value from array
function min(data, key) {
    key = key || 0;
    if (typeof data === "object"){
        data = Object.keys( data ).map(function ( key ) { return data[key]; });
    }
    let output = (key === 0) ? d3.min(data) : d3.min(data, function (d) {
        return d[key]
    });
    return output;
}

function sum(data) {
    if (typeof data === "object"){
        data = Object.keys( data ).map(function ( key ) { return data[key]; });
    }
    return data.reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
}

function readCSVFile(fileURL, callback) {
    d3.csv(fileURL).then(function (data) {
        callback(data);
    });
}

function readJSONFile(fileURL, callback) {
    d3.json(fileURL).then(function (data) {
        callback(data);
    });
}

function getColumnHeaders(csvData) {
    return csvData.columns;
}

// Scale a data to one range
function scale(data, scaleRange) {
    return d3.scaleLinear().domain(data).range(scaleRange);
}

function splitInterval(data, begin, end) {
    begin = begin || 0;
    end = end || 0;
    return data.slice(begin, end);
}

// Split the into two from the threshold and return the larger part
function splitNumericLarger(data, treshold) {
    var closest = closestNumber(data, treshold);
    var index = data.indexOf(closest);
    return data.slice(index, data.length);
}


// Split the data into two from the threshold and return the less part
function splitNumericLess(data, treshold) {
    var closest = closestNumber(data, treshold);
    var index = data.indexOf(closest);
    return data.slice(0, index + 1);
}

