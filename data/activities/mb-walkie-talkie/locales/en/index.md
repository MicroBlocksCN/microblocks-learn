### Introduction

This advanced activity uses the microphone, speaker, and radio of the micro:bit v2 to make a simple walkie-talkie. It works by recording a short message then transmitting it as a sequence of radio packets to any micro:bits within radio range (10-15 meters).

This activity builds on the digital sound recording and playback ideas from the "Recording Sound with the micro:bit v2" activity.


### How it works

This walkie-talkie program does not stream sound continuously. Instead, it records a short message such as "Where are you?" as a sequence of bytes. When recording is finished, it sends that sound data using the micro:bit's radio system. Using low-level radio packets, it packes 30 bytes of sound data into each packet, greatly reducing the transmission time.

The receiving side waits until a walkie-talkie data packet arrives. That signals the start of a new message. It then reads a sequence of data packets, appending the incoming bytes the received data buffer. When the data packets stop arriving -- or when the received data buffer is full -- it plays the received sound data through the speaker.

... work in progress ...

### Sending

![Press A to Talk script](press-A-to-talk.png)

#### Record

![Record function](record.png)

#### Transmit

![Transmit function](transmit.png)

### Receiving

![Receive and play loop](receive-and-play.png)

#### Receive

![Receive function](receive.png)

#### Play

![Play function](play.png)

### Complete Project

[walkietalkie.ubp](walkietalkie.ubp)
