### 电池电压测量器

本教程描述如何使用micro:bit和两根带有鳄鱼夹的电线制作电压测量器。电压测量器用于测量1.5伏电池的电压。

1. 把micro:bit连接到Microblocks。
2. 把一根带有鳄鱼夹的电线连接到GND引脚（如下图墨绿色鳄鱼夹所示），另一根连接到引脚1（如下图白色鳄鱼夹所示）。

    ![电压测量器](battery-tester.png)

3. 连接GND引脚的电线的另一头与电池负极相连，连接引脚1的电线的另一头与电池正极相连。
4. 下面的脚本将持续报告所测量的电池的电压值。在本例中，“读取模拟引脚”积木的作用是得出电池的电压值。

    ![读取电压值](read-analog-pin-1.png)

5. 一节新电池大致输出1.6伏电压，相应地，从引脚读到的数值是520。即使一节废弃的电池，也能输出0.9伏电压，从引脚读到的相应数值是290。你可以找出使用程度不同的1.5伏电池，运行上述脚本测量读取到的数值。

6. 下面的脚本根据所读取的数值，在micro:bit显示屏上显示电池电量有几格。

    ![显示电池电量格数](dianchi-dianliang.png)
