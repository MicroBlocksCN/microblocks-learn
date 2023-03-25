### 红外远程控制

翻译: 自在飞叶

这个学习项目讲述如何使用一个红外远程控制器来控制Microblocks项目。

1. 把Micro:bit连接到Microblocks。

**如果你不知道如何连接Micro:bit**, 请从[这里开始](https://microblocksfun.cn/get-started).

如果你[在浏览器中运行 MicroBlocks(推荐)](https://microblocksfun.cn/run/microblocks.html), 请单击 USB 图标进行连接。
如果你使用 MicroBlocks 桌面应用，程序将自动连接到Micro:bit。

当出现一个绿色圆圈，表明Micro:bit已连接。

![](connectionCircle.png =150x*)

2. 通过鳄鱼夹或者扩展板，把红外传感器连接到Micro:bit。下图是通过ring:bit扩展板连接到Micro:bit，接在1号引脚上。

![](thumbnail.jpg)

3. 点击积木库三个字右侧的加号，在弹出的窗口内选择“其他”条目，新的窗口内容如下图所示，选择“红外线”，点击打开按钮，导入红外线积木库。

![](ir_lib.png =180x*)

4. 照着下图编写脚本，接着点击脚本上的积木运行这一组脚本，然后把红外控制器朝向红外传感器，在红外控制器上按下一个按钮。你会看到脚本报告一个数字，比如160之类的。提示：脚本外围有绿色光晕，表明脚本正在运行。

![](ir_rcv_codes.png =200x*)

5. 下面的脚本使得在红外传感器接收到160这个数字的时候，Micro:bit上显示笑脸。点击窗口右上角的绿色箭头启动脚本的执行。

![](ir_led_smile.png =240x*)

6. 在0号引脚上连接扬声器，运行下面的脚本将能让你“听到”红外信号。

![](ir_code_audible.png =200x*)

