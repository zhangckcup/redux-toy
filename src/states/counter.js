export const counter = {
  count: 0
};

/*counterReducer, 一个子reducer*/
/*注意：counterReducer 接收的 state 是 state.counter*/
export function counterReducer(state = counter, action) {
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
