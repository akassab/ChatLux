import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

// on page load -> we assume we have no user state
const initialState = {
  user: null
}
// if a jwt token exists and is not expired -> set user state accordingly
if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  }
  else {
    initialState.user = decodedToken;
  }
}

// https://reactjs.org/docs/context.html for info about creatContext and why its used
// -> essentially allows use to pass info easier than traditional single threaded props
// -> Using context, we can avoid passing props through intermediate elements
// -> good for authenticated users, themes, and preferred languages
const AuthContext = createContext({
  user: null,
  login: (userData) => {}, // just type, can be omitted
  logout: () => {}, // just type, can be omitted
});


// Pattern of redux
// - receives action and payload and then determines what to do with those two depending on functionaility of application

function authReducer(state, action) {
  console.log('state and action in authreduer are', state,action)
  switch (action.type) {
    case "LOGIN":
      return {
        // all keys from before (user, login, and logout, BUT override user of course
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        // all keys from before (user, login, and logout, BUT override user of course by clearing user
        ...state,
        user: null,
      };
    default:
      return state;
  }
}


function AuthProvider(props) {
  console.log('props are ', props)
  // https://redux.js.org/basics/reducers for info about usereducers and why its used
  // -> Accepts a reducer of type (state, action) => newState
  console.log('initialstate is',initialState);
  // user reducer hook
  // ->
  const [state, dispatch] = useReducer(authReducer, initialState);
  // Now that we have a dispatch we can use it to dispatch any action and then attatch to it a type and payload
  //  and when that is dispatched, authReducer will listen to it and then perform any action according to that dispatch action

  console.log('state is',state);
  console.log('dispatch is',dispatch);
  // now write login and logoit function so we can pass them down to our component tree
  function login(userData) {
    // store the token
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      // payload contains the token
      payload: userData,
    });
  }

  function logout() {
    // remove the token
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  // return the provider so we can use it somewhere else
  //
  return (
    <AuthContext.Provider
        // javascript object wrap in 2 curly braces
        //
      value={{ user: state.user, login, logout }}
      //

      {...props}
    />
  );
}

// export authContext, which is going to be used from other components to access context
// Auth provider, which will be use in the app to wrap to the whole application so that it will have access
//  to this provider to these function from the context

// When we login we want to call the login function (which will dispatch type "LOGIN" with data which will change
// the data inside AuthContext and set user to user details we have so app will know we are logged in
export { AuthContext, AuthProvider };
