var failedTest = 0, passedTest = 0;
var fruits = ["Apple", "Banana", "Orange"];
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var cnt = 0;
var cityData = [
    { "city": "seattle", "state": "WA", "population": 652405, "land_area": 83.9 },
    { "city": "new york", "state": "NY", "population": 8405837, "land_area": 302.6 },
    { "city": "boston", "state": "MA", "population": 645966, "land_area": 48.3 },
    { "city": "kansas city", "state": "MO", "population": 467007, "land_area": 315 }
];

function unittest(tag, val1, val2) {
    if (val1 === val2) {
        passedTest++;
        return true;
    } else if (_.isEqual(val1, val2)) {
        passedTest++;
        return true;
    } else {
        failedTest++;
        console.log(tag + " is failed. " + val1 + " is not equal to " + val2);
        return false;
    }
}

function testCompare() {
    var TAG = "test compare: ";
    unittest(TAG, compare(max(cityData, "population"), max(numbers), '>='), true);
    unittest(TAG, compare(max(cityData, "population"), max(numbers), '<='), false);
    unittest(TAG, compare(max(cityData, "population"), max(numbers), '='), false);
}

function testEqualSlice() {
    var TAG = "test equal slice: "
    unittest(TAG, equalSlice(fruits, 1), [["Apple", "Banana", "Orange"]]);
    unittest(TAG, equalSlice(fruits, 2), [["Apple"], ["Banana", "Orange"]]);
    unittest(TAG, equalSlice(fruits, 3), [["Apple"], ["Banana"], ["Orange"]]);

    unittest(TAG, equalSlice(numbers, 1), [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]);
    unittest(TAG, equalSlice(numbers, 2), [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]);
    unittest(TAG, equalSlice(numbers, 3), [[1, 2, 3], [4, 5, 6], [7, 8, 9, 10]]);
}

function testMap() {
    var TAG = "test map: "
    unittest(TAG, map(numbers, function (x) {
        return x < 5.5 ? 0 : 1;
    }), [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]);
}

function testFindPeaks() {
    var TAG = "test find peaks: ";
    readJSONFile("../media/signal.json", function (jsonData) {
        console.log(TAG + findLocalPeaks(jsonData.signal));
    });
}

function testMax() {
    var TAG = "test max: "
    unittest(TAG, max(cityData, "city"), "seattle");
    unittest(TAG, max(cityData, 8405837));
    unittest(TAG, max(fruits), "Orange");
    unittest(TAG, max(numbers), 10);
}

function testMin() {
    var TAG = "test min: "
    unittest(TAG, min(cityData, "city"), "boston");
    unittest(TAG, min(cityData, "population"), 467007);
    unittest(TAG, min(fruits), "Apple");
    unittest(TAG, min(numbers), 1);
}

function testReadCSVFile() {
    var TAG = "test csv file operations: ";
    readCSVFile("../media/toy.csv", function (data) {
        unittest(TAG, getColumnHeaders(data), ["Country", "Code", "Social Progress Index", "Basic Human Needs", "Foundations of Wellbeing", "Opportunity"]);
    });
}

function testReadJSONFile() {
    var TAG = "test json file operations: ";
    readJSONFile("./operations.json", function (jsondata) {
        console.log(d3.keys(jsondata));
    });
}

function testScale() {
    var TAG = "test scale:";
    //unittest(TAG, min(numbers, [0, 1]));
}

function testSplit() {
    var TAG = "test split larger:";
    unittest(TAG, splitNumericLarger(numbers, 5), [5, 6, 7, 8, 9, 10]);
    TAG = "test split less:";
    unittest(TAG, splitNumericLess(numbers, 5), [1, 2, 3, 4, 5]);
    TAG = "test split interval:";
    unittest(TAG, splitInterval(numbers, 2, 4), [3, 4]);
}


function test() {
    testCompare();
    testEqualSlice();
    //testFindPeaks();
    testMap();
    testMax();
    testMin();
    testReadCSVFile();
    testReadJSONFile();
    testScale();
    testSplit();
}

function generateGraph() {
    generateRangeSlider(numbers);
}


function generateSound() {
    createSineWaveSoundWithFrequency(440);
    document.getElementById("sinewave440").onclick = function () {
        if (cnt % 2 == 0) {
            stopSound();
        } else {
            playSound();
        }
        cnt++;
    }
}

function init() {
    try {
        test();
        generateGraph();
        generateSound();
    } catch (e) {
        console.error(e);
    } finally {
        console.log("Passed test: " + passedTest + ", Failed test: " + failedTest);
    }
}