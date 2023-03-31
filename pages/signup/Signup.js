import React, { useState } from 'react'
import styles from './signup.module.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayname, setDisplayName] = useState('')
  const { signup, error, isPendening } = useSignup()


  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayname)

  }

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <label >
        <span className='reg'>Display name : </span>
        <input onChange={(e) => { setDisplayName(e.target.value) }}
          type="text"
          value={displayname}
        />

      </label>

      <label >
        <span >Email: </span>
        <input onChange={(e) => { setEmail(e.target.value) }}
          type="email"
          value={email}
        />

      </label>
      <label >
        <span className='reg'>Password: </span>
        <input type="password"
          onChange={(e) => { setPassword(e.target.value) }}
          value={password} />

      </label>
      {!isPendening && <button className='btnl'>Signup</button>}
      {isPendening && <button className='btnl'>loading</button>}
      {error && <p>{error}</p>}

    </form>
  )
}