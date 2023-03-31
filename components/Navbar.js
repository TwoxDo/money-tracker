import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    return (
        <div className='navbar'>
            <nav className={styles.navbar}>

                <ul >
                    <li className={styles.title}>
                        <Link to='/'>
                            Where did I spend my money
                        </Link>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <Link to='/signup'>
                                    Signup
                                </Link>
                            </li>
                            <li>
                                <Link to='/login'>
                                    login
                                </Link>
                            </li>
                        </>
                    )}

                    {user && (
                        <>
                            <li >
                                hello,  {user.displayName}</li>
                            <li >
                                <button className='btn' onClick={logout}>Logout</button>
                            </li>

                        </>
                    )}
                </ul>
            </nav>
        </div>
    )
}
