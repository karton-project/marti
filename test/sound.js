var wave = new Pz.Sound();

function createSineWaveSoundWithPeriod(per) {
    var sineWave = new Pizzicato.Sound({
        source: 'wave',
        options: {
            frequency: 1 / per
        }
    });
    wave = sineWave;
}


function createSineWaveSoundWithFrequency(freq) {
    var sineWave = new Pizzicato.Sound({
        source: 'wave',
        options: {
            frequency: freq
        }
    });
    wave = sineWave;
}

function playSound() {
    wave.play();
}

function stopSound() {
    wave.stop();
}