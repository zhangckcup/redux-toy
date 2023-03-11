/**
 * reducer 的拆分与合并
 * 实现 combineReducers(reducers) => reducer
 */
export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    const nextState = {};

    for (const key in reducers) {
      const reducer = reducers[key];
      const preStateForKey = state[key];
      const nextStateForKey = reducer(preStateForKey, action);

      nextState[key] = nextStateForKey;
    }

    return nextState;
  }
}
