# NeoPixels - micro:bit

Connect the micro:bit to MicroBlocks and add the NeoPixel library.

<img src="greenCircle.jpg" width="60"> <img src="neopixel-library.png" width="150">

Problems? See [Get Started](https://microblocks.fun/get-started).

Connect a NeoPixel strip using alligator clips or an extension board.

<img src="connect1.jpg" width="150"> <img src="connect2.jpg" width="140"> <img src="connect3.jpg" width="168">

Start with an **attach LED NeoPixel strip to pin** block.  Input both the number of NeoPixels on your strip and the pin to which the strip is connected. Attach a **set NeoPixels** block to your script and click on it. Your NeoPixels should light up!

![script](https://microblocks.fun/render?json=%7B%22libs%22%3A%20%5B%22NeoPixel%22%5D%2C%20%22locale%22%3A%20%22en%22%2C%20%22scale%22%3A%201%2C%20%22script%22%3A%20%22script%2010%2010%20%7BwhenStarted%3B%20neoPixelAttach%2010%201%3B%20setNeoPixelColors10%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%20%28colorSwatch%2035%20190%2030%20255%29%7D%22%7D)

Change the color by selecting the green circles and customizing them. 

<img src="edit-colors.png" width="250"> ![script](https://microblocks.fun/render?json=%7B%22libs%22%3A%20%5B%22NeoPixel%22%5D%2C%20%22locale%22%3A%20%22en%22%2C%20%22scale%22%3A%201%2C%20%22script%22%3A%20%22script%2010%2010%20%7BsetNeoPixelColors10%20%28colorSwatch%20217%2027%200%20255%29%20%28colorSwatch%20236%20124%209%20255%29%20%28colorSwatch%20250%20227%200%20255%29%20%28colorSwatch%2056%20222%202%20255%29%20%28colorSwatch%2036%20219%20215%20255%29%20%28colorSwatch%2050%2035%20230%20255%29%20%28colorSwatch%20162%2012%20255%20255%29%20%28colorSwatch%20246%2068%20224%20255%29%20%28colorSwatch%200%200%200%20255%29%20%28colorSwatch%20222%20222%20222%20255%29%7D%22%7D)

To make it look like the rainbow is moving, rotate the NeoPixels by one forever after the program has started.

![script](https://microblocks.fun/render?json=%7B%22libs%22%3A%20%5B%22NeoPixel%22%5D%2C%20%22locale%22%3A%20%22en%22%2C%20%22scale%22%3A%201%2C%20%22script%22%3A%20%22script%2010%2010%20%7BwhenStarted%3B%20neoPixelAttach%2010%201%3B%20setNeoPixelColors10%20%28colorSwatch%20217%2027%200%20255%29%20%28colorSwatch%20236%20124%209%20255%29%20%28colorSwatch%20250%20227%200%20255%29%20%28colorSwatch%2056%20222%202%20255%29%20%28colorSwatch%2036%20219%20215%20255%29%20%28colorSwatch%2050%2035%20230%20255%29%20%28colorSwatch%20162%2012%20255%20255%29%20%28colorSwatch%20246%2068%20224%20255%29%20%28colorSwatch%200%200%200%20255%29%20%28colorSwatch%20222%20222%20222%20255%29%3B%20forever%20%7BrotateNeoPixelsBy%201%3B%20waitMillis%20200%7D%7D%22%7D)