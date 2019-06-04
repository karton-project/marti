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
    appendOutputText('You took the average of every data point in this picture.');
}

function pictureApplyThreshold() {
    Caman.Filter.register("threshold", function (e) {
        return this.process("threshold", function (r) {
            var t = .2126 * r.r + .7152 * r.g + .0722 * r.b;
            r.r = e < t ? 255 : 0, r.g = e < t ? 255 : 0, r.b = e < t ? 255 : 0
        }), this
    });
    Caman("#source-canvas", function () {
        this.revert(false);
        this.threshold();
        this.render();
    });
    appendOutputText('Threshold value is: ' + sliderMin + ' - ' + sliderMax);
}
