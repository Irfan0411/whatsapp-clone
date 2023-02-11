import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatListContext } from '../context/ChatListContext';
import { db } from '../firebase';
import BlockChat from './BlockChat';

const BoxChats = () => {
  const {currentUser} = useContext(AuthContext);
  const [chats, setChats] = useState({});
  const {dispatch} = useContext(ChatListContext);
  useEffect(()=>{
      const getChats = ()=>{
          onSnapshot(doc(db, "userChats", currentUser.uid), (doc)=>{
              setChats(doc.data());
              dispatch({type: "CONNECT", payload: doc.data()});
          })
      }
      currentUser.uid && getChats();
      // eslint-disable-next-line
  },[currentUser.uid])


  return (
    <div className="box chats">
      <div className="data">
        <div className="chatlist">
          {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
            <BlockChat 
            photoURL={chat[1].userInfo.photoURL}
            displayName={chat[1].userInfo.displayName}
            lastMessage={chat[1].lastMessage?.text}
            payload={chat[1].userInfo}
            key={chat[0]} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BoxChats