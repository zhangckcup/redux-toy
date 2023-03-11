/**
 * 最佳实践 之 纯函数
 * 1。 相同的输入，一定会得到相同的输出；
 * 2. 不会有 “触发事件”，更改输入参数，依赖外部参数，打印 log 等等副作用。
 * reducer 必须为纯函数
 */

/*不是纯函数，因为同样的输入，输出结果不一致*/
function a( count ){
  return count + Math.random();
}

/*不是纯函数，因为外部的 arr 被修改了*/
function b( arr ){
   return arr.push(1);
}
let arr = [1, 2, 3];
b(arr);
console.log(arr); //[1, 2, 3, 1]

/*不是纯函数，以为依赖了外部的 x*/
let x = 1;
function c( count ){
   return count + x;
}