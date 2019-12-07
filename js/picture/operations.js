var imageContext;

function generateRangeSlider(min, max, step, fillColor, defaultRange, width) {
    step = step || 1;
    min = min || 0;
    max = max || 100;
    width = width || 200;
    fillColor = fillColor || '#2196f3';
    defaultRange = defaultRange || [0, 10];

    var sliderRange = d3
        .sliderBottom()
        .min(min)
        .max(max)
        .width(width)
        .step(step)
        .default(defaultRange)
        .displayValue(false)
        .fill(fillColor)
        .on('onchange', val => {
            d3.select('p#value-range').text(val.map(d3.format(',.0f')).join('-'));
            sliderMin = d3.min(val);
            sliderMax = d3.max(val);
        });

    var gRange = d3
        .select('div#slider-range')
        .append('svg')
        .attr('width', 300)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gRange.call(sliderRange);
}

function splitWithSlider(data) {
    if (sliderInterval[0] > 0) {
        console.log(sliderInterval[0]);
        console.log(sliderInterval[1]);
        return splitInterval(data, sliderInterval[0], sliderInterval[1]);
    }
}

function handleImageFiles() {
    var theGoods = document.getElementById('imageFile').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () { imgObjForVis.src = reader.result; });
    if (theGoods) { reader.readAsDataURL(theGoods); }
    imgObjForVis.onload = function () {
        var cv = document.getElementById('source-canvas');
        imageContext = cv.getContext('2d');
        cv.width = imgObjForVis.width;
        cv.height = imgObjForVis.height;
        imageContext.drawImage(imgObjForVis, 0, 0);
        imgObjForVis.style.display = 'none';
    }
}

function addPointerEventForColor(value) {
    var canvas = document.getElementById('source-canvas');
    var ctx = canvas.getContext('2d');
    var color = document.getElementById('color_output');

    function pick(event) {
        var x = event.layerX;
        var y = event.layerY;
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        var rgba = 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + (data[3] / 255) + ')';
        color.style.background = rgba;
        color.textContent = rgba;
        console.log(rgba);
    }

    canvas.addEventListener(value, pick);
}

let activeColor = 'red';
let yAxis = false;
var imgObjForVis = new Image;

function openPictureFromComputer() {
    $('#imageFile').trigger('click');
}

function pickColorWithMouseEvent(mouseEvent) {
    mouseEvent = mouseEvent || 'mousemove';
    var canvas = document.getElementById('source-canvas');
    var ctx = canvas.getContext('2d');
    var color = document.getElementById('color_output');
    canvas.addEventListener(mouseEvent, function (event) {
        var x = event.layerX;
        var y = event.layerY;
        var pixel = ctx.getImageData(x, y, 1, 1);
        var data = pixel.data;
        var rgba = 'rgba(' + data[0] + ', ' + data[1] +
            ', ' + data[2] + ', ' + (data[3] / 255) + ')';
        color.style.background = rgba;
        color.textContent = rgba;
    });
}

function displayImage(fileURL) {
    Caman("#source-canvas", fileURL, function () {
        // manipulate image here
        this.brightness(5).render();
    });
}

function openHistogram() {
    document.getElementById('visualization').innerHTML =
        '<div id="row">' +
        '<button id="red" class="focuser">++R</button>' +
        '<button id="green" class="focuser">++G</button>' +
        '<button id="blue" class="focuser">++B</button>' +
        '<button id="blend" class="focuser">Blend</button>' +
        '</div>' +
        '<div id="row"><svg width="1" height="1"></svg></div>';
    addListeners();
    calcAndGraph(imgObjForVis);
}


function histogram(data) {
    let W = 600
    let H = W / 1.8;
    const svg = d3.select('svg');
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = W - margin.left - margin.right;
    const height = H - margin.top - margin.bottom;
    let q = document.querySelector('svg');
    q.style.width = W;
    q.style.height = H;
    if (yAxis) { d3.selectAll("g.y-axis").remove(); yAxis = false; }
    function graphComponent(data, color) {
        d3.selectAll(".bar-" + color).remove();
        var data = Object.keys(data).map(function (key) { return { freq: data[key], idx: +key } });
        var x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) { return d.idx; })]);
        var y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function (d) { return d.freq; })]);
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        if (!yAxis) {
            yAxis = true;
            g.append("g")
                .attr("class", "y-axis")
                .attr("transform", "translate(" + -2 + ",0)")
                .call(d3.axisLeft(y).ticks(10).tickSizeInner(10).tickSizeOuter(2));
        }
        g.selectAll(".bar-" + color)
            .data(data)
            .enter().append("rect")
            .attr("class", "bar-" + color)
            .attr("fill", color)
            .attr("x", function (d) { return x(d.idx); })
            .attr("y", function (d) { return y(d.freq); })
            .attr("width", 2)
            .attr("opacity", 0.8)
            .attr("height", function (d) { return height - y(d.freq); })
    }
    graphComponent(data.gD, "green");
    graphComponent(data.bD, "blue");
    graphComponent(data.rD, "red");
    // graphComponent(data.pixelSum, "green");
}

function calcAndGraph(img) {
    console.log('calc');
    let rD = {}, gD = {}, bD = {};
    let ctx = imageContext;
    let pixelSum = {};
    const iD = ctx.getImageData(0, 0, img.width, img.height).data;
    for (var i = 0; i < 256; i++) { rD[i] = 0; gD[i] = 0; bD[i] = 0; }
    for (var i = 0; i <= 765; i++) { pixelSum[i] = 0; }
    for (var i = 0; i < iD.length; i += 4) {
        pixelSum[iD[i] + iD[i + 1] + iD[i + 2]]++;
        rD[iD[i]]++;
        gD[iD[i + 1]]++;
        bD[iD[i + 2]]++;
    }
    histogram({ pixelSum, rD, gD, bD });
}

function amplify(e) {
    const colors = ['red', 'green', 'blue'];
    const boost = e.target.id;
    if (boost == 'blend') {
        document.querySelectorAll('rect').forEach(bar => {
            bar.style.opacity = 0.7;
        });
    }
    else {
        activeColor = boost;
        const deaden = colors.filter(e => e !== boost);
        document.querySelectorAll('.bar-' + boost).forEach(bar => {
            bar.style.opacity = 1.0;
        });
        deaden.forEach(color => {
            document.querySelectorAll('.bar-' + color).forEach(bar => {
                bar.style.opacity = 0.2;
            });
        });
    }
}

function addListeners() {
    document.querySelectorAll("button.focuser").forEach(button => {
        button.addEventListener("click", amplify);
    });
}
