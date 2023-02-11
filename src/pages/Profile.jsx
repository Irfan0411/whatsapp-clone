import { IonIcon } from '@ionic/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { arrowBack, pencil } from "ionicons/icons";
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import { db, storage } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { ChatListContext } from '../context/ChatListContext';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const { chats } = useContext(ChatListContext);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [photoProfile, setPhotoProfile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHide, setIsHide] = useState(true);
  const [displayName, setDisplayName] = useState("");

  const changeName = async (e)=>{
    setIsLoading(true);
    await updateProfile(currentUser, {
      displayName
    });
    await updateDoc(doc(db, "user", currentUser.uid),{
      displayName
    });
    Object.entries(chats)?.forEach(([key, value])=>{
      const chatId = currentUser.uid > value.userInfo.uid 
                      ? currentUser.uid + value.userInfo.uid
                      : value.userInfo.uid + currentUser.uid;
      updateDoc(doc(db, "userChats", value.userInfo.uid),{
        [chatId + ".userInfo.displayName"]: displayName
      })
    })
    setIsLoading(false);
    setIsHide(true);
  }

  useEffect(() => {
    const handleChange = () => {
      if (photo !== null) {
          try {
          setIsLoading(true);
          const date = new Date().getTime();
          const storageRef = ref(storage, currentUser.displayName + date);
          uploadBytesResumable(storageRef, photo)
            .then(() => {
              getDownloadURL(storageRef)
                .then(async (downloadUrl) => {
                  try {
                    await updateProfile(currentUser, {
                      photoURL: downloadUrl
                    })
                    await updateDoc(doc(db, "user", currentUser.uid), {
                      photoURL: downloadUrl
                    })
                    Object.entries(chats)?.forEach(([key, value])=>{
                      const chatId = currentUser.uid > value.userInfo.uid 
                                      ? currentUser.uid + value.userInfo.uid
                                      : value.userInfo.uid + currentUser.uid;
                      updateDoc(doc(db, "userChats", value.userInfo.uid),{
                        [chatId + ".userInfo.photoURL"]: downloadUrl
                      })
                    })                                
                    setPhotoProfile(currentUser.photoURL);
                    setIsLoading(false);
                  } catch (error) {
                    console.log(error)
                  }
                })
            })
        } catch (error) {
          console.log(error)
        }

      }
    }
  
    handleChange();
    // eslint-disable-next-line
  }, [photo])

  useEffect(() => {
    setPhotoProfile(currentUser.photoURL);
    setDisplayName(currentUser.displayName);    
  }, [currentUser])

  return (
    <div className="container">
      <div className="wrapper">
        <div className="wrap profile">
          <p className="back" onClick={() => navigate("/")}><IonIcon icon={arrowBack} /> Profile</p>
          <div className="imgbox">
            <img src={photoProfile} alt="" />
            {isLoading && (<div className="loader"></div>)}
            <label htmlFor="changePhoto">
              <div className="change">change</div>
            </label>
            <input type="file" id="changePhoto" onChange={(e) => setPhoto(e.target.files[0])} />
          </div>
          <div className="data">
            <p>Name</p>
            <span>{displayName} <IonIcon className='handleChangeName' icon={pencil} onClick={()=>setIsHide(false)} /></span>
            <br />
            <p>Email</p>
            <span>{currentUser.email}</span>
          </div>
        </div>
      </div>
      <div className={`changeName ${isHide && 'hide'}`}>
        <span className="close" onClick={() =>setIsHide(true)}><IonIcon icon={arrowBack} /> Change Name</span>
        <br /> <br />
        <p>Name</p>
        <input type="text" className="inputName" value={displayName || ''}  onChange={(e)=>setDisplayName(e.target.value)} />
        {isLoading && (<div className="loader"></div>)}
        <button onClick={changeName}>simpan</button>
      </div>
    </div>
  )
}

export default Profile