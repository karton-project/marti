const URL = "https://raw.githubusercontent.com/karton-project/marti/master/tangible/tfjs_model/";

let model, webcam, labelContainer, prediction;

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
        console.log(prediction)
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