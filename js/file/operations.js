let fileData, jsonData;
let dataArray = [];

function drawTable(data, titles) {
    fileData = data;
    chartisactive = false;
    var sortAscending = true;
    if (document.getElementById('tableArea') !== null) {
        document.getElementById('tableArea').innerHTML = '';
    }
    var table = d3.select('#tableArea').append('table');
    titles = titles || d3.keys(data[0]);
    var headers = table.append('thead').append('tr')
        .selectAll('th')
        .data(titles).enter()
        .append('th')
        .text(function (d) {
            return d;
        })
        .on('click', function (d) {
            headers.attr('class', 'header');

            if (sortAscending) {
                rows.sort(function (a, b) {
                    return d3.descending(b[d], a[d]);
                });
                sortAscending = false;
                this.className = 'aes';
            } else {
                rows.sort(function (a, b) {
                    return d3.ascending(b[d], a[d]);
                });
                sortAscending = true;
                this.className = 'des';
            }

        });
    titles = d3.keys(data[0]);
    var rows = table.append('tbody').selectAll('tr')
        .data(data).enter()
        .append('tr');
    rows.selectAll('td')
        .data(function (d) {
            return titles.map(function (k) {
                return {'value': d[k], 'name': k};
            });
        }).enter()
        .append('td')
        .attr('data-th', function (d) {
            return d.name;
        })
        .text(function (d) {
            return d.value;
        });
}

function printCSVFiles(file) {
    if (file) {
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            var dataUrl = evt.target.result;
            readCSVFile(dataUrl, function (data) {
                fileData = data;
                fileName = file.name;
                drawTable(data);
                defineVariablesFromFileData();
            });
        };
        reader.readAsDataURL(file);
    }
}

function printJSONFiles(file) {
    if (file) {
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            var dataUrl = evt.target.result;
            readJSONFile(dataUrl, function (data) {
                fileData = data;
                fileName = file.name;
                drawTable(data);
                defineVariablesFromFileData();
            });
        };
        reader.readAsDataURL(file);
    }
}

function filterTable(data, variableValue, comparedValue, operation) {
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

function defineVariablesFromFileData(link) {
    prepareDataArray(fileData, function (d) {
        var jsonData = Object.assign({}, d);
        if (link) fileName = webLink.split('/').pop();
        createFileVariable(fileName, fileData);
        for (var key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                createCodeVariable(jsonData[key][0], jsonData[key].slice(1, jsonData[0].length));
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
