import { onValue, ref } from 'firebase/database';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { database, db } from '../firebase'
import Message from './Message';

const MessageBox = () => {
  const [messages, setMessages] = useState();
  const {data} = useContext(ChatContext);
  const reff = useRef();
  const [isPublic, setIsPublic] = useState(false);

  useEffect(()=>{
    if(data.chatId === "globalChat"){
      setIsPublic(true);
    onValue(ref(database, data.chatId), (snapshot)=>{
        snapshot.exists() && setMessages(Object.entries(snapshot.val()));
      })
    } else {
      setIsPublic(false);
      onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
        doc.exists() && setMessages(Object.entries(doc.data().messages));
      })
    }
  }, [data.chatId])

  useEffect(()=>{
    reff.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  return (
    <div className="messagebox">
      {messages && messages.map((message)=>(
        <Message message={message[1]} isPublic={isPublic} key={message[0]} />
      ))}
      <div ref={reff}></div>
    </div>
  )
}

export default MessageBox