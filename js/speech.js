function startSpeech() {
    if (annyang) {

        var hello = function () {
            console.log('Hello');
            scrollTo("#outputText");
        };

        var commands = {
            'merhaba': function () {
                console.log('Merhaba');
            },
            'nasılsın': hello
        };

        annyang.addCommands(commands);
        annyang.setLanguage('tr');
        annyang.start();
    } else {
        console.log('Speech recognition is not supported.');
    }
}

function scrollTo(identifier, speed) {
    $('html, body').animate({
        scrollTop: $(identifier).offset().top
    }, speed || 1000);
}
