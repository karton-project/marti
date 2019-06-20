(function () {
    Blockly.Variables.predefinedVars = [];
    Blockly.Variables.addPredefiendVar = function (name) {
        Blockly.Variables.predefinedVars.push(name);
    };

    Blockly.Variables.removePredefiendVar = function (name) {
        var index = array.indexOf(name);
        if (index > -1) {
            Blockly.Variables.predefinedVars.splice(index, 1);
        }
    };

    var old = Blockly.Variables.allVariables;
    Blockly.Variables.allVariables = function (root) {
        var vars = old.call(this, root);
        Blockly.Variables.predefinedVars.forEach(function (x) {
            if (vars.indexOf(x) < 0)
                vars.push(x);
        });
        return vars;
    };
})();


var variablesForBlockly = new Map();

function createCodeVariableForBlockly(varName, varVal) {
    variablesForBlockly.set(varName, varVal);
}

function listVariableKeysAsBlocklyDropdown() {
    var variableKeys = Array.from(variablesForBlockly.keys());
    var out = [];
    for (var i = 0; i < variableKeys.length; i++) {
        out.push([variableKeys[i], variableKeys[i]]);
    }
    return out;
}

function getVariableValueByNameFromBlockly(varName) {
    return variablesForBlockly.get(varName);
}

Blockly.Blocks['play_sound'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.PLAY)
            .appendField(new Blockly.FieldDropdown([["C4", "js/blockly/sounds/c4.m4a"],
                ["D4", "js/blockly/sounds/d4.m4a"],
                ["E4", "js/blockly/sounds/e4.m4a"],
                ["F4", "js/blockly/sounds/f4.m4a"],
                ["G4", "js/blockly/sounds/g4.m4a"],
                ["A5", "js/blockly/sounds/a5.m4a"],
                ["B5", "js/blockly/sounds/b5.m4a"],
                ["C5", "js/blockly/sounds/c5.m4a"]]), "sound_value");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.SOUND_HUE);
        this.setTooltip(Blockly.Msg.PLAY_TOOLTIP);
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['play_sound'] = function (block) {
    var value = '\'' + block.getFieldValue('sound_value') + '\'';
    return 'MusicMaker.queueSound(' + value + ');\n';
};

Blockly.Blocks['filter'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("filter from")
            .appendField(new Blockly.FieldVariable("data"), "data")
            .appendField("with function:")
            .appendField(new Blockly.FieldTextInput("value"), "key_value")
            .appendField(new Blockly.FieldDropdown([["greater", ">"], ["equal", "="], ["less", "<"]]), "comparison_func")
            .appendField(new Blockly.FieldTextInput("value"), "comparison_value");
        this.setOutput(true, null);
        this.setColour(Blockly.Msg.MATH_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['filter'] = function (block) {
    var variable_data = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('data'), Blockly.Variables.NAME_TYPE);
    var dropdown_comparison_func = block.getFieldValue('comparison_func');
    var text_comparison_value = block.getFieldValue('comparison_value');
    var text_key_value = block.getFieldValue('key_value');
    // TODO: Assemble JavaScript into code variable.
    var code = 'filter(' + variable_data + ', "' + text_key_value + '", "' + text_comparison_value + '", "' + dropdown_comparison_func + '")';
    // TODO: Change ORDER_ATOMIC to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['mouse_x'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("mouse x");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['mouse_x'] = function (block) {
    return [mouseX, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['open_file_weblink'] = {
    init: function () {
        this.appendStatementInput("NAME")
            .setCheck(null)
            .appendField("open file from")
            .appendField(new Blockly.FieldTextInput("web link"), "link");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.FILE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['open_file_weblink'] = function (block) {
    var text_link = block.getFieldValue('link');
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = 'changeViewForFile();\n' +
        'd3.csv("' + 'http://insight.dev.schoolwires.com/HelpAssets/C2Assets/C2Files/C2ImportGroupsSample.csv' + '").then(function(data) {\n' +
        'fileData = data;\n' +
        'defineVariablesFromDataForBlockly();\n' +
        statements_name +
        '});\n';
    return code;
};

Blockly.Blocks['create_table'] = {
    init: function() {
        this.appendStatementInput("createtable")
            .setCheck(null)
            .appendField("Create Table");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['print_table'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("print table");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.FILE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['create_table'] = function(block) {
    var statements_createtable = Blockly.JavaScript.statementToCode(block, 'createtable');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
};

Blockly.Blocks['create_table_row'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("New Table Row:")
            .appendField(new Blockly.FieldTextInput("element1, element2, ..."), "elements");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['create_table_row'] = function(block) {
    var text_elements = block.getFieldValue('elements');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
};

Blockly.JavaScript['print_table'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'drawTable(data);\n';
    return code;
};

Blockly.Blocks['start_camera'] = {
    init: function () {
        this.appendStatementInput("NAME")
            .setCheck(null)
            .appendField("start camera");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.CAMERA_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['start_camera'] = function (block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = 'changeViewForCamera();\n';
    return code;
};

Blockly.Blocks['open_map'] = {
    init: function () {
        this.appendStatementInput("NAME")
            .setCheck(null)
            .appendField("open map");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.MAP_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['open_map'] = function (block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = 'changeViewForMap();\n' + statements_name;
    return code;
};

Blockly.Blocks['add_marker'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("add marker to map with list");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.MAP_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['add_marker'] = function (block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'addMarkerArray(' + value_name + ');\n';
    return code;
};

Blockly.Blocks['open_file_from_computer'] = {
    init: function () {
        this.appendStatementInput("open_file")
            .setCheck(null)
            .appendField("open file from computer");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.FILE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['open_file_from_computer'] = function (block) {
    var statements_open_file = Blockly.JavaScript.statementToCode(block, 'open_file');
    // TODO: Assemble JavaScript into code variable.
    var code =
        '$(\'#csvFile\').trigger(\'click\');' +
        'changeViewForFile();\n' +
        'd3.select("#csvFile").on("change", function () {\n' +
        '    var file = d3.event.target.files[0];\n' +
        '    if (file) {\n' +
        '        var reader = new FileReader();\n' +
        '        reader.onloadend = function (evt) {\n' +
        '            var dataUrl = evt.target.result;\n' +
        '            readCSVFile(dataUrl, function (data) {\n' +
        '                fileData = data;\n' +
        statements_open_file +
        '          });\n' +
        '        };\n' +
        '        reader.readAsDataURL(file);\n' +
        '    }' +
        '});';
    return code;
};

Blockly.Blocks['map'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("map")
            .appendField(new Blockly.FieldTextInput("data"), "data")
            .appendField("to")
            .appendField(new Blockly.FieldTextInput("field"), "field");
        this.setOutput(true, null);
        this.setColour(Blockly.Msg.MATH_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['map'] = function (block) {
    var text_data = block.getFieldValue('data');
    var text_field = block.getFieldValue('field');
    // TODO: Assemble JavaScript into code variable.
    var code = 'mapData(' + text_data + ', ' + text_field + ')';
    // TODO: Change ORDER_ATOMIC to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['maximum'] = {
    init: function () {
        this.appendValueInput("max_value")
            .setCheck(null)
            .appendField("find maximum of");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(Blockly.Msg.MATH_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['maximum'] = function (block) {
    var value_max_value = Blockly.JavaScript.valueToCode(block, 'max_value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'max(' + value_max_value + ')';
    // TODO: Change ORDER_ATOMIC to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['minimum'] = {
    init: function () {
        this.appendValueInput("min_value")
            .setCheck(null)
            .appendField("find minimum of");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(Blockly.Msg.MATH_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['minimum'] = function (block) {
    var value_min_value = Blockly.JavaScript.valueToCode(block, 'min_value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'min(' + value_min_value + ')';
    // TODO: Change ORDER_ATOMIC to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['average'] = {
    init: function () {
        this.appendValueInput("mean_value")
            .setCheck(null)
            .appendField("find mean of");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(Blockly.Msg.MATH_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['average'] = function (block) {
    var value_mean = Blockly.JavaScript.valueToCode(block, 'mean_value', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'mean(' + value_mean + ')';
    // TODO: Change ORDER_ATOMIC to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['list_key_elements'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("save list of headers to")
            .appendField(new Blockly.FieldVariable("item"), "NAME");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Msg.FILE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['list_key_elements'] = function (block) {
    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble JavaScript into code variable.
    var code = 'var ' + variable_name + ' = listKeyElements(data);\n';
    return code;
};

Blockly.Blocks['get_column'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get column from")
            .appendField(new Blockly.FieldVariable("data"), "data")
            .appendField("with name")
            .appendField(new Blockly.FieldTextInput("default"), "NAME");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(Blockly.Msg.FILE_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['get_column'] = function (block) {
    var variable_data = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('data'), Blockly.Variables.NAME_TYPE);
    var text_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = 'mapData(' + variable_data + ', "' + text_name + '")';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Variables.addPredefiendVar("newMap");