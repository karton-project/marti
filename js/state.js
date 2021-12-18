
var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
        if( arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value ) ){
            arr.splice(i,1);
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

function readTextFile(fileURL, callback) {
    d3.text(fileURL).then(function (data) {
        callback(data);
    });
}

function loadTextFile(file){
    $('#stateFile').trigger('click');
    d3.select("#stateFile").on("change", function () {
        var file = d3.event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                var dataUrl = evt.target.result;
                readTextFile(dataUrl, function (data) {
                    document.getElementById("right-copy-1tomany").innerHTML = data;
                });
            };
            reader.readAsDataURL(file);
        }
    });
}

function downloadStateJSON(){
    download(JSON.stringify(state), 'state.marti', 'text/plain');
}


function downloadStateHTML(){
    download(document.getElementById("right-copy-1tomany").innerHTML, 'state.marti', 'text/plain');

}

let State = class {
    constructor() {
        this.programList = [];
        this.output = "";
    }

    addBlock(block) {
        this.programList.push(block);
    }

    removeBlock(block) {
        removeByAttr(this.programList, 'id', block.id);
    }
};

let Block = class {
    name = "";
    input = [];

    constructor(name, input) {
        this.id = new Date().valueOf();
        this.name = name;
        this.input = input;
    }
};

var state = new State();







