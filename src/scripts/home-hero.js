function homeHero () {

    const letters = [
        L = document.querySelector('svg #letter-l'),
        E = document.querySelector('svg #letter-e'),
        A = document.querySelector('svg #letter-a'),
        R = document.querySelector('svg #letter-r'),
        N = document.querySelector('svg #letter-n')
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
