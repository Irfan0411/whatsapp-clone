import React, { useContext, useState } from 'react';
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { HideContext } from '../context/HideContext';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


const AddChat = () => {
    const {hide, dispatch} = useContext(HideContext);
    const {data} = useContext(ChatContext);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const {currentUser} = useContext(AuthContext);

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }
    const handleSearch = async () => {
        const q = query(
            collection(db, "user"),
            where("displayName", "==", username)
        )
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.empty ? setUser(null) : querySnapshot.forEach((doc) => setUser(doc.data()));
        } catch (error) {
            console.log(error);
        }
    }
    const handleSelect = async ()=>{
        const combinedId = currentUser.uid > user.uid
                            ? currentUser.uid + user.uid
                            : user.uid + currentUser.uid;
        
        const res = await getDoc(doc(db, "chats", combinedId))
        //cek apakah chat sudah ada
        if(!res.exists()){
            //buat chat di database
            await setDoc(doc(db, "chats", combinedId), {messages: []})

            //buat info chat
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [combinedId+".userInfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                },
                [combinedId+".date"]: serverTimestamp()
            })

            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId+".userInfo"]: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                },
                [combinedId+".date"]: serverTimestamp()
            })
        }
        setUser(null);
        dispatch("HIDE")

    }
    return (
        <div className={`addChat ${hide.hideAdd ? 'hide' : ''} ${data.hideChat ? '' : 'none'}`}>
            <span className="close" onClick={()=>dispatch("HIDE")}><IonIcon icon={arrowBack} /> Add Chat</span>
            <br /> <br />
            <div className="searchForm">
                <div className="wave-group">
                    <input required type="text"
                        className="input"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        onKeyDown={handleKey} />
                    <span className="bar"></span>
                    <label className="label">
                        <span className="label-char" style={{ "--index": 0 }}>S</span>
                        <span className="label-char" style={{ "--index": 1 }}>e</span>
                        <span className="label-char" style={{ "--index": 3 }}>a</span>
                        <span className="label-char" style={{ "--index": 4 }}>r</span>
                        <span className="label-char" style={{ "--index": 5 }}>c</span>
                        <span className="label-char" style={{ "--index": 6 }}>h</span>
                    </label>
                </div>
            </div>
            <div className="chatlist">
                {user && (
                    <div className="block" onClick={handleSelect}>
                        <div className="imgbox">
                            <img src={user.photoURL} alt="profile" />
                        </div>
                        <div className="details">
                            <div className="listHead">
                                <h4>{user.displayName}</h4>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddChat