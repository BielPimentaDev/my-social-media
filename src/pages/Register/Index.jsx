import React from 'react'
import './style.css'
import {auth, storage} from '../../firebaseConfig'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import registerImg from '../../assets/imgs/registerImg.png'
import {uploadBytes, ref, getDownloadURL} from 'firebase/storage'
import axios from 'axios'
import { useEffect } from 'react'
import {v4} from 'uuid'



export default function Register() {
  
 
 
  let navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState(null)
  const [uploadImage, setUploadImage] = useState(null)
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  


  
  
  


  const createUser = async () =>{
    
    
    try{
      const user = await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      
      

        const imageName = uploadImage?.name + v4()
        const imageRef =  ref(storage, imageName)
        const snapshot = await uploadBytes(imageRef, uploadImage)
        const url = await getDownloadURL(snapshot.ref)
        
      
        await updateProfile(auth.currentUser,{

          displayName: userName.capitalize(),
          photoURL : uploadImage ? url : 'https://dmhxz00kguanp.cloudfront.net/fotos/129177/papel-de-parede-spots-fundo-cinza-1m-x-1-70m-287214.jpg'
        }
        )
        navigate('/feed')
      
    }
    catch(error){
      console.log(error.message)
      alert('Erro no cadastro!')
    }
    
  }

  return (
    <div className= 'register'>
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

<div className='inputContainer'>

      <label>Foto</label>
</div>
      <input type='file' onChange={(ev) => setUploadImage(ev.target.files[0])}></input>

      

      <button onClick={createUser}>cadastrar</button>
      <div className="secundaryButtonSection">
        <p>Já possui uma conta? <Link to= '/'>Faça seu login</Link> </p>
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
