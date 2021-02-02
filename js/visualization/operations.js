let chart, fileName, xAxis_var, chartTypeSel;
let chartisactive = false;
let tableArray = [];

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

function drawCharts(chartType) {
    chartType = chartType || chartTypeSel;

    let charttitle = getValueFromDomElement('setChartTitle');
    var data = google.visualization.arrayToDataTable(tableArray);
    var options = {
        title: charttitle
    };

    switch (chartType) {
        case _linechart:
            var chart = new google.visualization.LineChart(document.getElementById('chartArea'));
            break;
        case _piechart:
            var chart = new google.visualization.PieChart(document.getElementById('chartArea'));
            break;
        case _barchart:
            var chart = new google.visualization.BarChart(document.getElementById("chartArea"));
            break;
        default:
            break;
    }

    chart.draw(data, options);
}

function drawChartWithXY(chartType) {
    chartType = chartType || chartTypeSel;
    let dataArray = [];
    let x_cats = getVariableValueByName(xAxis_var);
    let charttitle = getValueFromDomElement('setChartTitle');
    let dim = findChartDimensions();
    let y_values = getValueFromDomElement('chooseYaxis');
    let valArr = y_values.split(', ').filter(Boolean).map(function (item) {
        return item.trim();
    });
    for (let val of valArr) {
        let y_val = getVariableValueByName(val);
        y_val.unshift(val);
        dataArray.push(y_val);
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
                categories: x_cats
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
    tableArray.push(title);
    let tableRows = [];
    for (let i = 0; i <= cntrow; i++) {
        let rowInput = getValueFromDomElement("rowinput" + i).split(/[ ,]+/);
        tableRows.push(rowInput);
        tableArray.push([rowInput[0], parseInt(rowInput[1])]);
    }
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