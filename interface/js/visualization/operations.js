let chart, fileName, xAxis_var;
let chartisactive = false;
let tableRows = [];

function findChartDimensions() {
    let chartAreaWidth = $("#visualization_tabcontent").width() - 10;
    let chartAreaHeight = $("#visualization_tabcontent").width() - 30;
    return [chartAreaHeight, chartAreaWidth];
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

function drawTable(data, titles) {
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

function drawChart(chartType) {
    let dataArray = [];
    let values = xAxis_var + ", ";
    let charttitle = getValueFromDomElement('setChartTitle');
    let dim = findChartDimensions();
    values += getValueFromDomElement('chooseYaxis');
    let valArr = values.split(', ').filter(Boolean).map(function (item) {
        return item.trim();
    });
    for (let val of valArr) {
        dataArray.push(getVariableValueByName(val));
    }
    chart = c3.generate({
        bindto: '#chartArea',
        title: {
            text: charttitle
        },
        size: {
            width: (dim[0] < 300) ? 300 : dim[0],
            height: (dim[1] < 300) ? 240 : dim[1],
        },
        data: {
            columns: dataArray,
            type: chartType
        },
        axis: {
            x: {
                type: 'category',
                tick: {
                    rotate: -45,
                    multiline: false
                },
                categories: valArr
            },
            y: {
                label: { // ADD
                    text: 'CSV Values',
                    position: 'outer-middle'
                }
            }
        }
    });
    chartisactive = true;
}

function createTableWithHeaders() {
    let title = getValueFromDomElement("headerinput").split(/[ ,]+/);
    tableRows.push(getValueFromDomElement("rowinput" + cntrow).split(/[ ,]+/));
    drawTable(tableRows, title);
    defineVariablesUserTable(title, tableRows);
}

function transformChart(chartType) {
    if (typeof chart !== 'undefined' && chartisactive) {
        switch (chartType) {
            case _linechart:
                chart.transform("line");
                break;
            case _piechart:
                chart.transform("pie");
                break;
            case _barchart:
                chart.transform("bar");
                break;
            default:
                break;
        }
    }
}