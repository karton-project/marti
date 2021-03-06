// Sources
const _file = "file";
const _general = "math";
const _map = "map";
const _media = "media";
const _visual = "visualization";
const _microbit = "microbit";

// Color
const _general_color = "#ef6c00";
const _visual_color = "#c62828";
const _file_color = "#1f635b";
const _map_color = "#558b2f";
const _picture_color = "#283593";
const _microbit_color = "#0277bd";

// Blocks for CSV
const _opencsvfromcomputer = "opencsvfromcomputer";
const _opencsvfromlink = "opencsvfromlink";
const _openjsonfromcomputer = "openjsonfromcomputer";
const _openjsonfromlink = "openjsonfromlink";
const _listheaders = "listheaders";
const _printtable = "printtable";
const _histogram = "histogram";
const _drawchart = "drawchart";
const _drawchartwithvariable = "chartwvar";

// Blocks for Generral
const _average = "average";
const _averagepic = "greypic";
const _addgeojson = "addgeojson";
const _addmarker = "addmarker";
const _applyfunc = "applyfunc";
const _applythreshold = "threshold";
const _findpeaks = "findpeaks";
const _trackcolor = "trackcolor";
const _filter = "filter";
const _findposition = "findposition";
const _pointerevent = "pointerevent";
const _variable = "variable";
const _threshold = "threshold";
const _selectcolumn = "selectcolumn";
const _scale = "scale";
const _uniquevals = "uniquevalues";
const _max = "maximum";
const _min = "minimum";
const _sum = "sum";
const _selectMapBackground = "selectmapbackground";
const _startwebcam = "startwebcam";
const _opengeojson = "opengeojson";
const _newfunction = "newfunction";
const _count = "count";
const _filtertable = "filtable";

const _toner = "toner";
const _terrain = "terrain";
const _watercolor = "watercolor";

const _connectdevice = "mconndevice";
const _recorddatawithtime = "mrecordtime";
const _recorddatawithclick = "mrecordclick";
const _gettemperature = "mtemp";

// Blocks For Picture
const _openpicture = "openpicture";

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
blockMap.set(_drawchart, _visual);
blockMap.set(_drawchartwithvariable, _visual);
blockMap.set(_histogram, _visual);
// file
blockMap.set(_printtable, _file);
blockMap.set(_opencsvfromcomputer, _file);
blockMap.set(_opencsvfromlink, _file);
blockMap.set(_openjsonfromcomputer, _file);
blockMap.set(_openjsonfromlink, _file);
blockMap.set(_selectcolumn, _file);
blockMap.set(_filtertable, _file);
blockMap.set(_listheaders, _file);
// microbit
blockMap.set(_connectdevice, _microbit);
blockMap.set(_gettemperature, _microbit);
// map
blockMap.set(_opengeojson, _map);
blockMap.set(_addgeojson, _map);
blockMap.set(_findposition, _map);
blockMap.set(_addmarker, _map);
blockMap.set(_selectMapBackground, _map);
// picture
blockMap.set(_openpicture, _media);
blockMap.set(_averagepic, _media);
blockMap.set(_applythreshold, _media);
blockMap.set(_pointerevent, _media);
