### Setup

Connect the micro:bit to MicroBlocks and add the Tone library.

![](greenCircle.jpg =60x*) ![](tone-library.png =150x*)

Problems? See [Get Started](https://microblocks.fun/get-started).

### Play a note

Connect a piezo speaker or headphones to pin 0 using alligator clips or an extension board.

![](connect-piezo-1.jpg =150x*) ![](connect-piezo-2.jpg =192x*)

Click the *play note* block to play a note. Experiment with the note, octave, and duration to make different notes.

![script](play-c.png)

Put *play note* blocks together to make tunes.

![script](play-cdec.png)

Select open and choose the music folder to see more examples of songs!

![](file-button.png =60x*) ![](file-menu.png =60x*)

### Use a variable to control speed

Using a variable for note durations lets you change the speed.
Click on the variables category to create a new variable.

![](variables.png =120x*) -> ![](variables-button.png =120x*) -> ![](variable-name.png =200x*)

Add a copy of the **beat** variable to each note block.

![script](use-beat-variable.png)

Now you can change the playback speed by changing the value of beat.
What happens when you set **beat** to 200?

Use the repeat block for parts of a song that repeat.

![script](play-song.png)

### Make a Sound Effect

Want to make a cool sound effect? Try this!

![script](sound-effect.png)

[[fact]]
#### How does this work?
The **play midi key** block plays the note for the given piano key.
Piano keys are numbered from lowest to highest, counting both white and black keys.
Middle C is always 60. The lowest key on an 88 key piano is 21 and the highest is 108.
MIDI (musical instrument digital interface) is an industry standard created to
control keyboards and other electronic instruments.
[[/fact]]

[[
