import createStore from "./createStore.js";
import combineReducers from "./combineReducers.js";

const initState = {
  counter: {
    count: 0
  },
  info: {
    name: 'test',
    des: 'test des.'
  }
};

/*counterReducer, 一个子reducer*/
/*注意：counterReducer 接收的 state 是 state.counter*/
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}

/*InfoReducer，一个子reducer*/
/*注意：InfoReducer 接收的 state 是 state.info*/
function InfoReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DES':
      return {
        ...state,
        des: action.des
      }
    default:
      return state;
  }
}

const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});

const store = createStore(reducer, initState);

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
