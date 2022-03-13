//const marti_link = "https://karton-project.github.io/marti/";
const marti_link = "../marti/index.html";

const tr = "tr";
const uk = "uk";
const aus = "aus";
const nor = "nor";
const eu = "eu";
const silicon = "silicon";

let coordinates = [
    [50.85, 4.37], //Brussels (EU)
    [41, 29], //Istanbul
    [60, 11], // Oslo
    [53.4, -3], // Liverpool
    [-33, 150], // Sydney
    [37.42, -122.08] // Googleplex Silicon Valley
];

// Data Source Links
const ist_data_source = "https://data.ibb.gov.tr/dataset/rayli-sistemler-maksimum-yolculuk-sayisi/resource/81fa122e-49c1-4191-aac9-a38becd0c359 ";

// IFrames

const ist_data_view_frame = "<iframe class='frame' src= 'https://data.ibb.gov.tr/dataset/rayli-sistemler-maksimum-yolculuk-sayisi/resource/81fa122e-49c1-4191-aac9-a38becd0c359/view/a63d798f-377a-46b8-9882-525f5e6d751f' frameBorder='0'></iframe>";

const ist_rush_frame_chart = '<iframe' +
    ' src="https://ourworldindata.org/grapher/urban-and-rural-population?country=TUR" style="width: 100%; height:' +
    ' 540px; border: 0px none;"></iframe>';
const ist_rush_frame_quiz = ' <iframe id="JotFormIFrame-201454875667062" title="Urban Demographic"' +
    ' onload="window.parent.scrollTo(0,0)" allowtransparency="true" allowfullscreen="true" allow="geolocation;' +
    ' microphone; camera" src="https://form.jotform.com/201454875667062" frameborder="0" style=" min-width: 100%;' +
    ' height:540px; border:none;" scrolling="no" > </iframe>';


const silicon_rush_frame_chart = '<iframe' +
    ' src="https://ourworldindata.org/grapher/price-changes-in-consumer-goods-and-services-in-the-usa-1997-2017" ' +
    'style="width: 100%; height: 540px; border: 0px none;"></iframe>';
const silicon_rush_frame_quiz = '<iframe id="JotFormIFrame-201453900187047" title="Form"' +
    ' onload="window.parent.scrollTo(0,0)" allowtransparency="true" allowfullscreen="true" allow="geolocation; microphone; camera" ' +
    'src="https://form.jotform.com/201453900187047" frameborder="0" ' +
    'style="width: 100%; height:540px; border:none;" scrolling="no" > </iframe>';
const ist_vocab_frame = '<iframe id="JotFormIFrame-201402082424036" title="Form" ' + 'onload="window.parent.scrollTo(0,0)" allowtransparency="true" allowfullscreen="true" allow="geolocation; microphone; camera" src="https://form.jotform.com/201402082424036" frameborder="0" style=" min-width: 100%; height:539px; border:none;" scrolling="no"> </iframe>';