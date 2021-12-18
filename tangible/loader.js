const URL = "https://raw.githubusercontent.com/karton-project/marti/master/tangible/tfjs_model/";

let model, webcam, labelContainer, prediction;

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

async function getWebcamImage() {
    const img = (await webcam.capture()).toFloat();
    const normalized = img.div(127).sub(1);
    return normalized;
}


async function predict() {
    const img = await getWebcamImage();
    tf.tidy(() => {
        const tensor = img.reshape([1, 224, 224, 3]);
        prediction = model.predict(tensor).dataSync();
        console.log(indexOfMax(prediction))
    });
    img.dispose();
}

(async () => {
    const modelURL = URL + "model.json";
    model = await tf.loadLayersModel(modelURL);
    webcam = await tf.data.webcam(document.getElementById("cardClassifierCam"), {
        resizeWidth: 224,
        resizeHeight: 224,
    });
    setInterval(predict, 200);
})();