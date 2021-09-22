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