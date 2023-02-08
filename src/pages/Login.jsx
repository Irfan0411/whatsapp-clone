import { IonIcon } from '@ionic/react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { logoWhatsapp } from "ionicons/icons";
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
    
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;
        
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (error) {
            console.log(error);
        }
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
                            Login
                            <div className="arrow-wrapper">
                                <div className="arrow"></div>
                            </div>
                        </button> 
                    </form>
                    <br/>
                    <p className="link">You don't have an account? <Link to="/register">Register</Link> </p>                   
                </div>
            </div>
        </div>
    )
}

export default Login