function homeHero () {
    console.log('yay at home');

    const elements = [
        letterL = document.querySelector('svg #letter-l'),
        letterE = document.querySelector('svg #letter-e'),
        letterA = document.querySelector('svg #letter-a'),
        letterR = document.querySelector('svg #letter-r'),
        letterN = document.querySelector('svg #letter-n'),
        microblocks = document.querySelector('svg #microblocks')
    ]

    console.log(elements);

    elements.forEach( (element) => {
        console.log(element);
        element.addEventListener('click', letterAction(element));
    });



    function letterAction(letter) {
        console.log('accessing letterAction from: ' + letter);

        elements.forEach( (element) => {
            if (!element==letter) {
                element.style.opacity = '0.1';
            }
        });
    }
    
    
    // const letterL = document.querySelector('svg #letter-l');
    // const letterE = document.querySelector('svg #letter-e');
    // const letterA = document.querySelector('svg #letter-a');
    // const letterR = document.querySelector('svg #letter-r');
    // const letterN = document.querySelector('svg #letter-n');
    // const microblocks = document.querySelector('svg #microblocks');


    // console.log(letterN);
    // letterN.style.opacity = '0.1';

    // document.addEventListener('mouseover', hoverLetters);

    // function hoverLetters(e) {
    //     console.log(e);
    //     let letter = e.target.id;
    //     console.log(letter);
    // }
};
