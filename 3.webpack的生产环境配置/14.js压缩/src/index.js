//import "@babel/polyfill"
const add = (x, y) => {
  return x + y
}
console.log(add(123, 123))

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log("定时器执行完了!")
    resolve("haha")
  }, 1000)
})
promise.then((res) => {
  console.log(res)
})
