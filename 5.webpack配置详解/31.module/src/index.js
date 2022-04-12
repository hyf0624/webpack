//import add from './add'
import count from './count'

console.log(count(1000000000, 1))

import('./add').then((add) => {
  console.log(add(555, 8848846))
})
console.log('index.js文件被加载了')

