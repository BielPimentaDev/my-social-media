import React from 'react'
import {User, House, SignOut} from 'phosphor-react'
import './header.css'
import {auth} from '../firebaseConfig'
import {signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Header({setIsAuth, userName}) {
  let navigate = useNavigate()

  const logout = async ()=>{
      await signOut(auth)
      setIsAuth(false)
      localStorage.clear()
      navigate('/')
  }

  return (


    <div className='header'>
        <span> 
        <h1>
            <span className='miniLogo my'>my</span>
            <span className='miniLogo socialmedia'>Social Media</span>
          </h1>  

        </span>

            <nav>
                <i onClick={logout}><SignOut size={32} weight="fill" /></i>
                
                <span>{auth.currentUser?.displayName}</span>
                <img className='userImage' src={auth.currentUser?.photoURL}/>
            </nav>
        
    </div>


  )
}
