
const infoState = {
  name: 'test',
  des: 'test des.',
}


/*InfoReducer，一个子reducer*/
/*注意：InfoReducer 接收的 state 是 state.info*/
function infoReducer(state, action) {
  if (!state) {
    state = infoState;
  }
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

export { infoState, infoReducer }
