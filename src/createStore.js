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

  return {
    subscribe,
    dispatch,
    getState,
  }
}

// function plan(state, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return {
//         ...state,
//         count: state.count + 1
//       }
//     case 'DECREMENT':
//       return {
//         ...state,
//         count: state.count -1
//       }
//     default:
//       return state;
//   }
// }

// const store = createStore(plan, {
//   count: 0,
// });

// store.subscribe(() => {
//   const state = store.getState();
//   console.log(state.count);
// });

// store.changeState({
//   type: 'INCREMENT'
// });

// store.changeState({
//   count: 'abs'
// });
