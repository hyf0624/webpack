import '../css/index.css'
import { mul } from './test.js'

function sum(...args) {
  return args.reduce((p, c) => p + c, 0)
}

console.log(sum(1, 2, 3, 4, 5, 6, 7))
mul(1, 2)

//注册serviceworker
// 处理兼容性问题
if ('serviceworker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceworker
      .register('/service-worker.js')
      .then(() => {
        console.log('serviceworker注册成功了')
      })
      .catch(() => {
        console.log('serviceworker注册失败了')
      })
  })
}
