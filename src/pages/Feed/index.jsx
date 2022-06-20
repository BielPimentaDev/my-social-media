import React, {useContext, useEffect, useState} from 'react'
import Header from '../../components/Header'
import myImage from '../../assets/imgs/eu.jpg'
import { v4 } from "uuid"
import './style.css'
import Footer from '../../components/Footer'
import {auth} from '../../firebaseConfig'
import {onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { db, storage } from '../../firebaseConfig' 
import {TrashSimple, Camera} from 'phosphor-react'
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import ClipLoader from "react-spinners/ClipLoader";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';

import { async } from '@firebase/util'

export default function Feed({isAuth, setIsAuth, userAuth, setUserAuth}) {



  const [uploadImage, setUploadImage] = useState(null)
  const [imageUrl, setImageUrl] = useState([])
  const [posts, setPosts] = useState({})
  const [createPost, setCreatePost] = useState('')
  const [isLoading, setIsLoading] = useState(true)

 
  const date = new Date

  const currentDate = `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`
  const collectionRef = collection(db, "posts")
  let navigate = useNavigate()
 
  const getPosts = async ()=>{
    const data = await getDocs(collectionRef)
    setPosts(data.docs.map(doc =>({...doc.data(), id: doc.id})))
    setIsLoading(false)
  }
 
 const newPost = async ()=>{

  const imageName = uploadImage?.name + v4()
  const imageRef =  ref(storage, imageName)
  const snapshot = await uploadBytes(imageRef, uploadImage)
  const url = await getDownloadURL(snapshot.ref)

    await addDoc(collectionRef, {post: createPost, title: userAuth.displayName, username: userAuth.email, userId: userAuth.uid, userImg : userAuth.photoURL, postImage: uploadImage ? url : '', date : currentDate})
    
    setCreatePost('')
    getPosts()
 }

 const deletePost = async (id)=>{
  const userDoc = doc(db, "posts", id)
  deleteDoc(userDoc)
  getPosts()
}



  onAuthStateChanged( auth, (currentUser)=>{
    setUserAuth(currentUser)
    
 })


  
 
  useEffect(()=>{
    
    !userAuth && navigate('/')
    
    getPosts()    
    
    
  }, [])

  




  
  return (
    <>
    { !isLoading ? 
    <>
     <div className='feed'>
     <Header setIsAuth={setIsAuth} userName={userAuth?.displayName}/>
     
     <div className="postsContainer">
      

     
     <div className='textAreaContainer'>
         <section className="picSection">
           <img src={userAuth?.photoURL}/>
           <h2>Olá, {userAuth?.displayName}!</h2>
           

         </section>

         <div className='postArea '>
           
           <textarea value={createPost} placeholder='Digite aqui seu post...' className='textArea' rows="6" cols="80" onChange={(ev)=> setCreatePost(ev.target.value)}></textarea>

           <div className="fileInput">
           
            <input type='file' id='inputTag'  onChange={ev => setUploadImage(ev.target.files[0])}/></div>
           <div className="spanArea"><button onClick={newPost}>Postar</button>
           
           </div>
           

         </div>
       </div>

       




       {
        
          posts.map(post=>{
           return(

             <div className='postContainer'>
             {
               
               post.userId === userAuth.uid &&
              <div className= 'iconsSection'> <i onClick= {() => deletePost(post.id)}>
               <TrashSimple size={32} weight="fill" />
             </i> </div>
               
             }
         <section className="picSection">
           <img src={post.userImg}/>
           <h2>{post.title}</h2>
         </section>

         <div className='postArea'>
         
           <div className="pArea">
             <p>{post.post} </p>
           </div>
         {post.postImage.length > 1 &&
          <img className =  'postImage' src={post.postImage}/>
         }
           <div className="spanArea">
           <span>{post.date}</span>
             <span>{post.username}</span> 
            
           </div>


         </div>
       </div>
             )
         })
       }

       

      



     </div>

   </div>
     <Footer/>
     </>
   : 

   <div className= 'loading'>  

   <div className='loadingBox'> 

              <h1>
            <span className='miniLogo my'>my</span>
            <span className='miniLogo socialmedia'>Social Media</span>
          </h1>  
    <ClipLoader color='white' loading={isLoading}  size={80} />
    
   </div>
   </div>


    }
   
    </>
  )
}
