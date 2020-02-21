let net;
let webcamElement;
let trainedClasses = [];
const classifier = knnClassifier.create();
var selectedOperation;

async function setupWebcam() {
    webcamElement = document.getElementById('cardClassifierCam');
    return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true},
                stream => {
                    webcamElement.srcObject = stream;
                    webcamElement.addEventListener('loadeddata', () => resolve(), false);
                },
                error => reject());
        } else {
            reject();
        }
    });
}


async function startClassifier() {
    console.log('Loading mobilenet..');

    // Load the model.
    net = await mobilenet.load();
    //mynet = await tf.loadLayersModel('localstorage://mymodel');
    console.log('Sucessfully loaded model');

    await setupWebcam();

    // Reads an image from the webcam and associates it with a specific class
    // index.
    const addExample = classId => {
        // Get the intermediate activation of MobileNet 'conv_preds' and pass that
        // to the KNN classifier.
        const activation = net.infer(webcamElement, 'conv_preds');
        // Pass the intermediate activation to the classifier.
        classifier.addExample(activation, classId);
    };

    // When clicking a button, add an example for that class.
    document.getElementById('learn').addEventListener('click', () => {
        let index = classes.indexOf(selectedOperation);
        buttonColor[index] = (buttonColor[index] > 100) ? 100 : buttonColor[index] += 5;
        $('#'+selectedOperation).css('background-color','hsl(145,' + buttonColor[index]  + '%, 50%)');
        addExample(index);
        if(trainedClasses.indexOf(selectedOperation) < 0){
            trainedClasses.push(selectedOperation);
        }
    });

    document.getElementById('label').addEventListener('click', () => getClassLabel());

    window.addEventListener("beforeunload", function (e) {
        model.save('localstorage://mymodel');
    }, false);

}

async function getClassLabel() {
    if (classifier.getNumClasses() > 0) {
        // Get the activation from mobilenet from the webcam.
        const activation = net.infer(webcamElement, 'conv_preds');
        // Get the most likely class and confidences from the classifier module.
        const result = await classifier.predictClass(activation);

        appendBlockToCodingHolder(classes[result.classIndex],function(){
            openBlockDetails(classes[result.classIndex]);
        });
    }

    await tf.nextFrame();
}
