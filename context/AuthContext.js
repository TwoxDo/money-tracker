import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext()
export const funcRed = (state,action)=>{
    switch(action.type){
case "LOGIN":
    return{ ...state, user: action.payload}

    case "LOGOUT":
    return{ ...state, user:null}

    case "AUTH_CHECK":
    return{ ...state, user: action.payload,authcheck:true}

  default:
    return state
    }
}

export const AuthContextProvider = ({children}) =>  {

 
const [state, dispatch] = useReducer(funcRed,{
    user:null,
    authcheck:false
})
 
useEffect(() => {
  
const check = projectAuth.onAuthStateChanged((user)=>{
 dispatch({type:"AUTH_CHECK", payload:user})
  check()
})
}, [])


return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}