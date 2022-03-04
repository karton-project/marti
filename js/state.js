var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {
            arr.splice(i, 1);
        }
    }
    return arr;
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function readJSONFile(fileURL, callback) {
    d3.json(fileURL).then(function (data) {
        callback(data);
    });
}

function loadSateFile() {
    $('#stateFile').trigger('click');
    d3.select("#stateFile").on("change", function () {
        var file = d3.event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                var dataUrl = evt.target.result;
                readJSONFile(dataUrl, function (data) {
                    document.getElementById("right-copy-1tomany").innerHTML = data["blocks"];
                    files = new Map(Object.entries(data["files"]));
                    fileData = data["fileData"];
                    if (fileData.length > 0) {
                        drawTable(fileData);
                    }
                    ;
                    variables = new Map(Object.entries(data["variables"]));
                });
            };
            reader.readAsDataURL(file);
        }
    });
}

function downloadStateFile() {
    state["files"] = Object.fromEntries(files);
    state["fileData"] = fileData;
    state["variables"] = Object.fromEntries(variables);
    state["blocks"] = document.getElementById("right-copy-1tomany").innerHTML;
    download(JSON.stringify(state), 'state.marti', 'text/plain');
}

var state = new Object();







