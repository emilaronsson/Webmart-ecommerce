import {useState, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import app from '../firebase.config'
import { getAuth } from 'firebase/auth'

const useAuth = () => {

    const [currentUser, setCurrentUser] = useState({});
    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setCurrentUser(user)
            }else{
                setCurrentUser(null)
            }
        })
    })
  return {
    currentUser,
  }
}

export default useAuth