# 代码分离

## 代码分离是webpack最引人注目的特性之一，此能够特性代码分离到不同的bundle中，可以按需加载或并行加载这些文件。代码分离可以用于获取更小的bundle，以及控制资源加载优先级，影响加载时间

## 常见的代码分离方法有三种
### 入口起点：使用entry配置，手动分离代码
### 防止重复：使用entry dependencies或者splitChunkPlugin 去重和分离代码
### 动态导入：通过模块的内联函数调用来分离代码 ECMAScript提案的import()，webpack遗留功能，特定的require.ensure