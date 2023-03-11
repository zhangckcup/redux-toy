/**
 * state 的拆分和合并
 * 在 reducer 中加入初始化部分后，不传入 initState 也可初始化
 */
import createStore from "./createStore.js";
import combineReducers from "./combineReducers.js";
import { counterReducer } from "./states/counter.js";
import { infoReducer } from "./states/info.js";

const reducer = combineReducers({
  counter: counterReducer,
  info: infoReducer
});

const store = createStore(reducer);

store.subscribe(() => {
  const state = store.getState();
  console.log(JSON.stringify(state));
})

store.dispatch({
  type: 'SET_NAME',
  name: 'good'
});

store.dispatch({
  type: 'SET_DES',
  des: 'babababababababab'
});

store.dispatch({
  type: 'INCREMENT',
});
