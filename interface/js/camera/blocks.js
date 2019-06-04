var rgb = [0, 0, 0];
var colors = ['red', 'green', 'blue'];

var num2hex = rgb => {
    return rgb
        .map(color => {
            let str = color.toString(16);
            console.log(str);
            if (str.length === 1) {
                str = '0' + str;
            }

            return str;
        })
        .join('');
};

function generateRGBSlider() {
    var gColorPicker = d3
        .select('div#slider-color-picker')
        .append('svg')
        .attr('width', 300)
        .attr('height', 360)
        .append('g')
        .attr('transform', 'translate(0,20)');

    var box = gColorPicker
        .append('rect')
        .attr('width', 100)
        .attr('height', 100)
        .attr('transform', 'translate(20,200)')
        .attr('fill', `#${num2hex(rgb)}`);

    rgb.forEach((color, i) => {
        var slider = d3
            .sliderBottom()
            .min(0)
            .max(255)
            .step(1)
            .width(240)
            .default(rgb[i])
            .displayValue(false)
            .fill(colors[i])
            .on('onchange', num => {
                rgb[i] = num;
                box.attr('fill', `#${num2hex(rgb)}`);
                d3.select('p#value-color-picker').text(`RGB(${rgb})`);
            });

        gColorPicker
            .append('g')
            .attr('transform', `translate(30,${60 * i})`)
            .call(slider);
    });

    d3.select('p#value-color-picker').text(`RGB(${rgb})`);
}
