import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase'
import Message from './Message';

const MessageBox = () => {
  const [messages, setMessages] = useState();
  const {data} = useContext(ChatContext);
  const ref = useRef();

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages);
    })

    return ()=>{
      unsub()
    }
  }, [data.chatId])

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  return (
    <div className="messagebox">
      {messages && messages.map((message)=>(
        <Message message={message} key={message.id} />
      ))}
      <div ref={ref}></div>
    </div>
  )
}

export default MessageBox