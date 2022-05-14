// 如果不使用babel进行转化，这些代码将会本来的ES6代码格式进行打包，在低版本的浏览器中无法运行
// 使用babel会打包为低版本的ES5语法，可以在更多浏览器运行
function getString(){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('hello promise');
    })
  })
};

async function helloPromise(){
  let string = await getString();
  console.log(string);
}

export default helloPromise;