import '../css/iconfont.css'
import '../css/index.css'
import '../css/index.less'
import print from './print'
print()
console.log('index.js文件被重新加载了!')
function add(x, y) {
  return x + y
}
console.log(add(828, 99))

if (module.hot) {
  // 如果module.hot为true，说明开启了HMR功能 ---> 让HMR功能代码生效
  module.hot.accept('./print.js', function () {
    //方法会监听，print.js文件的变化，一旦发生变化，其他默认不会重新打包构建，会执行后面的回调函数
    print()
  })
}
