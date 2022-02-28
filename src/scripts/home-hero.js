function homeHero () {

    
    const letters = [
        L = document.querySelector('svg #letter-l'),
        E = document.querySelector('svg #letter-e'),
        A = document.querySelector('svg #letter-a'),
        R = document.querySelector('svg #letter-r'),
        N = document.querySelector('svg #letter-n')
    ]

    const data = {
        L: {
            text: document.querySelector('.c_hero-home__text-l'),
            bubble: document.querySelector('.c_hero-home__bubble-l'),
            url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
        },
        E: {
            text: document.querySelector('.c_hero-home__text-e'),
            bubble: document.querySelector('.c_hero-home__bubble-e'),
            url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
        },
        A: {
            text: document.querySelector('.c_hero-home__text-a'),
            bubble: document.querySelector('.c_hero-home__bubble-a'),
            url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
        },
        R: {
            text: document.querySelector('.c_hero-home__text-r'),
            bubble: document.querySelector('.c_hero-home__bubble-r'),
            url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
        },
        N: {
            text: document.querySelector('.c_hero-home__text-n'),
            bubble: document.querySelector('.c_hero-home__bubble-n'),
            url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
        }
    }

    // console.log(data);
    // console.log(data.A);
    // console.log(data.A.letter);

    // Object.entries(data).forEach( ([key, value]) => {
    //     let letter = value.letter;
    //     let text = value.text;
    //     let url = value.url;
    //     // console.log(letter);
    //     // console.log(text);
    //     // console.log(url);
        
    //     // letter.addEventListener('mouseover', function(event) {
    //     //     let localLetter = letter;
    //     //     // console.log(localLetter);
    //     //     letterAction(event, localLetter);
    //     // });
    //     // letter.addEventListener('mouseout', letterReset);

    // });


    // console.log(letters);

    letters.forEach( (letter) => {
        let letterName = letter.dataset.letter;
        
        // console.log(letter);
        letter.addEventListener('mouseover', function(e) {
            letterAction(e);
        });

        letter.addEventListener('click', function(e) {
            let letterURL = data[letterName].url;
            console.log(letterURL);
        });

        letter.addEventListener('mouseout', function(e) {
            letterReset(e);
        });
    });


    function letterAction(event) {
        let theLetter = event.target;
        let letterName = theLetter.dataset.letter;
        let letterBubble = data[letterName].bubble;
        let letterText = data[letterName].text;

        letterBubble.style.display = 'block';
        letterText.style.display = 'block';
        
        letters.forEach( (letter) => {
            if (letter != theLetter) {
                // console.log(letter);
                letter.style.opacity = '0.1';
            }
        });
    }


    function letterReset(event) {
        let theLetter = event.target;
        let letterName = theLetter.dataset.letter;
        let letterBubble = data[letterName].bubble;
        let letterText = data[letterName].text;

        letters.forEach( (letter) => {
            letter.style.opacity = '1';
        });

        letterBubble.style.display = 'none';
        letterText.style.display = 'none';
    }
};
