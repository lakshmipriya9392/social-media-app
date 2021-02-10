import React, { useContext } from 'react'
import { UserContext } from '../../contexts/user';
import { googleSignIn } from '../../services/auth';
import './style.css';

export default function SignIn() {

    const [,setUser] = useContext(UserContext).user;

    const signInButton = async () => {
        let userbySignIn = await googleSignIn();
        if(userbySignIn) setUser(userbySignIn);
    }

    return (
        <div className = "signIn" onClick = {signInButton}>
            <p>Sign in with Google</p>
        </div>
    )
}
