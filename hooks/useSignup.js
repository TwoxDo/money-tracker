import { useState , useEffect} from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = ()=>{
    const [isCancelled, setIsCancelled] = useState(false)

const [error,setError]=useState(null)
const [isPending,setIsPending]= useState(false)
const {dispatch} = useAuthContext()

const signup = async (email,password,displayName)=>{
setIsPending(true)
setError(null) 
try {
const res= await projectAuth.createUserWithEmailAndPassword(email,password)


if(!res){
  throw new Error('could not compelte the signup')
}
await res.user.updateProfile({displayName})

dispatch({type:"LOGIN",payload: res.user})





if (!isCancelled) {
    setIsPending(false)
    setError(null)
  }
} 
catch(err) {
  if (!isCancelled) {
    setError(err.message)
    setIsPending(false)
  }
}
}

useEffect(() => {
return () => setIsCancelled(true)
}, [])



return{ error,isPending,signup}


}