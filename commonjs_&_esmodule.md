# Q: 什么是 commonjs， 什么是 esmodule，有什么区别

commonjs 是 node.js 上使用的模块化标准
esmodule 是 es6 正规的 javascript 模块化标标准

commonjs
模块值：返回 module.exports 值的拷贝。
执行顺序：commonjs是同步加载的，当require时会直接从磁盘读取代码片段并执行，然后返回module.exports的值

esmodule
模块值：返回值的只读引用
执行顺序：异步加载，esm loader会异步解析下载的import脚本并且构建一个模块依赖图，当最终一个每块没有再import任何任东西，第一个脚本的内容才会开始执行，

commonjs 是一个运行时系统，所以会有很多运行时的特性，比如在模块中 require，改变导入模块的值等等。所以也没办法在编译时做 tree-shaking。esmodule 是一个基于编译时的模块系统，正经八儿的语言级别的模块系统，所有的导出模块的值在编译时已经确定了，

循环引用的问题，commonjs会读取到undefined的值，当读一个脚本a的时候，这个模块的信息会被记载下来，当另一个循坏脚本b再读取这个脚本a时，会直接读取该脚本a 的module.exports的值，尽管这个脚本a还没执行完，此时获取a尚未导出的值，会指示为undifined。es module不会处理循环依赖的状况，如果在脚本a中import b，b import a时会企图再次进入a，但是a已经请求过了，未解析完，被标记为fetching。（内部有个module Map，专门记录一个module当前的状态，解析完就获取他的module record），此时a没有任何导出，如果此时获取a的命名导出，会得到运行时解析错误的结果（xxx is not export）。所以es module中是不允许这样的循环依赖的。在es module中，如果不使用有副作用的代码（在顶层作用域的代码）。

个人而然我倾向于使用 esmodule 有以下原因：

1. 浏览器支持，esmodule 是 emca 标准规范，有更强的参考价值
2. 目前有关tree-shaking的功能，只能在使用esmodule的代码中奏效
3. 更好的类型检查
