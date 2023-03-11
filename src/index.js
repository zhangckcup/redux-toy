import createStore from "./createStore.js";
import combineReducers from "./combineReducers.js";
import { counter, counterReducer } from "./states/counter.js";
import { infoState, infoReducer } from "./states/info.js";

// const initState = {
//   counter,
//   info: infoState,
// };

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

console.dir(store.getState());
