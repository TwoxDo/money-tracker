import { projectFirestore, timestamp } from "../firebase/config";
import { useReducer, useState, useEffect } from "react";

let initState = {
    error: null,
    document: null,
    ispending: false,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {

        case 'IS_PENDING':
            return { error: null, document: false, ispending: true, success: false }
        case 'ADD_DOC':
            return { error: null, document: action.payload, ispending: false, success: true }
            case 'DELETED_DOC':
                return { isPending: false, document: null, success: true, error: null }
        case 'ERR':
            return { error: action.payload, document: false, ispending: false, success: false }
        default:
            return state

    }


}
export const useFirestore = (collection) => {

    const [state, dispatch] = useReducer(firestoreReducer, initState)
    const [isCanc, setIsCanc] = useState(false)

    const info = projectFirestore.collection(collection)


    const dispatchIsNotCanc = (action) => {

        if (!isCanc) {
            dispatch(action)
        }

    }

    const addData = async (doc) => {

        dispatch({ type: "IS_PENDING" })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDoc = await info.add({...doc, createdAt})
            dispatchIsNotCanc({ type: "ADD_DOC", payload: addedDoc })

        } catch (error) {
            dispatchIsNotCanc({ type: "ERR", payload: error.message })
        }

    }


    const deleteDoc = async(id) => {
        dispatch({ type: 'IS_PENDING' })

        try {
          await info.doc(id).delete()
          dispatchIsNotCanc({ type: 'DELETED_DOC ' })
        }
        catch (err) {
            dispatchIsNotCanc({ type: 'ERROR', payload: 'could not delete' })
        }
    }

    useEffect(() => {
        return setIsCanc(true)
    }, [])



    return { state, addData, deleteDoc }


}


