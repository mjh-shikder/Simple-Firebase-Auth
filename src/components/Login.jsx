import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider()
const gitHubProvider = new GithubAuthProvider()
gitHubProvider.addScope('user:email');

const Login = () => {

    const [user, setUser] = useState(null)
    
const handleGoogleSignIn = () => {
        
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                setUser(result.user);
            
            })
            .catch(error => {
            console.log(error);
            
            })   
    }
    

    // github
    const handleGitHubSignIn = () => {
        signInWithPopup(auth, gitHubProvider)
            .then(result => {
                console.log(result.user);
                setUser(result.user)
                
            })
            .catch(error => {
            console.log(error);
            
        })
    }

    const handleSignOut = () => {
            
            signOut(auth)
                .then(() => {
                console.log('sign out done');
                setUser(null)
                
            }).catch(error => {
                console.log(error);
            })
        }

    return (
        <div>
            <h2>Login first</h2>
            
            
            {
                user ? <button onClick={handleSignOut}>Sign Out</button> :
                    <>
                        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
                        <button onClick={handleGitHubSignIn}>Sign In with GitHub</button>
                    </>
            }
            {user && <div>
                <h3>{user?.displayName}</h3>
                <h4>Email: {user?.email}</h4>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;