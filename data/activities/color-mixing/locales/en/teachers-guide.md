### Introduction

This activity explores how red, green, and blue light can be combined
to make different colors. Along the way, students will learn how to
control the brightness of an LED and a little bit about how color
vision works.

### Goal

Students will create a color mixing device that explores additive
color mixing. Students will also explore how blinking lights,
brightness, and their own eyes all participate in the way we see
color.

### Materials needed:

- micro:bit
- Small cardboard box
- White paper (printer paper, tissue, white coffee filter, etc.)
- Red, Green, and Blue LEDs with built-in resistors (available from
SparkFun)
- Six alligator clips OR
- An extension board with connection pins and six female-to-female
jumpers
- Craft knife (**Note:** Make sure children can use a sharp
craft knife safely. Younger children can use scissors.)

#### Background Knowledge & Introduction

Ask students what they know about colors and color mixing. Here are
some suggestions for questions:

- What happens when you mix light colors?
- What color do red and green light make together?
- Is that the same or different from the way paint colors mix?
- What connections can you make to colors in Scratch? In graphics or document editors?

Explain to students that they will be creating their own color mixing
device! They will use three different LEDs to mix colors.

This may be a good moment to discuss the difference between mixing paint colors
and light colors.
Paints *subtract* the unwanted colors from white light, leaving
only the desired color.
LED's and computer displays *add* primary colors to created the desired color.
See the [color mixing](https://en.wikipedia.org/wiki/Color_mixing) Wikipedia article.

#### Procedure

On the inside of a box, mount three LEDs with their lenses pointing
towards the opposite side of the box. One way to do this is to make a
short slit with the craft knife for each LED, poke its legs through
the slit, and connect the jumper wires or alligator clips to its legs
on the outside.

On the opposite side of the box, affix a white piece of paper or an
index card to the box. This will serve as the screen that you will use
to mix your lights.

Connect the LEDs to the micro:bit. The short leg of each LED should be
connected to GND. The long legs should be connected as follows:

- Red LED  - pin 0
- Green LED  - pin 1
- Blue LED  - pin 2

To figure out which LED is which, first connect its long leg to 3v.
You'll see the paper light up with its color. Then connect that LED to
the pin listed above. Start MicroBlocks and connect your micro:bit.

This block turns on the red LED:

xxx

You should see a red glow on the side on your box. Some LEDs have a
clear lens that will project a round circle of red light. Other LEDs
have a milky lens that creates a more diffused glow.

This block turns off the red LED:

xxx

Those blocks can be used to turn the green and blue LEDs on and off
by changing the pin numbers to 1 and 2. We can explore combinations of
colors using a script like this:

xxx

Start this script, then click on the gray circle in the block to turn
the LEDs on and off in different combinations. You may need to adjust
the angle of your LEDs so that the circles of light will overlap.

Explore different combinations with students. What colors do you get
when the red and green LEDs (pins 0 and 1) are on and blue (pin 2) is
off? How about red and blue or green and blue? The colors red, green,
and blue are called the primary colors for light. Combining pairs of
primary colors create the secondary colors for light like yellow, cyan
(blue-green), and magenta (purple). What color do you get when all
three LEDs are on?

Teaching Note: color mixing with light is called "additive color
mixing" because each color adds new colors to the light that reaches
your eyes. In contrast, when you mix colored paints, each paint
removes, or subtracts, some colors from the light that is reflected
from the paint. Thus, mixing paints is called "subtractive color
mixing." For more information, see
[color mixing](https://en.wikipedia.org/wiki/Color_mixing) in Wikipedia.

In the last activity, each LED was either completely on or off. We
could control which LEDs were on, but not how bright they were. We
could only create seven different colors of light: red, green, blue,
yellow, cyan, and magenta (plus black when all LEDs are off). If we
can control how much of each color we add by controlling the
brightness of each LED, we can create a wider variety of colors!

However, the micro:bit only has "digital" output pins. This means they
can only be on or off and not in between. In electrical terms, a
digital pin can output zero volts or 3v but not any voltage in
between.

Fortunately, we can take advantage of how our eyes work to simulate
brightness. Our eyes perceive a rapidly blinking light as if it were a
steady glow (a concept explored in the Time Scales activity found
here: http://bit.ly/2JCUTTf). What's more, our eyes average the amount
of light they receive over a short period of time to create our
perception of brightness.

The following script can be used to control the brightness of the red
LED:

xxx

This script works by turning the LED on and off very fast and changing
the percent of time that the LED is on versus off. For example, when
percent is equal to 1, then the LED is on for 100 microseconds and off
for 9,900 microseconds. The total time is 10,000 microseconds (100 +
9,900), so the LED is on of 1% of the total time. When percent is
equal to 50, the LED is on for 5,000 microseconds and off the other
5,000 microseconds.

The total time for one cycle is 10,000 microseconds, or 1 / 100th of a
second, which means the LED turns on and off 100 times every second.
For most people, those flashes will merge together and appear to be a
steady glow whose brightness is determined by the percent of time the
LED is on.

With this script running, change the value of percent to different
numbers between 0 and 100 to see how the brightness changes. Do you
see a more noticeable brightness change between 1 and 2 or between 99
and 100?

To control the brightness of all three LEDs, make two additional
copies of this script and change the pin numbers. You can also add a
when started block to each script and change the name of the "percent"
variable to indicate which color LED the script controls.

xxx

Click the start button and edit the values of the red, green, and blue
local variables to mix colors in different ways. Can you find numbers
that approximate white?

The colors red, green, and blue -- often abbreviated RGB -- come up
frequently when working with colors on computers. Each pixel in a
digital image has values for red, green, and blue that determine the
color of that pixel, and RGB values are used to specify precise colors
when creating web pages and digital media.

What's so special about the colors red, green, and blue? How do those
three light colors make all the other colors we see?

The answer lies in the way our color vision works. Most people have
three types of color receptors in their eyes, with peak color
sensitivities around the colors red, green, and blue. Although each
receptor is most sensitive to its peak color, it also detects a range
of colors around that peak. Pure yellow light falls between the red
and green peaks, so it stimulates both red and green receptors a
medium amount but it does not make much impression on the blue
receptors. Our brain combines the output of all three receptors and
comes up with "yellow".

By mixing the right amounts of red and green light, we can stimulate
the red and green color receptors the same amount that they would be
stimulated by pure yellow light. Our brains thus say "yellow!", even
though there is not any actual yellow light present. Digital imagery,
film-based photography, and color printing all depend on this ability
to use just three colors to trick our eyes into seeing all the colors
of the rainbow. Most people can distinguish about 10 million different
colors.

Other animals have different color vision systems. Many birds and
insects can see ultraviolet light that humans cannot. Some animals
have four or five different color receptors, as opposed to the three
in humans and the mantis shrimp has twelve! Their world must be full
of subtle color variations that human eyes cannot distinguish.

For more information, see https://en.wikipedia.org/wiki/Color_vision.
