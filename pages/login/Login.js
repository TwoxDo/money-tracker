import React, { useState } from 'react'

import { useLogin } from '../../hooks/useLogin'
import styles from './login.module.css'
export default function Login() {
const [email, setEmail]= useState('')
const [password, setPassword]= useState('')
const {Login,error,isPendening}= useLogin()

const handleSubmit = (e)=>{
    e.preventDefault()
Login(email,password)
}

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
<h2>Login</h2>
<label >
    <span className='reg'>Email</span>
    <input onChange={(e)=>{setEmail(e.target.value)}} 
    type="email" 
    value={email}
    />
    
</label>
<label >
    <span className='reg'>Password</span>
    <input type="password"  
    onChange={(e)=>{setPassword(e.target.value)}}
   value={password} />

</label>
{!isPendening && <button className='btnl'>login</button>}
  {isPendening &&  <button className='btnl'>loading</button>}
  {error&& <p>{error}</p>}
</form>
  )
}
