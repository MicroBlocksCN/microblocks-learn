function homeHero () {

    const letters = [
        letterL = document.querySelector('svg #letter-l'),
        letterE = document.querySelector('svg #letter-e'),
        letterA = document.querySelector('svg #letter-a'),
        letterR = document.querySelector('svg #letter-r'),
        letterN = document.querySelector('svg #letter-n')
    ]

    console.log(letters);

    letters.forEach( (letter) => {
        console.log(letter);
        letter.addEventListener('mouseover', function(e) {
            letterAction(e);
        });
        letter.addEventListener('mouseout', letterReset);
    });


    function letterAction(event) {
        let theLetter = event.target;
        
        letters.forEach( (letter) => {
            if (letter != theLetter) {
                // console.log(letter);
                letter.style.opacity = '0.1';
            }
        });
    }


    function letterReset() {
        letters.forEach( (letter) => {
            letter.style.opacity = '1';
        });
    }
};
