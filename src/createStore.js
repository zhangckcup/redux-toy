/**
 * 有计划的状态管理器
 * 为了约束状态的修改
 * 1. 制定 state 修改计划，告诉store，我的修改计划是什么。
 * 2. changeState时按照计划修改
 */
export default function createStore(reducer, initState, rewriteCreateStoreFn) {
  if (rewriteCreateStoreFn) {
    const newCreateStore = rewriteCreateStoreFn(createStore);
    return newCreateStore(reducer, initState);
  }
  // js 假装也能重载 createStore(reducer, rewriteCreateStoreFn)
  if (typeof initState === 'function') {
    const initState = rewriteCreateStoreFn(createStore);
    return newCreateStore(reducer, initState);
  }
  let state = initState;
  let listeners = [];

  function subscribe(listener = () => {}) {
    listeners.push(listener);
    // 支持退订
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (const listener of listeners) {
      listener();
    }
  }

  function getState() {
    return state;
  }

  function replaceReducer(nextReducer) {
    reducer = nextReducer;
    dispatch({ type: Symbol() });
  }

  dispatch({ type: Symbol() })

  return {
    subscribe,
    dispatch,
    getState,
    replaceReducer,
  }
}
