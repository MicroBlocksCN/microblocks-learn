### Introduction

在这个教学项目中，学生将利用micro:bit, 盒子（或类似的东西）、橡皮筋、伺服器（舵机）、轮子和冰棍棒构建一个简易小车。学生还将通过遥控器来控制简易小车的移动。

这个教学项目涉及多项课程目标。学生可接触到简易机械装置，讨论车轮和车轴。学生也有机会接触到与运动相关的物理概念。

### 目标

学生将创建会跳舞的micro:bit（即简易小车）。做法是把两个360度舵机分别与两个车轮相连，而后把舵机绑到盒子上。学生也将编写控制简易小车移动的脚本代码。控制是通过调整舵机和车轮的速度和方向来做到的。

### 所需材料
* micro:bit，带电池组和扩展板（如ring:bit或basic:bit）
* 2个360度舵机
* 2个轮子
* 小盒子（比如装micro:bit的包装盒）
* 至少 4 根橡皮筋
* 冰棍棒
* 磁带

![All the necessary materials](materials.png)

### 步骤

#### 向学生介绍项目

给学生介绍此项目及其背景知识的一种方法是向他们展示将使用的材料（或把上图投影到墙上），并询问学生：你们认为将制作什么东西？

向学生解释，这些配件将使得他们制作的小车朝任意方向移动，包括左右摆动、原地旋转、或者向前向后移动。

对简易小车可尝试哪些舞蹈动作进行头脑风暴或展开联想会是一件好玩的事。

#### 开始装配

组装该项目的第一步是将舵机连接到micro:bit。在这里，我们使用一个ring:bit扩展板连接舵机。深色电线（黑色或棕色）连接到ring:bit上的“G”口（即接地）。如果你没有使用带有电池的扩展板，你需要把一组电池连接到micro:bit。仅凭来自USB线的电源，micro:bit无法为舵机供电。

![Servos and battery pack](setup-01.png)

接下来，使用橡皮筋将一个舵机连接到盒子上，如下图所示。然后，小心地将另一个舵机套到盒子另一侧的橡皮筋下。

![Using a rubber band to tie the servos](setup-02.png)

再绑一根橡皮筋以保证舵机固定在盒子两侧。

![Using an additional rubber band to tie the servos](setup-03.png)

要将micro:bit安装在盒子上，在盒子横向系上橡皮筋。

![Securing the board with a rubber band](setup-04.png)

[[note]]
你可能需要提醒学生连接舵机时动作要轻柔。
[[/note]]

最后，沿盒子纵向绑一根橡皮筋。这有助于将micro:bit更牢固地固定在盒子的顶部。 

![Securing the board with an additional rubber band](setup-05.png)

接下来，将轮子固定在舵机上。舵机随附的螺钉可以用于固定车轮，以防它们太容易脱落。

![Afficing the wheels to the servos](setup-06.png)

最后，将冰棒棍贴在盒子的一头，也即远离车轮的一头。这有助于盒子在硬质表面上轻松滑行，从而使得舵机和轮子在盒子舞动起来时能够拉动盒子！

![Attaching the popsicle stick](setup-07.png)

#### 让简易小车动起来

至此，简易小车组装好了。学生想让它动起来！通过USB线，把micro:bit与运行Microblocks的电脑连起来。

[[note]]
核实扩展板已经通电。选用长USB线将比较有利。或者，学生可以在组装简易小车之前就写好代码，并下载到micro:bit板子上。学生可以先把舵机和车轮连到micro:bit上，测试小车的运动，接着在小车组装好后做一些调整。
[[/note]]

[[safety]]
对于下面几段代码，告诉学生抬高简易小车，让小车的轮子不接触桌面。这样，学生能够在小车不动的情况下看到车轮的旋转。这能够避免小车不小心从桌面掉落。
[[/safety]]

首先，将两个设置舵机的积木拖到脚本区中，并更改其中一个以控制2号舵机。

![Set servo 1 to speed 30](setup-servo-1.png)

![Set servo 2 to speed 30](setup-servo-2.png)

鼓励学生尝试不同的速度值。当他们设定两个正数时会发生什么?两个负数呢？

通过设置两个正数， 小车应该朝一个方向转动。两个负数的话，小车应该朝另一个方向转动。一个正一负将使小车前进或后退。

![Setting servo 1 and 2 to speed 30 and -30](setup-servo-1-30-2--30.png)

一旦学生让小车动起来，他们可能想让它停下来，为后续移动做好准备。为此，我们可以使用**停止舵机**积木：

![Stopping servos](stop-servo-1-2.png)

将这些脚本合在一起，中间放一个**等待500毫秒**积木。当程序启动时，小车将向前移动而后停止。

![Move forward for a bit, then stop](setup-stop-servo.png)

此刻是向学生示范如何在MicroBlocks内定义积木的好机会。上述代码可以制作成名为**forward**的积木。单击**我的积木**，接着单击**新建命令积木**，然后把新积木的名称叫做**forward**。接下来，把上面的脚本移到**forward**积木内。

![Defining the "forward" block](define-forward.png)

将新定义的**forward**积木拖到脚本区以调用此积木。鼓励学生定义不同的命令积木，以使他们的小车移动和舞动起来。

![New "forward" block](forward-block.png)

#### 设置遥控器

一旦小车按照学生想要的方式舞动起来，他们可能想要远程控制它。学生可以编写使用另一个micro:bit来控制小车上的micro:bit的代码。这将解放双手！这一步引入使用广播消息积木进行遥控的概念。按照下面的步骤来设置遥控器。

*接收广播消息*

首先，当小车上的micro:bit依旧连接到电脑的情况下，添加一块**当启动时**积木，其下加一块**设置广播分组**积木。选择0到255之间的一个数字作为组号，并且记住这个组号。下图选用8作为组号。

![Setting the radio group to 8](init-radio.png)

接下来，添加**当广播消息已收到**积木，其下添加通知小车在收到消息后如何做的积木。下图中，收到消息后，调用上面定义的**forward**积木。

![When radio message received, move forward](receive-radio.png)

[[note]]
如果你们是在同一个教室内，一起有多个micro:bit，你需要告诉学生选用不同的广播分组组号，以免彼此干扰。在黑板上列一张表，写下各个学生使用的组号。
[[/note]]

*发射广播消息*

保存当前打开的MicroBlocks窗口内编写的代码。接着，打开一个新的MicroBlocks窗口，为第二块micro:bit板子编写代码。第二块micro:bit将用作小车的遥控器。断开小车上的micro:bit与电脑的连接，把用作遥控器的micro:bit连接到电脑。在脚本区添加下面两组实现遥控的积木。

![Setting the radio group to 8](init-radio.png)

![MicroBlocks script](send-radio.png)

首先，把广播消息分组的组号设置为小车上的micro:bit记住的组号（上图中，组号为8）。接着，当按下按钮A时，使用**广播发送数字**积木，把广播消息信号发给小车上的micro:bit。**广播发送数字**积木内，填写任何数字都是可以的，因为我们只是检查是否已收到广播消息，但未查看其内容。断开遥控用micro:bit与电脑的连接（确保它连接了电池），你就可以用这块micro:bit来遥控小车。

![The assembled robot car](assembled.png)
