let tableArray = [];

function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

var rowToHtml = function (row) {
    var result = "";
    for (key in row) {
        result += key + ": " + row[key] + "<br/>"
    }
    return result;
};

function getValueFromDomElement(id) {
    if (document.getElementById(id)) return $("#" + id).val();
}

function rgbToHsl(r, g, b) {
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
}

function rgbTextToNumber(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    for (let R in rgb) {
        let r = rgb[R];
        if (r.indexOf("%") > -1)
            rgb[R] = Math.round(r.substr(0, r.length - 1) / 100 * 255);
    }

    // Make r, g, and b fractions of 1
    let r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;

    return [r, g, b];
}

function rgbaTextToHslText(rgb) {
    let rgbaArray = rgbTextToNumber(rgb);
    let hsl = rgbToHsl(rgbaArray[0], rgbaArray[1], rgbaArray[2]);
    let out = "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)";
    return out;
}

function rgbaTextToHslLightText(rgb) {
    let rgbArray = rgbTextToNumber(rgb);
    let hsl = rgbToHsl(rgbArray[0], rgbArray[1], rgbArray[2]);
    let out = "hsl(" + hsl[0] + "," + hsl[1] + "%," + (hsl[2] - 20) + "%)";
    return out;
}
