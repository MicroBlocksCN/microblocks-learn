# Sounds - micro:bit

Connect the micro:bit to MicroBlocks and add the Tone library.

![](greenCircle.jpg =60x*) ![](tone-library.png =150x*)

Problems? See [Get Started](https://microblocks.fun/get-started).

Connect a piezo speaker or headphones to pin 0 using alligator clips or an extension board.

<img src="connect-piezo-1.jpg" width="150"> <img src="connect-piezo-2.jpg" width="192">

Click the *play note* block to play a note. Experiment with the note, octave, and duration to make different notes.

![script](https://microblocks.fun/render?json=%7B%22libs%22:%20%5B%22Tone%22%5D%2C%20%22locale%22:%20%22English%22%2C%20%22scale%22:%201%2C%20%22script%22:%20%22script%2010%2010%20%7B%27play%20tone%27%20%27C%27%200%20500;%7D%22%7D)

Put *play note* blocks together to make tunes.

![script](https://microblocks.fun/render?json=%7B%22libs%22:%20%5B%22Tone%22%5D%2C%20%22locale%22:%20%22English%22%2C%20%22scale%22:%201%2C%20%22script%22:%20%22script%2010%2010%20%7B%27play%20tone%27%20%27C%27%200%20500;%20%27play%20tone%27%20%27D%27%200%20500;%20%27play%20tone%27%20%27E%27%200%20500;%20%27play%20tone%27%20%27C%27%200%20500;%7D%22%7D)

Select open and choose the music folder to see more examples of songs!

<img src="file-button.png" width="60"> <img src="file-menu.png" width="60">

Using a variable for note durations lets you change the speed.  Click on the variables category to create a new variable.

<img src="variables.png" width="120"> <img src="variables-button.png" width="120"> <img src="variable-name.png" width="200">

Now you can customize the length of the note easily in the play note block. Use the repeat block for parts of the song that repeat. 

![script](https://microblocks.fun/render?json=%7B%22libs%22:%20%5B%22Tone%22%5D%2C%20%22locale%22:%20%22English%22%2C%20%22scale%22:%201.0%2C%20%22script%22:%20%22script%2010%2010%20%7B%20whenStarted;%20beat%20=%20200;%20repeat%202%20%7B%20%27play%20tone%27%20%27C%27%201%20beat;%20%27play%20tone%27%20%27D%27%201%20beat;%20%27play%20tone%27%20%27E%27%201%20beat;%20%27play%20tone%27%20%27C%27%201%20beat;%7D;%20repeat%202%20%7B%20%27play%20tone%27%20%27E%27%201%20beat;%20%27play%20tone%27%20%27F%27%201%20beat;%20%27play%20tone%27%20%27G%27%201%20%282%20%2A%20beat%29;%7D;%7D%20%22%7D)

What happens when you change the beat from 200 to 50?

![script](https://microblocks.fun/render?json=%7B%22libs%22:%20%5B%22Tone%22%5D%2C%20%22locale%22:%20%22English%22%2C%20%22scale%22:%201.0%2C%20%22script%22:%20%22script%2010%2010%20%7B%20beat%20=%2050;%7D%20%22%7D)

Want to make a sound effect? Try this!

![script](https://microblocks.fun/render?json=%7B%22libs%22:%20%5B%22Tone%22%5D%2C%20%22locale%22:%20%22English%22%2C%20%22scale%22:%201.0%2C%20%22script%22:%20%22script%2010%2010%20%7B%20for%20i%2050%20%7B%20playMIDIKey%20%28i%20+%2050%29%203;%7D;%7D%20%22%7D)
