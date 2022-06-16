import {addDoc, doc, deleteDoc} from 'firebase/firestore'
import {db} from '../../firebaseConfig'


export const createPost = async(databaseRef, newData)=>{
    addDoc(databaseRef, newData)
}

export const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    deleteDoc(postDoc)
}