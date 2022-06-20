import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import loginImage from '../../assets/imgs/loginImage.webp'
import './style.css'
import {auth, storage} from '../../firebaseConfig'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import AppContext from '../../context/AppContext'
import { signInWithEmailAndPassword } from 'firebase/auth'




export default function Home({isAuth, userAuth, setUserAuth, setIsAuth}) {
  let navigate = useNavigate()
  useEffect(()=>{
    
    
  }, [])

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  
  
   const login = async ()=>{
    try {await signInWithEmailAndPassword(
      auth, loginEmail, loginPassword
    )
    setUserAuth(auth)
    setIsAuth(true)
    localStorage.setItem('isAuth', true)
    console.log(isAuth)
    navigate('/feed')    
    
  }
    catch(error){
      console.log(error.message)
      alert('Usuário não cadastrado')
    }
  }

  const onSubmit = (ev) => {
    ev.preventDefault()}
      
  

  return (
    
    <div className='loginContainer'>
      
      <section className='logoSection'>
        <div className='logo'>
          <h1>
            <span className='myLogo'>my</span>
            <span className='socialMediaLogo'>Social Media</span>
          </h1>          
          <img className='loginImg' src={loginImage} ></img>
        </div>
      </section>


      <section className='loginSection'> 
          

        <div className="welcomeSection">
          <h1>BEM-VINDO</h1>
          <p>Faça seu login</p>
        </div>
        


      <form onSubmit={onSubmit}>

        <div className="inputContainer">
          <label>E-mail</label>
          <input type="text" placeholder='Digite seu e-mail...' onChange={ev => setLoginEmail(ev.target.value)}></input>
        </div>

        <div className="inputContainer">
          <label>Senha</label>
          <input type={showPassword ? 'text' : 'password'} placeholder='Digite sua senha...'  onChange={ev => setLoginPassword(ev.target.value)}></input>
        </div>

        <div className="checkBoxContainer">
          <input type="checkbox" onClick={() => setShowPassword(!showPassword)}></input><p>Mostrar senha</p>
          </div>

        <button onClick={() => login()} className='submitButton' >ENTRAR</button>
        <p>Não possui uma conta? <Link to= '/register'>Cadastre-se</Link> </p>
        <p> © Gabriel Pimenta</p>
      </form>
      </section>

    </div>
  )
}
