/// REDUCER
const userTokenReducer = (state = '', action) => {

    console.log(action.previousState);

    switch(action.type) {
        case "SET_TOKEN":
          return {
            userToken: action.token,
            loggedIn: true,
            userName: action.userName
          }
        case "REMOVE_TOKEN":
          return {
            userToken: '',
            loggedIn: false
          }
        default:
          return state;
    }
}

export default userTokenReducer;