import { projectFirestore } from "../firebase/config";
import {  useState, useEffect } from "react";
import { useRef } from "react";


export const useCollections = ( collection,_query,_orderBy)=>{

const orderBy =  useRef(_orderBy).current
    const query = useRef(_query).current
    const [data,setData]= useState(null)

    const [error,setError]= useState(null)


useEffect(()=>{

let info = projectFirestore.collection(collection)

if (orderBy){
info = info.orderBy(...orderBy)

}
if(query){
    info = info.where(...query)
}


const unSub= info.onSnapshot((snapshot)=>{

    let results=[]

snapshot.docs.forEach(doc => {

results.push({...doc.data(),id : doc.id})
})

setData(results)

setError(null)

},(error)=>{
    console.log(error)
    setError("couldent fetch the data")
})
return unSub

},[collection,query,orderBy])
return{data ,error}
}