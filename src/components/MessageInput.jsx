import { IonIcon } from '@ionic/react';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { happyOutline, attachOutline, camera, mic, sendSharp } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid' 
import { AuthContext } from '../context/AuthContext';

const MessageInput = () => {
  const [text, setText] = useState('');
  const [isSend, setIsSend] = useState(false);
  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);
  const handleSend = async ()=>{
    if(text === ''){
      alert('fitur belum tersedia');
    } else {
      try {
        setIsSend(true);
        await updateDoc(doc(db, "chats", data.chatId),{
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now()
          })
        })
        await updateDoc(doc(db, "userChats", currentUser.uid),{
          [data.chatId + ".lastMessage"]: {text},
          [data.chatId + ".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, "userChats", data.user.uid),{
          [data.chatId + ".lastMessage"]: {text},
          [data.chatId + ".date"]: serverTimestamp()
        })
        setText('');
        setIsSend(false);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="messageInput">
        <div className="input">
            <IonIcon icon={happyOutline} />
            <input type="text"
             placeholder='Message'
             value={isSend ? '' : text}
             onChange={(e)=>setText(e.target.value)}
             />
            <IonIcon icon={attachOutline} className="deg45" />
            <IonIcon icon={camera} />
        </div>
        <div className="mic" onClick={handleSend}><IonIcon icon={text === '' ? mic : sendSharp} /></div>
    </div>
  )
}

export default MessageInput