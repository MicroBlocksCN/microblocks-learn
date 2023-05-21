### 无线广播

这个教程描述如何利用无线广播积木实现两块micro:bit之间的通信。

### 一、传递数据

#### 步骤

1. 把micro:bit连到MicroBlocks开发环境。

![connect to board](connectionCircle.png =80x*)

2. 利用**广播**积木库内的积木，两块micro:bit之间可进行无线通信。其中一块用作发送器，另一块用作接收器。要导入**广播**积木库，单击MicroBlocks窗口的“积木库”字眼右侧的 **+**，接下来将弹出一个对话框，其内列出多个积木库的名字，选择**广播**积木库，最后单击**打开**按钮。

![import library](import-lib.png =300x*)

3. 用作接收器的micro:bit内，运行下面的脚本。提示：当你用鼠标单击该脚本，该脚本四周将显示绿色的光晕，表明该脚本正在运行。

![Radio receiver's scripts](radio-receiver.png)

4. 请一位同学把其micro:bit用作发送器，运行下面的脚本。接着分别按下micro:bit板子上的A键、B键或同时按下A键和B键，分别发送字符串、数字和配对信息。

![Radio sender's scripts](radio-sender.png)

5. 在接收器那边，将看到所发送的字符串和数字。

思考题：
1. 无线广播的距离有多远？
2. 无线广播信号会被墙体或者人的身体遮挡吗？
3. 利用**广播发送字符串**积木，一次最多能够发送多少个字符？

### 二、传递命令

一块micro:bit可以发送命令来控制另一块micro:bit。

#### 步骤
1. 被控制的micro:bit上运行下面的脚本。脚本代码写入板子后，断开与该板子与电脑的连接，然后用一块电池为该板子供电。

![Radio receiving commands](radio-receiver-2.png)

2. 发命令的micro:bit上运行下面的脚本。按下该板子上的A键或B键，可以控制另一块micro:bit。

![Radio sending commands](radio-sender-2.png)

[[note]]
如果你身边有其他同学在用无线广播，那么有必要设置无线广播分组。用作发送器和接收器的micro:bit内都要加入下面的脚本。
[[/note]]

![set radio group](set-radio-group.png)

说明：一个广播分组可视为私有的广播频道。相互通信的发送器和接收器之间要使用同样的分组号码。这一号码要与其他分组的号码不同。
