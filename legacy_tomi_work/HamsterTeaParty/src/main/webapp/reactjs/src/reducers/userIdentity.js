/// REDUCER
const userIdentityReducer = (state = '', action) => {
    switch(action.type) {
        case "SET_IDENTITY":
          return state + 1;
        case "GET_IDENTITY":
          return state;
        default:
          return state;
    }
}

export default userIdentityReducer;