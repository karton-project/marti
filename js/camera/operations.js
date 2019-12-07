function startWebcam() {
    var video = document.querySelector("#video");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.log("Something went wrong: " + error.toString());
            });
    }
}

function colorTracking(red, green, blue) {
    tracking.ColorTracker.registerColor('custom', function (r, g, b) {
        if ((r > red - 20 && r < red + 20) && (g > green - 20 && g < green + 20) && (b > blue - 20 && b < blue + 20)) {
            return true;
        }
        return false;
    });
    var tracker = new tracking.ColorTracker('custom');
    tracking.track('#video', tracker, { camera: true });
    tracker.on('track', function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function (rect) {
            context.strokeStyle = rect.color;
            console.log(rect.x + (rect.width / 2), rect.y + (rect.height / 2));
            context.strokeRect(rect.x, rect.y, 10, 10);
            context.fillStyle = "#fff";
        });
    });
}
