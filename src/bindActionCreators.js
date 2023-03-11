/**
 * 通过闭包，把 dispatch 和 actionCreator 隐藏起来，让其他地方感知不到 redux 的存在。
 * 通过调用函数的方式调用 dispatch:
 * const increment = () => ({ type: 'INCREMENT' });
 * const action = bindActionCreators({ increment, setName }, store.dispatch);
 * actions.increment(); // store.dispatch({type: 'increment'});
 */

// actionCreators 必须是 function 或者 object
export function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  }
}

export default function bindActionCreators(actionCreators, dispatch) {
  // 单个的情况可直接传函数
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  // 多个的情况必须是 value 为函数的对象
  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error();
  }

  // 存储绑定了 Action 后的函数
  const boundActionCreators = {};

  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}
