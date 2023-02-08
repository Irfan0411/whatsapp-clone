import { IonIcon } from '@ionic/react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { logoWhatsapp } from "ionicons/icons";
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';

const Register = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            updateProfile(userCredential.user, {
                displayName,
                photoURL: "https://firebasestorage.googleapis.com/v0/b/chat-3191a.appspot.com/o/pp-wa-kosong-biasa.webp?alt=media&token=9caa9d07-309f-4d94-9499-1534a1380205"
            })
            setDoc(doc(db, "user", userCredential.user.uid), {
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName,
                email: userCredential.user.email,
                photoURL: "https://firebasestorage.googleapis.com/v0/b/chat-3191a.appspot.com/o/pp-wa-kosong-biasa.webp?alt=media&token=9caa9d07-309f-4d94-9499-1534a1380205"
            })
            setDoc(doc(db, "userChats", userCredential.user.uid),{})
        })
        .catch((err)=>console.log(err.message))

        navigate("/")
    }
    return (
        <div className="container">
            <div className="wrapper">
                <div className="wrap">
                    <IonIcon icon={logoWhatsapp} />
                    <h3>WhatsApp Clone</h3>
                    <span>Register</span>
                    <br/><br/>
                    <form onSubmit={handleSubmit}>
                        <div className="wave-group">
                            <input required type="text" className="input" />
                            <span className="bar"></span>
                            <label className="label">
                                <span className="label-char" style={{ "--index": 0 }}>N</span>
                                <span className="label-char" style={{ "--index": 1 }}>a</span>
                                <span className="label-char" style={{ "--index": 3 }}>m</span>
                                <span className="label-char" style={{ "--index": 4 }}>e</span>
                            </label>
                        </div>
                        <br/>
                        <div className="wave-group">
                            <input required type="text" className="input" />
                            <span className="bar"></span>
                            <label className="label">
                                <span className="label-char" style={{ "--index": 0 }}>E</span>
                                <span className="label-char" style={{ "--index": 1 }}>m</span>
                                <span className="label-char" style={{ "--index": 3 }}>a</span>
                                <span className="label-char" style={{ "--index": 4 }}>i</span>
                                <span className="label-char" style={{ "--index": 5 }}>l</span>
                            </label>
                        </div>
                        <br/>
                        <div className="wave-group">
                            <input required type="password" className="input" />
                            <span className="bar"></span>
                            <label className="label">
                                <span className="label-char" style={{ "--index": 0 }}>P</span>
                                <span className="label-char" style={{ "--index": 1 }}>a</span>
                                <span className="label-char" style={{ "--index": 3 }}>s</span>
                                <span className="label-char" style={{ "--index": 4 }}>s</span>
                                <span className="label-char" style={{ "--index": 6 }}>w</span>
                                <span className="label-char" style={{ "--index": 7 }}>o</span>
                                <span className="label-char" style={{ "--index": 8 }}>r</span>
                                <span className="label-char" style={{ "--index": 9 }}>d</span>
                            </label>
                        </div>
                        <br/>
                        <button type='submit' className="login-logout">
                            Register
                            <div className="arrow-wrapper">
                                <div className="arrow"></div>
                            </div>
                        </button> 
                    </form>
                    <br/>
                    <p className="link">You do have an account? <Link to="/login">Login</Link></p>                   
                </div>
            </div>
        </div>
    )
}

export default Register