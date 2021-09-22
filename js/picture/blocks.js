function pictureAverage() {
    Caman.Filter.register("grayscale", function () {
        return this.process("grayscale", function (r) {
            var a = .33 * r.r + .33 * r.g + .34 * r.b;
            r.r = a, r.g = a, r.b = a
        }), this
    });
    Caman("#source-canvas", function () {
        this.revert(false);
        this.grayscale();
        this.render();
    });
}

function pictureApplyBinaryThreshold(){
    Caman.Filter.register("threshold", function () {
        this.process("threshold", function (rgba) {
            var lumin = (0.2126 * rgba.r) + (0.7152 * rgba.g) + (0.0722 * rgba.b);
            rgba.r = lumin < limit ? 0 : 255;
            rgba.g = lumin < limit ? 0 : 255;
            rgba.b = lumin < limit ? 0 : 255;
        });
        return this;
    });
    Caman("#source-canvas", function () {
        this.revert(false);
        this.threshold();
        this.render();
    });
}

function pictureApplyThreshold() {
    Caman.Filter.register("threshold", function (limit) {
        this.process("threshold", function (rgba) {
            rgba.r = rgba.r  < sliderMin ? 0 : rgba.r;
            rgba.g = rgba.g < sliderMin ? 0 : rgba.g;
            rgba.b = rgba.b < sliderMin ? 0 : rgba.b;

            rgba.r = rgba.r > sliderMax ? 255 : rgba.r;
            rgba.g = rgba.g > sliderMax ? 255 : rgba.g;
            rgba.b = rgba.b > sliderMax ? 255 : rgba.b;
        });
        return this;
    });
    Caman("#source-canvas", function () {
        this.revert(false);
        this.threshold();
        this.render();
    });
}
