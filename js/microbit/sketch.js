var microBit;
var selectedTempRecordingOpt;
var temperature, buttonA, buttonB, accX, accY, accZ, bearing;
var temperatureArr = [];

var iconLeft = [
    ['0', '0', '0', '0', '0'],
    ['0', '1', '0', '1', '0'],
    ['0', '0', '0', '0', '0'],
    ['1', '0', '0', '0', '1'],
    ['0', '1', '1', '1', '0']
];

var iconRight = [
    ['0', '0', '0', '0', '0'],
    ['0', '1', '0', '1', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '1', '1', '1', '0'],
    ['1', '0', '0', '0', '1']
];

microBit = new uBit();

microBit.onConnect(function () {
    appendOutputText("connected", "connectDevice", "true");
    microBit.setButtonACallback(function () {
        console.log("buttonA pressed");
    });
});

microBit.onDisconnect(function () {
    appendOutputText("disconnected", "connectDevice", "true");
});

microBit.onBleNotify(function () {
    buttonA = microBit.getButtonA();
    buttonB = microBit.getButtonB();

    accX = microBit.getAccelerometer().x;
    accY = microBit.getAccelerometer().y;
    accZ = microBit.getAccelerometer().z;

    temperature = microBit.getTemperature();
    bearing = microBit.getBearing();
});

var ledMatrix = [
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
];

function updatePixel(x, y, value) {
    if (value) {
        ledMatrix[x][y] = 1;
    } else {
        ledMatrix[x][y] = 0;
    }
    microBit.writeMatrixIcon(ledMatrix);
}

function updateText() {
    text = document.getElementById("newText").value;
    console.log(text);
    microBit.writeMatrixText(text);
}

function searchDevice() {
    microBit.searchDevice();
}

function startTemperatureRecording() {
    if (_.isEqual(selectedTempRecordingOpt, _buttonTempRecordinA)) {
        console.log("Tate");
        microBit.setButtonACallback(function () {
            console.log("Hello3");
        });
    }
    if (_.isEqual(selectedTempRecordingOpt, _timeInterval3)){
        setInterval(function (){
            console.log(temperature);
            temperatureArr.push(temperature);
            createCodeVariable("temperature", temperatureArr);
        },  3000);
    }
    if (_.isEqual(selectedTempRecordingOpt, _timeInterval5)){
        setInterval(function (){
            console.log(temperature);
            temperatureArr.push(temperature);
            createCodeVariable("temperature", temperatureArr);
        },  5000);
    }
    if (_.isEqual(selectedTempRecordingOpt, _timeInterval10)){
        setInterval(function (){
            console.log(temperature);
            temperatureArr.push(temperature);
            createCodeVariable("temperature", temperatureArr);
        },  10000);
    }
    if (_.isEqual(selectedTempRecordingOpt, _timeInterval60)){
        setInterval(function (){
            console.log(temperature);
            temperatureArr.push(temperature);
            createCodeVariable("temperature", temperatureArr);
        },  60000);
    }
}
