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
  const [lastPublicChat, setLastPublicChat] = useState("");
  useEffect(()=>{
      const getChats = ()=>{
          onSnapshot(doc(db, "userChats", currentUser.uid), (doc)=>{
              setChats(doc.data());
              dispatch({type: "CONNECT", payload: doc.data()});
          })
          onSnapshot(doc(db, "chats", "globalChat"), (doc)=>{
            setLastPublicChat(doc.data().lastMessage);
          })
      }
      currentUser.uid && getChats();
      // eslint-disable-next-line
  },[currentUser.uid])


  return (
    <div className="box chats">
      <div className="data">
        <div className="chatlist">
          <BlockChat
          photoURL="https://firebasestorage.googleapis.com/v0/b/chat-3191a.appspot.com/o/global.svg?alt=media&token=392220e5-20ec-4580-8ea0-07e007d06587"
          displayName="Public Chat"
          lastMessage={lastPublicChat}
          />
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