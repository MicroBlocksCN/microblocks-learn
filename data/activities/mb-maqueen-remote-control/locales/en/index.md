### Overview

The [Maqueen](https://www.dfrobot.com/product-2557.html) is a small, micro:bit controlled robot.

![rob0148-en.jpg](rob0148-en.jpg)

It features a line tracker, an ultrasonic distance sensor, LED headlights, an IR receiver, a buzzer, four downward-facing RGB NeoPixels. It also has an I2C port, two servo Ports (S1, S2), and two Gravity expansion ports (P1, P2).

![](featurediagram_edit2.png)

In this activity, we will be programing the Maqueen to be controlled by an IR keypad, as well as set its speed.

We used this simple IR remote:

![](ir-remote_trn.png)

You can use any IR remote that uses the NEC protocol. You can test a remote by running the **Macqueen IR keycode** block and pressing a key on the remote. If the block returns a number, then the remote will work, although you'll probably need to change the scripts to use the key codes sent by your own remote.

### Scripts

![](allScripts-new.png)

### Process

Before we get into the details of the code, let's take care of a few housekeeping tasks to setup our project.

#### Selecting the Libraries

Maqueen has a nice set of 4 NeoPixel LEDs on the underside. If you want to enhance your activity by using these lights, we will need some help from a specific MicroBlocks library:

* **NeoPixel**: to use the colorful NeoPixel LEDs under the car.

* **Maqueen**: to control the features of the car.

To load these libraries, click on the **Libraries** menu option and then select the library from the categories displayed.

#### IR Basics

Let's review the operation of the IR keypad.

Anytime one of the keys are pressed, the keypad transmits an invisible sequence of codes from the IR LED located in the front of it.

![irled2.png](irled2.png)

[[note]]
The human eye is not sensitive to infrared light, but many digital cameras are. Infrared often appears as a purple glow in the camera image. However, some cameras, such as those in iPhones, have a special filter that blocks infrared.
[[/note]]

Another sensor located at the front of the car receives these signals and decodes them according to the protocol supported.

![macqueen_front_org.png](macqueen_front_org.png)

In order to read the codes in our MicroBlocks program, we need to use the **Maqueen IR keycode** block. This block returns the numeric code decoded when it receives an IR command. Here we see the result of pressing the OK key on the remote:

![](block_irkey_ok.png)

### User Interfce

#### Key Controls

Our program  will be controlled by an IR Keypad that has 17 keys on it:

* **Arrow keys:** will control the direction the car is travelling.

* **OK key**: will stop the car movement.

* **0-9 keys**: will be used to set the movement speed of the car.

* __* and # keys:__ not used. User programmable.

To adjust the car speed, simply press one of the numeric keys 0-9.
0 (zero) will stop the car, just like the OK key.
1-9 will adjust the speed from the slowest to the fastest. Remember to press one of the direction arrow keys to activate the newly selected speed.

Now we can start looking at the code to do what we have described above.

### Code Details

MicroBlocks is a real-time, multi-tasking environment. This means that we can write our code such that various conditions are detected and acted upon in parallel.

The conditions that we have to take care of are various IR key code values that represent the directional changes, as well as the speed adjustments. Our program consists of groups of **when [condition]** blocks that handle all these.

When the **Run** icon is clicked, all the when blocks start running,  evaluating their assigned conditions and acting accordingly.

#### Custom Block: IRkey

![](code_irkey.png)

In our project, we are going to make use of the IR codes emitted by the remote control and detected by the sensor on the Maqueen.

As we have seen above, the keypresses result in various numeric values, that by themselves have no meaning and hard to associate with the movements of the car.

To make our lives easier, we want to write a small custom block that will enable us to assign meaningful names to the numeric key values.

There are 17 keys and therefore 17 numbers generated.

We want to create a list of these 17 keycodes, and associate them with 17 key names that we want to refer to them by. This will allow us to deal with the keycodes by names instead of numbers.

So we create two lists:

![code_ircode2keys.png](code_ircode2keys.png)

- first one called **IRcodes**, that will store the numeric codes
- second one called **keyNames**, that will store the names assigned by us.

What we want done is this:

When we press a key and get a keycode, we want to look it up in the first table (IR codes) and use its location index to pick up a name we have assigned from the second list (keyNames).

To accomplish this we make use of the two **data category** blocks:

![](block_find64.png) &nbsp;&nbsp; ![](block_itemOK.png)

The **find** block enables us to search the IRcodes list for a keycode we want to locate. Using the example of the OK key (value=64), this block will return the value of 5; meaning numeric code 64 is found in position 5 of the list.

![](block_find_code64.png)

Now that we have this information, we can use it to look up the key name we have assigned to that value. We do this by using the **item n of** block. This block returns the value stored in the nth position of a list. In our case, we want to retrieve the key name stored in 5th position of the **keyNames** list: **ok**

By combining these two operations in a custom block **IRkey**, we gain the ability to convert any numeric IR code to a name we have assigned.

![](block_irkeyresult.png)

So if we execute the **IRkey** block and then press the **OK key** on the keypad, it will return to us the name of the key: **ok**, instead of its numeric value 64.

We are ready to use this very helpful block in our program.

#### When Started

![](code_whenStarted.png)

This group of blocks define the lists and variables of the program. We have already talked about the two lists for the IR codes.

Let's examine the two variables:

**speedIncrement:** Speed values for the Maqueen motors range from 0-255. However, anything over 100 might be too fast for any type of **table top** operation. To scale it a bit down, we use this variable and multiply it by the speed key (0-9) to arrive at the actual speed.

The initial value for this variable is set to 10 and produces speeds in the range of 0-90. If later on you would like to operate the car faster than this, just change this value to another one, maximum being 25.

**speed:** Initialized to 16, it sets the starting speed for the motors. If needed, you can adjust it to match your needs.

After the lists and variables are initialized, we enter a loop. In the loop, we continuously read the IR sensor value and store it in a variable called **key**. This **key** variable is then used throughout the program to determine the car actions.

#### When key = ok

![](code_whenOK.png)

**OK** key is used to stop the car.
We also display the letter **S** on the micro:bit display as a feedback.

#### When key = fwd

![](code_whenFwd.png)

**fwd** key is used to move the car forward.
We also display the letter **F** on the micro:bit display as a feedback. Notice that this and other movement commands use the **speed** variable to set the speed.

#### When key = bwd

![](code_whenBwd.png)

**bwd** key is used to move the car backward.
We also display the letter **B** on the micro:bit display as a feedback.

#### When key = right

![](code_whenRight.png)

**right** key is used to put the car into a right turn. Right turn is executed by turning left wheel forward and the right wheel backward. This makes the car turn on the spot, covering less space while moving.
We also display the letter **R** on the micro:bit display as a feedback.

#### When key = left

![](code_whenLeft.png)

**left** key is used to put the car into a left turn. Right turn is executed by turning right wheel forward and the left wheel backward. This makes the car turn on the spot, covering less space while moving.
We also display the letter **L** on the micro:bit display as a feedback.

#### When key >= 0 and key <= 9

![](code_whenNums.png)

This block controls the speed of the car, and sets it according to the value 0-9 detected. As mentioned above in the **speedIncrement** description, the speed is calculated based on the increment value.
We also display the key value **0-9** on the micro:bit display as a feedback.


### Discussion

Wow, we have reached the end of our Maqueen activity.

As you start using the program, you will notice that IR signals are very much directional. Meaning the remote control has to be pointing directly at the sensor on the car, or there has to be a way for the signals to reach the sensor. Therefore, when the car is moving away from you, it is not easy to send controls to it.

**How can we improve IR reception and eliminate the problem?**

One possibility is to erect some barriers around the testing area and see if we can use them to bounce the signals to the car.

Experiment with different layouts to improve the IR signal reception.

We mentioned that there were 17 keys on our remote controller. However we only programmed 15 of them. The keys __* and #__ are not used yet.

**What additional of features of the Maqueen can we program in our project and assign to * and # keys?**

Here is where your creativity and newly learned programming skills come into play. Check out the Maqueen library blocks and see what you can come up with.

Here are a few additional enhancement or changes that you might entertain:

* Try to **speed up the car** movements.
* Engage the distance sensor to **implement collision avoidance**.
* Combine car movements with **tone signals**.
* There are **four NeoPixel LEDs** under the car. See if you can integrate them into the program.
* There are **two red LEDs** in the front of the car. See if you can use them **as turn signals**.

### Project Download

[Download](maqueen_ircontrol.ubp) the program to try out this activity.

