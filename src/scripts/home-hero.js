function homeHero () {

    
    const microblocksText = document.querySelector('svg #MicroBlocks');
    const letters = [
        L = document.querySelector('svg #letter-l'),
        E = document.querySelector('svg #letter-e'),
        A = document.querySelector('svg #letter-a'),
        R = document.querySelector('svg #letter-r'),
        N = document.querySelector('svg #letter-n')
    ]

    const data = {
        L: {
            text: document.querySelector('.c_hero-home__desc--l'),
            bubble: document.querySelector('.c_hero-home__bubble--l'),
            url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
        },
        E: {
            text: document.querySelector('.c_hero-home__desc--e'),
            bubble: document.querySelector('.c_hero-home__bubble--e'),
            url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
        },
        A: {
            text: document.querySelector('.c_hero-home__desc--a'),
            bubble: document.querySelector('.c_hero-home__bubble--a'),
            url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
        },
        R: {
            text: document.querySelector('.c_hero-home__desc--r'),
            bubble: document.querySelector('.c_hero-home__bubble--r'),
            url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
        },
        N: {
            text: document.querySelector('.c_hero-home__desc--n'),
            bubble: document.querySelector('.c_hero-home__bubble--n'),
            url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)"
        }
    }


    // console.log(letters);

    letters.forEach( (letter) => {
        let letterName = letter.dataset.letter;
                
        // console.log(letter);
        letter.addEventListener('mouseover', function(e) {
            letterAction(e);
        });

        letter.addEventListener('click', function(e) {
            let letterURL = data[letterName].url;
            window.open(letterURL, 'tab');

        });

        letter.addEventListener('mouseout', function(e) {
            letterReset(e);
        });
    });


    function letterAction(event) {

        // find the letter
        // target points to the rectangle area,
        // so we go for the parent element
        let theLetter = event.target.parentElement;

        // find the elements
        let letterName = theLetter.dataset.letter;
        let letterBubble = data[letterName].bubble;
        let letterText = data[letterName].text;

        // change states
        letterBubble.classList.add('c_hero-home__bubble--is-visible');
        letterText.classList.add('c_hero-home__desc--is-visible');
        microblocksText.classList.add('c_home-hero__microblocks-text--hidden');
        
        // letter states
        letters.forEach( (letter) => {
            if (letter != theLetter) {
                letter.classList.add('c_home-hero__letter--hidden');
            }
        });
    }


    function letterReset(event) {

        // find the letter
        // target points to the rectangle area,
        // so we go for the parent element
        let theLetter = event.target.parentElement;

        // find the elements
        let letterName = theLetter.dataset.letter;
        let letterBubble = data[letterName].bubble;
        let letterText = data[letterName].text;

        // change states
        letterBubble.classList.remove('c_hero-home__bubble--is-visible');
        letterText.classList.remove('c_hero-home__desc--is-visible');
        microblocksText.classList.remove('c_home-hero__microblocks-text--hidden');

        // letter states
        letters.forEach( (letter) => {
            letter.classList.remove('c_home-hero__letter--hidden');
        });
    }
};
