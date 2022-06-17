import React, {useContext, useEffect, useState} from 'react'
import Header from '../../components/Header'
import myImage from '../../assets/imgs/eu.jpg'
import './style.css'
import Footer from '../../components/Footer'
import {auth} from '../../firebaseConfig'
import {onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { db } from '../../firebaseConfig' 
import {TrashSimple} from 'phosphor-react'
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import ClipLoader from "react-spinners/ClipLoader";

export default function Feed({isAuth, setIsAuth, userAuth, setUserAuth}) {

  
  const [posts, setPosts] = useState({})
  const [createPost, setCreatePost] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const collectionRef = collection(db, "posts")
  let navigate = useNavigate()
 
  const getPosts = async ()=>{
    const data = await getDocs(collectionRef)
    setPosts(data.docs.map(doc =>({...doc.data(), id: doc.id})))
    setIsLoading(false)
  }
 
 const newPost = async ()=>{
    await addDoc(collectionRef, {post: createPost, title: userAuth.displayName, username: userAuth.email, userId: userAuth.uid, userImg : userAuth.photoURL})
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
     <Header setIsAuth={setIsAuth}/>
     
     <div className="postsContainer">
       

     
     <div className='textAreaContainer'>
         <section className="picSection">
           <img src={userAuth?.photoURL}/>
           <h2>Olá, {userAuth?.displayName}!</h2>
           

         </section>

         <div className='postArea '>
           
           <textarea placeholder='Digite aqui seu post...' className='textArea' rows="6" cols="80" onChange={(ev)=> setCreatePost(ev.target.value)}></textarea>

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
           <div className="spanArea">
           <span>15/06/2022</span>
             <span>{post.username}</span> 
            
           </div>


         </div>
       </div>
             )
         })
       }

       

      



     </div>

     <Footer/>
   </div>
     </>
   : 
   <div className= 'loading'>     
   <ClipLoader color='#2C99FE' loading={isLoading}  size={150} />
   </div>

    }
   
    </>
  )
}
