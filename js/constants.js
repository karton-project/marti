// Sources
const _file = "file";
const _general = "math";
const _map = "map";
const _media = "media";
const _visual = "visualization";

// Color
const _general_color = "#ef6c00";
const _visual_color = "#c62828";
const _file_color = "#1f635b";
const _map_color = "#558b2f";
const _picture_color = "#283593";

// Blocks for CSV
const _opencsvfromcomputer = "opencsvfromcomputer";
const _opencsvfromlink = "opencsvfromlink";
const _openjsonfromcomputer = "openjsonfromcomputer";
const _openjsonfromlink = "openjsonfromlink";
const _listheaders = "listheaders";
const _printtable = "printtable";

// Blocks for Vis
const _drawlinechart = "chartline";
const _drawpiechart = "chartpie";
const _drawbarchart = "chartbar";


// Blocks for Data (Mobile)
const _dataforest = "dataforest";
const _datafootball = "datafootball";
const _databike = "databike";
const _dataplastic = "dataplastic";
const _dataresearch = "dataresearch";

// Blocks for General
const _average = "average";
const _applyfunc = "applyfunc";
const _findpeaks = "findpeaks";
const _filter = "filter";
const _variable = "variable";
const _selectcolumn = "selectcolumn";
const _scale = "scale";
const _uniquevals = "uniquevalues";
const _max = "maximum";
const _min = "minimum";
const _sum = "sum";
const _newfunction = "newfunction";
const _count = "count";
const _filtertable = "filtable";

// Blocks For Map
const _addgeojson = "addgeojson";
const _addmarker = "addmarker";
const _toner = "toner";
const _terrain = "terrain";
const _watercolor = "watercolor";
const _findposition = "findposition";
const _opengeojson = "opengeojson";

// Blocks For Picture
const _averagepic = "greypic";
const _openpicture = "openpicture";
const _trackcolor = "trackcolor";
const _pointerevent = "pointerevent";
const _applythreshold = "threshold";
const _binarythreshold = "bthres";

let classes = [];
let buttonColor = [];

let blockMap = new Map();

// general
blockMap.set(_variable, _general);
blockMap.set(_average, _general);
blockMap.set(_count, _general);
blockMap.set(_max, _general);
blockMap.set(_min, _general);
blockMap.set(_sum, _general);
blockMap.set(_newfunction, _general);
blockMap.set(_applyfunc, _general);
blockMap.set(_filter, _general);
blockMap.set(_findpeaks, _general);
blockMap.set(_uniquevals, _general);
blockMap.set(_scale, _general);

// visual
blockMap.set(_drawbarchart, _visual);
blockMap.set(_drawlinechart, _visual);
blockMap.set(_drawpiechart, _visual);

// file
blockMap.set(_printtable, _file);
blockMap.set(_opencsvfromcomputer, _file);
blockMap.set(_opencsvfromlink, _file);
blockMap.set(_openjsonfromcomputer, _file);
blockMap.set(_openjsonfromlink, _file);
blockMap.set(_selectcolumn, _file);
blockMap.set(_filtertable, _file);
blockMap.set(_listheaders, _file);

// map
blockMap.set(_opengeojson, _map);
blockMap.set(_addgeojson, _map);
blockMap.set(_findposition, _map);
blockMap.set(_addmarker, _map);

// picture
blockMap.set(_openpicture, _media);
blockMap.set(_averagepic, _media);
blockMap.set(_applythreshold, _media);
blockMap.set(_binarythreshold, _media);
blockMap.set(_pointerevent, _media);
