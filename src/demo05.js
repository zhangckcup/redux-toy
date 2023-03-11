import createStore from "./createStore.js";
import combineReducers from "./combineReducers.js";
import applyMiddleware, { exceptionMiddleware, loggerMiddleware } from "./middleware.js";
import { infoReducer, infoState } from "./states/info.js";
import { counterReducer, counter } from "./states/counter.js";
import bindActionCreators from "./bindActionCreators.js";

const reducer = combineReducers({
  counter: counterReducer,
  info: infoReducer
});

const initState = {
  info: infoState,
  counter,
}

const rewriteCSFn = applyMiddleware(exceptionMiddleware);

const store = createStore(reducer, initState, rewriteCSFn);

const uns = store.subscribe(() => {
  console.dir(store.getState());
})

// store.dispatch({
//   type: 'INCREMENT'
// });

// uns();

// store.dispatch({
//   type: 'INCREMENT'
// });

const increment = () => ({ type: 'INCREMENT' });
const action = bindActionCreators({ increment }, store.dispatch);
action.increment(); // store.dispatch({type: 'increment'});
