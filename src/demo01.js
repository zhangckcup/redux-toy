/**
 * 监听单个对象的例子
 */
// let state = {
//   count: 1,
// }

// let listeners = [];

// // 订阅
// function subscribe(listener) {
//   listeners.push(listener);
// }

// function changeCount(count) {
//   state.count = count;
//   // count change submit to every listener;
//   for (const listener of listeners) {
//     listener();
//   }
// }

// subscribe(() => {
//   console.log(state.count);
// });

// changeCount(2);
// changeCount(3);
// changeCount(4);

/**
 * 提取通用部分
 */
function createStore(initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener = () => {}) {
    listeners.push(listener);
  }

  function changeState(newState) {
    state = newState;
    for (const listener of listeners) {
      listener();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    changeState,
    getState,
  }
}

const store = createStore({
  counter: {
    count: 0,
  },
  info: {
    name: '',
    description: '',
  }
});

store.subscribe(() => {
  const state = store.getState();
  console.log(JSON.stringify(state));
});

store.changeState({
  ...store.getState(),
  info: {
    name: 'good',
    description: 'good good good',
  }
});

store.changeState({
  ...store.getState(),
  counter: {
    count: 2,
  }
});
