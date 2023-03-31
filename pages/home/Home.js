import React from 'react'
import styles from "./home.module.css"
import TransactionForm from "./TransactionForm.js"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useCollections } from '../../hooks/useCollections'
import TransactionList from "./TransactionList"



export default function Home() {
  const { user } = useAuthContext()
  const { data, error } = useCollections('transactions', ["uid", "==", user.uid], ['createdAt', 'desc'])


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}

        {data && <TransactionList transactions={data} />}
      </div>

      <div className={styles.sidebar}>

        <TransactionForm uid={user.uid} />
      </div>

    </div>
  )
}
