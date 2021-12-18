// Output
_file_out = "file";
_map_out = "map";
_visual_out = "visualization";

// Chart Types
_linechart = "line";
_piechart = "pie";
_barchart = "bar";
_chartTypes = [_linechart, _piechart, _barchart];

_marti_title = "Marti - Data Programming";
page_title_lang = "Playing with Data";
_cat_lang = "Categories";
_blocks_lang = "Blocks";
_output_lang = "Output";
_coding_lang = "Coding";
_var_lang = "Define Variable";
_pointer_event_lang = "Pointer Event";
_average_lang = "Average";
_findpeaks_lang = "Find Peaks";
_max_lang = "Maximum";
_min_lang = "Minimum";
_scale_lang = "Scale";
_applyfunc_lang = "Apply Function";
_trackcolor_lang = "Track Color";
_opencsv_comp_lang = "Open CSV From Computer";
_opencsv_link_lang = "Open CSV with Link";
_open_link_output = "The link is printed onto table.";
_print_table_output = "Given data printed as a table.";
_listheaders_lang = "File Headers";
_listheaders_text_lang = "Get a list of the headers from the file, which returns the first row.";
_filter_lang = "Filter";
_uniquevals_lang = "Unique Values";
_uniquevals_output = 'Unique values are mapped from {0}. The result is ';
_addgeojson_lang = "Add GEOJSON";
_findpos_lang = "Find Position";
_addmarker_lang = "Add Marker";
_threshold_lang = "Range Threshold";
_binary_threshold_lang = "Binary Threshold";
_selectvar_text_lang = "Select a table to perform the operation: ";
_createvar_text_lang = "Create New Variable: ";
_varname_lang = "Name";
_varval_lang = "Value";
_savebutton_lang = "Save";
_selectfile_lang = "Select File";
_applyfunc_text_lang = "Applies a function to all individual data points. Write a function in the form of y = ax + b.";
_function_lang = "Function: ";
_applybutton_lang = "Apply";
_threshold_text_lang = "Select the minimum and maximum slider value to select a portion the data.";
_binary_threshold_text_lang = "Select a slider value to determine luminosity threshold.";
_openpicture_lang = "Open Picture from Computer";
_openpic_comp_lang = "Choose an image from computer. Pictures are data files, which contains color data.";
_averagepic_lang = "Average Color";
_definesound_lang = "Create New Sound";
_playsound_lang = "Play Sound On Click";
_link_input_lang = "If you have an active internet connection, you can download and use CSV files.";
_web_link_lang = "Web Link";
_select_column_lang = "Select Column";
_selectcolumn_text_lang = "Returns the colum with the given name, from a table data.";
_selectfiltervar_text_lang = "Choose the variable that you want to filter: ";
_definecomparisonfunction_lang = "Then, define a comparison function: ";
_select_table = "First select a table";
_create_comparison = "Then, create a comparison function by choosing a column from this table";
_saveas_lang = "Save the result as new variable: ";
_operation_lang = "Operation";
_placeslist_lang = "Places List: ";
_add_lang = "Add";
_choose_option_lang = "";
_click_lang = "Click";
_mousemove_lang = "Mouse Move";
_addgeojson_text_lang = "Adds GEOJSON file, you previosly opened.";
_visual_lang = "Charts";
_file_lang = "File";
_general_lang = "Operators";
_map_lang = "Map";
_media_lang = "Media";
_file_is_selected_lang = " file is selected.";
_piechart_lang = "Pie Chart";
_linechart_lang = "Line Chart";
_print_table_chart_lang = "Print Table";
_select_mapbg_lang = "Select Map Type";
_start_webcam_lang = "Start Camera";
_histogram_lang = "Create Histogram";
_start_webcam_text_lang = "If your device have a camera, it automatically starts the camera. If your device have more than one camera, you can select from the dropdown menu.";
_start_lang = "Start";
_connect_lang = "Connect";
_map_bg_bw_lang = "Black and White";
map_bg_geog_lang = "Geographical";
map_bg_watercolor_lang = "Watercolor";
_issaved_lang = " is saved with value: ";
_issaveddatatype_lang = " data type is saved with properties: ";
_opengeojson_lang = "Open GEOJSON";
_opengeojson_text_lang = "GeoJSON is a format for encoding a variety of geographic data structures.";
_enter_position = "Enter position name";
_findpos_text_lang = "Finds the coordinates of the position and places a marker.";
_sum_lang = "Sum";
_sum_txt_lang = "Returns the cumulative sum of the selected variable values";
_openjsonfromcomputer_lang = "Open JSON File from Computer";
_openjsonfromlink_lang = "Open JSON File with Link";
_addXAxis_text_lang = "Choose the variable to fill X axis";
_addYAxis_text_lang = "Write comma-seperated variable/s to show on the Y axis";
_addYAxis_lang = "Y Axis Variables";
_add_title_text_lang = "Add title to chart: ";
_add_title_lang = "Title Name";
_barchart_lang = "Bar Chart";
_barchart_text_lang = "Bar chart is used to show the difference between variable\'s total amounts.";
_newfunction_lang = "Define New Function";
_newfunction_text_lang = "Define a new function with variable x";
_findpeaks_text_lang = "Choose a variable to find the peak values in data set:";
_count_lang = "Count";
_count_text_lang = "Count the number of occurences for the specified element";
_add_headers_lang = "Header Row";
_add_row_lang = "Row";
_show_button_lang = "Save and Show";
_filtertable_lang = "Filter Table";
_filtertable_detail_lang = "First, select a file";
_filter_Table_output_text = "Filtered table is printed";
_drawchart_lang = "Draw Chart from Table";
_drawchartwithvariable_lang = "Draw Chart with Variables";
_select_chart_type_lang = "Select the type of chart you want to use";
_function_defs = "Function Definitions";
_tuts = "Tutorials and Activities";
_datasets = "Datasets";

// Comparison Operations
_greater = "greater than";
_less = "less than";
_equal = "equal to";
_lesseq = "less than or equal to";
_greateq = "greater than or eqaul to";

_download = "download";
_card_activity_def = "Card Activity";
_ok = "OK";

_datalink_forest_exp = "Open Forest Data"
_datalink_forest = "https://karton-project.github.io/marti/dataset/csv/forest.csv"

document.getElementById("_dataset_link").onclick = function () {
    document.getElementById("_dataset_link").href = "dataset/en.html";
};

document.getElementById("_activity_link").onclick = function () {
    document.getElementById("_activity_link").href = "activity/en.html";
};

document.getElementById("_tutorial_link").onclick = function () {
    document.getElementById("_tutorial_link").href = "tutorials/en/index.html";
};