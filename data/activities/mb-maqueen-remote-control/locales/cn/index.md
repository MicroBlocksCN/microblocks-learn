### 概述

[Macqueen小车](https://www.dfrobot.com/product-2557.html) 是一个由micro:bit控制的小车。

![rob0148-en.jpg](rob0148-en.jpg)

它有一个线路追踪器、一个超声波距离传感器、两盏LED车灯、一个红外接收器、一个蜂鸣器和四个朝下的 RGB灯。它还有一个 I2C 端口、两个伺服端口（S1、S2）和两个重力扩展端口（P1、P2）。

![](macqueen_board_cn.png)
（注：上图是利用阿里云提供的图片翻译生成的。图中，地面两字宜改为地线。）

在此教程中，我们将对Maqueen小车进行编程，由红外遥控器控制它移动。

我们使用下面这个简单的红外遥控器：

![](ir-remote_trn.png)

然而，您可以使用任何基于通用 NEC 协议的红外遥控器。您可以通过运行 **Macqueen IR Keycode** 积木（见下一节），并按下遥控器上的键来测试遥控器。如果该积木返回一个数字，则遥控器能正常工作。注意，你使用的遥控器发送的编码可能与本教程使用的遥控器发送的编码不相同。

### 脚本

![](allScripts_cn.png)

### 积木库

本教程使用下面两个积木库:

* **Maqueen** (在**机器人** 大类内): 控制小车的功能。
* **LED显示** (可选): 使用小车底部的彩色LED灯。

要加载这些积木库，请单击 **积木库** 旁边的 **+** 并添加库。

### 红外线基础知识

让我们回顾一下红外遥控器的使用。

每当按下其中一个键时，遥控器都会从位于其前面的红外 （IR） LED 发出不可见的长短闪光序列。

![irled2.png](irled2.png)

[[note]]
人眼对红外光线不敏感，但许多数码相机却能够捕捉红外光线。在相机图像中，红外光线通常显示为紫色光芒。但是，某些相机（例如iPhone中的相机）具有阻止红外线的特殊滤镜。
[[/note]]

位于小车前部的红外接收器接收并解码红外信号。

![macqueen_front_org.png](macqueen_front_org.png)

为了读取Microblocks程序中的代码，我们需要使用  **Macqueen IR Keycode** 积木。在收到遥控器发出的红外信号时，此积木返回解码得到的编码。下图中，我们看到了按遥控器上的OK键的编码：

![](block_irkey_ok.png)

### 按键控制

我们的程序将使用15个键来控制小车：

* **0-9数字键**: 用于设定速度；
* **方向键** 控制小车运行方向；
* **OK键**: 指示小车停止运动。

要调整车速，只需按数字键0-9中的一个。 0（数字0键）或OK键将使小车停止运动。 按数字键 1-9 将设置速度，从最慢变为最快。按下方向键将激活新设置的速度。

### 代码

MicroBlocks是一个实时的多任务环境。这意味着我们可以编写并发运行的代码。这类代码能同时判断多个条件是否成立，并根据判断结论执行相应的指令。

我们编写的程序需要关注代表方向变化以及速度调整的遥控器按键的编码。我们的程序由多组以 **当[ 按键编码 = xxx ]** 积木开头的代码组成。

单击窗口右上角的绿色箭头时，所有 **当[ 按键编码 = xxx ]** 积木都会开始运行，判断自己所关联的按键有没有被按下，如果被按下则执行相应的指令。

#### 自定义积木: IRkey

![](IRkey_cn.png)

在我们的项目中，我们将利用红外遥控器发出按键编码，并由 Maqueen 小车上的传感器接收。

正如我们在上面看到的，按下遥控器上的按键会产生各种编码，这些编码本身没有任何意义，也很难与小车的运动联系起来。

为了使代码更容易读，我们希望编写一个自定义积木，使我们能够为编码赋予有意义的名称。

一共有17个按键，因此生成了17个编码。

我们将创建这17个编码的列表，并将它们与17个按键名称相关联。这将使我们能够按名称而不是编码来处理。

于是，我们创建两个列表：

![编码-按键名称](keycode-name-list.png)

- 第一个列表叫做 **IRcodes**, 记住全部17个编码；
- 第二个列表叫做 **keyNames**, 记住17个编码对应的名称。

收到遥控器发送的编码时，我们将在第一个表中查找编码（IR码），得到该编码在IRcodes列表内的位置。然后，我们将据其位置从第二个列表 （keyNames） 中提取按键的名称。

为此，我们将使用两个 **信息类** 积木。

![](block_find64_ircodes_cn.png)

![](block_index_5_keynames_cn.png)

**查找**积木使我们能够在 IRcodes 列表中搜索编码。以 OK 键（编码 = 64）为例，**查找**积木将返回值 5;这意味着编码 64 在列表内的位置是 5。

![](block_find_macqueen_ircodes_cn.png)

现在我们有了编码的位置信息，我们可以使用它来查找其对应的按键名称。我们通过使用**第n项<KeyNames>**积木来做到这一点。此积木返回存储在KeyNames列表内的第 n 个位置的值。以OK键的编码对应的位置5为例，下面的代码将得到存储在keyNames列表的第5个位置的键名：ok。

![](block_index_5_keynames_cn.png)

通过在自定义积木IRkey 中组合这两个操作，我们获得了将任何按键编码转换为按键名称的能力。

![编码-按键名称](IRkey_cn.png)

因此，如果我们使用 **IRkey** 积木，然后按下遥控器面板上的 OK 键，它将返回键的名称 （ok） 而不是其编码 （64）。

![](block_irkeyresult.png)

我们已准备好在我们的程序中使用这个非常有用的积木。

#### 程序启动时

![](code_when_start_cn.png)

上面这一组积木定义了整个程序会使用的列表和变量。我们已经在前面讲过与按键编码相关的两个列表。

下面解释以下两个变量:

**speedIncrement:** 中文含义是速度增量。Maqueen电机的速度值范围为0-255。但是，对于放在桌面上操控的小车而言，超过 100 的速度都过快了。为了缩小一点，我们使用此变量并将其乘以速度键 （0-9） 以得出实际速度。

此变量的初始值设置为 10，并产生 0-90 范围内的速度。如果以后你想以比这更快的速度操控小车，只需将此值更改为更大的值。注意，最大值为 25。

**speed:** 中文含义是速度。初始化为 16，它设置电机的启动速度。你可以根据需要进行调整。

本节开头的代码在初始化列表和变量后，进入一个循环。在循环中，我们连续读取红外传感器收到的编码并将其存储在**key**变量中。然后在整个程序中使用**key**变量的值来确定小车动作。

#### 当key变量的值等于ok时

![](code_whenOK_cn.png)

**OK** 键使小车停止。
此外，上述代码在micro:bit显示屏上显示**S**字母作为反馈。

#### 当key变量的值等于fwd时

![](code_whenfwd_cn.png)

**fwd**键，也就是遥控器上的向前方向键，使小车往前走。
此外，上述代码在micro:bit显示屏上显示**F**字母作为反馈。注意，向前、向后、向左、向右移动小车的命令将使用**speed**变量来设置小车的速度。

#### 当key变量的值等于bwd时

![](code_whenBwd_cn.png)

**bwd**键，也就是向后方向键， 指示小车往后移动。
此外，上述代码在micro:bit显示屏上显示**B**字母作为反馈。

#### 当key变量的值等于right时

![](code_whenRight_cn.png)

**right**键，也就是向右方向键，指示小车向右旋转。
右转是通过左轮向前转动和右轮向后转动做到的。这使得小车在原地转弯，移动范围较小。此外，上述代码在micro:bit显示屏上显示字母R作为反馈。

#### 当key变量的值等于left时

![](code_whenLeft_cn.png)

**Left**键，也就是向左方向键，指示小车向左旋转。
左转是通过右轮向前转动和左轮向后转动做到的。这使得小车在原地转弯，移动范围较小。此外，上述代码在micro:bit显示屏上显示字母L作为反馈。

#### 当key变量值大于等于0、小于等于9时

![](code_whenNums_cn.png =900x380*)

上述积木控制小车的速度，并根据收到的编码值（范围是0-9）进行设置。如上文解释speedIncrement变量的文字中所述，速度是根据speedIncrement变量值计算的。
此外，micro:bit显示屏上显示相应数字（范围是0-9）作为反馈。

### 讨论

当你使用此程序控制小车时，您会注意到红外信号的指向非常关键。遥控器必须直接指向小车上的传感器，或者信号必须能够通过墙壁或其他表面反射到达传感器。当小车远离你时，向其发送控制信号并不容易。

**我们如何改善红外信号接收并消除问题？**

一种可能性是在测试区域周围竖立一些障碍物，看看我们是否可以使用它们将信号反射到小车。尝试不同的布局以改善红外信号接收。

**我们为Maqueen小车附加哪些功能？**

遥控器上有17个键，但我们只对其中的15个进行编程。*号键和#号键尚未使用。你会用这两个键做什么？看看Maqueen积木库，想想你能干点什么。

以下是值得你考虑的一些附加功能：

* 尝试**加快**小车的运动速度。
* 使用超声波测距传感器以**避免碰撞**。
* 将小车运动与**音调或音乐**相结合。
* 使用小车下方的**四个LED灯**。
* 使用小车前部的**两个红色LED灯**作为**转向信号灯**。
