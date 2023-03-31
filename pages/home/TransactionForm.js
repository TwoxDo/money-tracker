import React, { useState } from 'react'
import { useFirestore } from "../../hooks/useFirestore"

export default function TransactionForm({ uid }) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const { addData } = useFirestore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault()
        addData({ uid, name, amount })
        setName('')
        setAmount('')

    }
    return (
        <>
            {/* <h3>TransactionForm</h3> */}
            <form onSubmit={handleSubmit}>
                <label >
                    <span>Name</span>
                    <input type="text"
                        required
                        onChange={(e) => { setName(e.target.value) }}
                        value={name} />
                </label>
                <label >
                    <span>Amount($)</span>
                    <input type="number"
                        required
                        onChange={(e) => { setAmount(e.target.value) }}
                        value={amount} />
                </label>
                <button className='btn'>add</button>
            </form>
        </>
    )
}
