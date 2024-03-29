### 隔夜数据采集

这个教程描述如何利用一块micro:bit隔夜采集数据，接着通过广播发送给另一块micro:bit，然后把收到的数据绘制成图表。

### 步骤
1. 使用一块有电池供电的micro:bit板子隔夜采集数据（比如冰箱内的温度数据）。接着把数据通过广播发送给另一块micro:bit板子。你可以把收到的数据绘制成图表，显示在电脑上，甚至可以保存数据或者报数据导入到表格文件内。

2. 你要用到两块micro:bit。一块叫做数据采集器，另一块叫做收据接收器。数据采集器启动后，每隔一段时间采集一项数据。当数据接收器按下A键的时候，通过广播通知数据采集器传输已经采集好的数据。数据接收器与电脑相连，每收到一项数据就绘制到图表中。

下图是数据采集器运行的脚本代码。

![Data collector scripts](collector-scripts.png)

下图是数据接收器运行的脚本代码。

![Data receiver scripts](receiver-scripts.png)

你需要单击图表按钮，打开数据图表才能看到基于所采集的数据绘制的图表。

![Show graph](show-graph.png)