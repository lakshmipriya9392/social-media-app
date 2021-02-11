import React, { useContext} from 'react'
import SignIn from '../../Components/signIn'
import { UserContext } from '../../contexts/user'
import './style.css'
export default function Navbar() {

const [user, setUser] = useContext(UserContext).user;

    return (
        <div className = 'navbar'>
            <p className = "pentagram">Pentagram</p>
           {user ? <img className = "navbar_photo" src = {user.photoURL} alt = "profilePic" /> :  <SignIn />}
        </div>
    )
}
