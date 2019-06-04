// Sources
const _camera = "camera";
const _csv = "csv";
const _file = "file";
const _general = "general";
const _json = "json";
const _map = "map";
const _microphone = "microphone";
const _picture = "picture";
const _sound = "sound";
const _visual = "visualization";
const _microbit = "microbit";

// Color
const _visual_color = "#c62828";
const _camera_color = "#ad1457";
const _file_color = "#1f635b";
const _general_color = "#ef6c00";
const _map_color = "#558b2f";
const _microbit_color = "#0277bd";
const _microphone_color = "#6a1b9a";
const _picture_color = "#283593";

// Blocks for CSV
const _opencsvfromcomputer = "opencsvfromcomputer";
const _opencsvfromlink = "opencsvfromlink";
const _openjsonfromcomputer = "openjsonfromcomputer";
const _openjsonfromlink = "openjsonfromlink";
const _listheaders = "listheaders";
const _printtable = "printtable";
const _linechart = "line";
const _piechart = "pie";
const _barchart = "bar";
const _histogram = "histogram";

// Blocks for Generral
const _average = "average";
const _averagepic = "greypic";
const _addgeojson = "addgeojson";
const _addmarker = "addmarker";
const _applyfunc = "applyfunc";
const _applythreshold = "threshold";
const _findpeaks = "findpeaks";
const _trackcolor = "trackcolor";
const _colorpicker = "colorpicker";
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
const _printTable = "printtable";
const _opengeojson = "opengeojson";
const _newdatatype = "newdatatype";

const _toner = "toner";
const _terrain = "terrain";
const _watercolor = "watercolor";

const _connectdevice = "mconndevice";
const _recorddatawithtime = "mrecordtime";
const _recorddatawithclick = "mrecordclick";
const _gettemperature = "mtemp";

// Comparison Operations
const _greater = "greater than";
const _less = "less than";
const _equal = "equal to";
const _lesseq = "less than or equal to";
const _greateq = "greater than or eqaul to";

// Blocks For Picture
const _openpicture = "openpicture";

let classes = [];
let buttonColor = [];

let blockMap = new Map();

// general
blockMap.set(_newdatatype, _general);
blockMap.set(_variable, _general);
blockMap.set(_average, _general);
blockMap.set(_max, _general);
blockMap.set(_min, _general);
blockMap.set(_sum, _general);
blockMap.set(_applyfunc, _general);
blockMap.set(_filter, _general);
blockMap.set(_findpeaks, _general);
blockMap.set(_uniquevals, _general);
blockMap.set(_scale, _general);
// visual
blockMap.set(_printtable, _visual);
blockMap.set(_piechart, _visual);
blockMap.set(_linechart, _visual);
blockMap.set(_barchart, _visual);
blockMap.set(_histogram, _visual);
// file
blockMap.set(_opencsvfromcomputer, _file);
blockMap.set(_opencsvfromlink, _file);
blockMap.set(_openjsonfromcomputer, _file);
blockMap.set(_openjsonfromlink, _file);
blockMap.set(_selectcolumn, _file);
blockMap.set(_listheaders, _file);
// microbit
blockMap.set(_connectdevice, _microbit);
blockMap.set(_gettemperature, _microbit);
// camera
blockMap.set(_startwebcam, _camera);
blockMap.set(_trackcolor, _camera);
// map
blockMap.set(_opengeojson, _map);
blockMap.set(_addgeojson, _map);
blockMap.set(_findposition, _map);
blockMap.set(_addmarker, _map);
blockMap.set(_selectMapBackground, _map);
// picture
blockMap.set(_openpicture, _picture);
blockMap.set(_averagepic, _picture);
blockMap.set(_applythreshold, _picture);
blockMap.set(_pointerevent, _picture);

let isTangibleInterface = false;
let isCodingScreen = false;