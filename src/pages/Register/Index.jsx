import React from 'react'
import './style.css'
import {auth} from '../../firebaseConfig'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import registerImg from '../../assets/imgs/registerImg.png'
import axios from 'axios'
import { useEffect } from 'react'



export default function Register() {
  
 
 
  let navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPicture, setUserPicture] = useState('')

  const createUser = async () =>{
    try{
      const user = await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      
      
      await updateProfile(auth.currentUser,{
        displayName: userName,
        photoURL : 'https://www.nicepng.com/png/detail/202-2022264_usuario-annimo-usuario-annimo-user-icon-png-transparent.png'
      }
      )
    }
    catch(error){
      console.log(error.message)
    }
    navigate('/feed')
  }

  return (
    <div clasName= 'register'>
      <header>
        <h1><span>My</span>Social Media</h1>
      </header>

      <div className= 'registerContainer'> 

      <div className='inputsContainer'>

      <div className='inputContainer'>

      <label>Nome</label>
      <input type='text' placeholder='Digite seu nome' onChange={(ev) => setUserName(ev.target.value)}></input>
      </div>

     <div className='inputContainer'>
      <label>Senha</label>
      <input type='password' placeholder='Digite sua senha' onChange={(ev) => setUserPassword(ev.target.value)}></input>
     </div>
      
<div className='inputContainer'>

      <label>Email</label>
      <input type='email' placeholder='Digite seu email' onChange={(ev) => setUserEmail(ev.target.value)}></input>
</div>
      

      <button onClick={createUser}>cadastrar</button>
      <div className="secundaryButtonSection">
        <p>Já possui uma conta? <Link to= '/'><a>Faça seu login</a></Link> </p>
        <p> © Gabriel Pimenta</p>
      </div>
      </div>

      
      <div className = 'imageSection'>
        <h2>Cadastro</h2>
        <p>Crie sua conta</p>
        <img src={registerImg}/>
        </div>
      
      </div>
      
      
    </div>
  )
}
