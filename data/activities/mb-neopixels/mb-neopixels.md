# NeoPixels - micro:bit

Connect the micro:bit to MicroBlocks and add the NeoPixel library.

<img src="files/greenCircle.jpg" width="60">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="files/neopixel-library.png" width="150">

Problems? See [Get Started](https://microblocks.fun/get-started).

Connect a NeoPixel strip using alligator clips or an extension board.

<img src="files/connect1.jpg" width="150">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="files/connect2.jpg" width="140">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="files/connect3.jpg" width="168">

Drag the attach LED NeoPixel block to the scripting area.  Input both the number of NeoPixels on your strip and the pin to which the strip is connected, then run it.


<img src="files/script1.png" width="300">

Drag the set NeoPixels block to the scripting area and click on it. Your NeoPixels should light up!

<img src="files/set-neopixels1.png" width="150">


<span style="font-size:10px;">CC BY-SA 4.0 http://microblocks.fun v1.0</span>
<div style="page-break-after: always;"></div>

Change the color by selecting the green circles and customizing them. 

<img src="files/edit-colors.png" width="250">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="files/set-neopixels2.png" width="150">

To make it look like the rainbow is moving, rotate the NeoPixels by one forever after the program has started.

<img src="files/script2.png" width="300">

<span style="font-size:10px;">CC BY-SA 4.0 http://microblocks.fun v1.0</span>

DEBUG THIS:

<img src="https://microblocks.fun/render?json=%7B%22libs%22:%20%5B%22NeoPixel%22%5D%2C%20%22locale%22:%20%22English%22%2C%20%22scale%22:%201.0%2C%20%22script%22:%20%22script%2010%2010%20%7B%20whenStarted;%20neoPixelAttach%2010%201;%20setNeoPixelColors10%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29;%7D%20%22%7D">
