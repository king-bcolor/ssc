# ssc
![](http://kaifariji.top/static/img/a4efcb4abc0a1cf4e06afb8c2e3a53e9.logo.png)



> 一款css处理器，参数式声明，属性选择器分离
> 适用于于轻量级项目的开发，语法简洁,书写便利，复用性高
> 块状分发选择器方便小程序的多个wxss集成在一个文件中书写 

## 前言
该工具用于解决重复声明相同属性带来的额外工作，原子级的属性复用，颠覆性的参数式声明写法
## 环境
推荐node 16 ，但本包并未引入第三方依赖，其他版本node暂未测试
## 安装
```
npm i npm-ssc-tool -g
```
## 使用
### 语法规范
后缀名为 `.ssc`
    
```
attr:   //属性块
    width // 属性名
        (100px):A001 // 冒号前为属性值，冒号后为选择器指针
        (200px):A002,A003
    height
        (100px):A001
        (200px):A002,A003,A004
        
select: //选择器块

    ~path./demo.vue     // ~path 声明编译后的路径
    A001=>.btn                // A001 为指针 .btn 为选择器类名
    A002=>div
    
    ~path./demo.css         // 可写多个路径分发选择器
    A003=>.a
    
    ~path ./demo.wxss
    A004=>view
```

![](http://kaifariji.top/static/img/c01e74234325380e1d08fd70840afda6.20230222171024.png)

- 属性和选择器分离，通过指针连接，提高了属性复用性
  减去了重复属性以及属性参数的书写
- 项目仍属初期，暂不支持注释，语法尽量按照规范，不然会有意想不到的bug


终端输入 ssc \<path\>
### 编译后
```
demo.vue
<style lang="scss">   // 在vue和html后缀的文件中会自动放入style标签内
 .btn{width:100px;height:100px;} div{width:200px;height:200px;}
</style>              // 在wxss和css后缀的文件中会直接写入
```
```
demo.css    
.a{width:200px;height:200px;}
```
编译前
![](http://kaifariji.top/static/img/60daa1fbb05ce23154e24e09eb735d7d.css1.png)
编译后
![](http://kaifariji.top/static/img/ec0dc22d5657ca6b342595d7a0d6397a.css2.png)

如果有一定数量的样式属性，则复用效果更好更直观

## 三大特性
 - 原子级别的属性复用
 - 块状分发编译后文件
 - 简洁的语法，比stylus更简洁
 
## 计划实现功能
> 该工具还处于比较粗糙的初期阶段，欢迎和我一起
> qq群号：344946981
- typescript重构优化
- 更多的错误捕捉
- vscode语法插件
- 命令行美化
- 修改大大小小的bug
- 更多的语法糖简洁写法

