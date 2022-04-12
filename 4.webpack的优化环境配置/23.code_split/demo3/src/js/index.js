function sum(...args) {
  return args.reduce((p, c) => p + c, 0)
}

console.log(sum(1, 2, 3, 4, 5, 6, 7))

/**
 * 通过js代码让某个文件被单独打包成一个chunk
 * import 动态导入语法，能将某个文件单独打包
 */
import(/*webpackChunkName: 'test' */ './test')
  .then(({ mul, sum }) => {
    console.log(mul(2, 5))
    console.log(sum(99, 88))
    console.log('文件加载成功')
  })
  .catch(() => {
    console.log('文件加载失败')
  })
