翻译：自在飞叶

本教程描述如何通过WebThings网关控制micro:bit板子上的LED灯。

### 准备工作

事先安装Mozilla发布的WebThings网关（Mozilla WebThings Gateway）。推荐两种安装WebThings网关的途径。

1. 安装在树莓派（Raspberry Pi）主板上。访问https://webthings.io/gateway/，下载“WebThings Gateway for Raspberry Pi”系统映像（见下图）。把该系统映像刷到树莓派板子上，该树莓派系统就成为WebThings网关。micro:bit可以通过USB连接到运行在树莓派主板上的网关。Esp32或者Raspbery Pico W等既可以通过USB，也可以通过Wifi连接到该网关。

![Webthings Gateway Portal](webthings_io.png)

2. 安装在Docker容器内。访问https://webthings.io/gateway/，下载“WebThings Gateway for Docker”系统映像。由Docker加载该映像，WebThings网关就诞生了。Esp32或者Raspbery Pico W等可以通过Wifi连接到该网关。

安装成功后，在浏览器地址栏输入：localhost:8080（注：端口号可能是80、8089等，根据实际情况输入），随着登录成功，你将看到如下所示的页面。

![WebThings Gateway First Page](gateway_logined.png)

### 让WebThings网关控制micro:bit的LED

1. 在上图所示的浏览器页面上，单击左上角有三条白杆杆的图标，在弹出的菜单里选择“设置”（英文是Settings），然后新出现的菜单里选择“附加组件”（英文是Add-ons），进入“附加组件管理页面”。在该页面上，单击右下角的加号图标可以安装附加组件。你要安装Microblocks组件和Web Thing组件。安装完成后，“附加组件管理页面”如下图所示。

![安装附加组件](install_addons.png)

2. 把micro:bit连接到Microblocks，在Microblocks里编写如下图所示的脚本。

![micro:bit运行的脚本](microbit-hello-led.png)

3. 按一下micro:bit板子的A键，板子上第一行第三列的LED将发出红光；再按一下，这个LED将熄灭。再按，变亮；再按，熄灭。

4. 把micro:bit板子通过USB连接到用作WebThings网关的树莓派上，在登录成功后出现的页面（见“准备工作”一节尾部的图示）上，单击右下角的加号，进入下图所示的页面。此时，正在搜索新设备。

![搜索新设备](search-device.png)

5. 搜索过程将发现名字为“Hello LED”的设备，单击保存按钮和完成按钮，新设备就受WebThings网关管理，如下图所示。

![添加新设备](add_hello_led.png)

6. 此后，单击上图所示页面上的灯泡图标，将点亮或者熄灭micro:bit板子上的LED，就像按下micro:bit板子的A键一样。

### 关于WebThings的更多内容

Microblocks包含多个使用WebThings的实例。下面给出打开一个实例的操作流程。

1. 单击Microblocks窗口的文件图标。

![单击文件图标](select_files.png)

2. 在弹出的对话框里，选择“示例”，在右侧的列表中选择“Web of Things”。

![选择WoT](select_example_WoT.png)

3. 弹出的新对话框列出一组使用WebThings的程序，如下图所示。

![WoT实例程序](examples_WoT.png)

4. 选择其中一个程序，单击打开按钮。在Microblocks脚本区将出现该程序的代码。

把一个Microblocks程序变成一个受WebThings网关管控的设备，至少要添加以下积木（参见上一节第2步给出的脚本）：

1. 设置Thing的名字积木；
2. 设置Thing的能力的积木；
3. 设置属性的积木。

这里，受WebThings网关管控的设备是一个Thing。