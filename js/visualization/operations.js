let chart, fileName, xAxis_var, chartTypeSel;
let chartisactive = false;

function drawChartWithXY(chartType) {
    chartType = chartType || chartTypeSel;
    let dataArray = [];
    let x_cats = getVariableValueByName(xAxis_var);
    let charttitle = getValueFromDomElement('setChartTitle');
    let y_values = getValueFromDomElement('chooseYaxis');
    let valArr = y_values.split(',').map(function (item) {
        return item.trim();
    });
    for (let val of valArr) {
        let y_val = getVariableValueByName(val);
        y_val.unshift(val);
        dataArray.push(y_val);
    }
    chart = c3.generate({
        bindto: d3.select('#chartArea'),
        title: {
            text: charttitle
        },
        data: {
            columns: dataArray,
            type: chartType
        },
        axis: {
            x: {
                text: xAxis_var,
                type: 'category',
                tick: {
                    rotate: -45,
                    multiline: false
                },
                categories: x_cats
            },

            y: {
                label: { // ADD
                    text: y_values,
                    position: 'outer-middle'
                }
            }
        }
    });
    chartisactive = true;
    transformChart(chartType);
    if (womenParticipationLevelMode && !x_cats.includes("Denmark") && !x_cats.includes("Sweden") && chartType === "bar"){
        openWomenParticipationDialog(_women_participation_4_title, _women_participation_4_text);
    }
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