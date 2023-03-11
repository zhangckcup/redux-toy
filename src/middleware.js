//
/**
 * 中间件
 * 中间件是对 dispatch 的扩展，或者说重写，增强 dispatch 的功能
 */
// const reducer = combineReducers({
//   info: infoReducer,
//   counter: counterReducer,
// })

// const store = createStore(reducer);
// const next = store.dispatch;

// store.dispatch = (action) => {
//   console.log(action);
//   console.log(store.getState());
//   next(action);
//   console.log(store.getState());
// }

export const loggerMiddleware = (store) => (next) => (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
}

export const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (err) {
    console.error('错误报告: ', err)
  }
}

// const logger = loggerMiddleware(store);
// const exception = exceptionMiddleware(store);

// store.dispatch = exception(logger(next));

/**
 * HOPE:
 * const newCreateStore = applyMiddleware(...middleware);
 * const store = newCreateStore(reducer);
 */

export default function applyMiddleware(...middlewares) {
  return function rewriteCreateStoreFunc(oldCreateStoreFn) {
    return function newCreateStore(reducer, initState) {
      const store = oldCreateStoreFn(reducer, initState);

      // 只允许中间件拿到state
      const simpleStore = { getState: store.getState }
      const chain = middlewares.map(mid => mid(store));
      let dispatch = store.dispatch;

      chain.reverse().map(mid => {
        dispatch = mid(dispatch);
      });

      store.dispatch = dispatch;
      return store;
    }
  }
}

// store.dispatch({
//   type: 'INCREMENT'
// })


