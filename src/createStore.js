/**
 * 有计划的状态管理器
 * 为了约束状态的修改
 * 1. 制定 state 修改计划，告诉store，我的修改计划是什么。
 * 2. changeState时按照计划修改
 */
export default function createStore(reducer, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener = () => {}) {
    listeners.push(listener);
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

  dispatch({ type: Symbol() })

  return {
    subscribe,
    dispatch,
    getState,
  }
}
