import { IonIcon } from '@ionic/react'
import { arrowBackSharp, videocam, call, ellipsisVertical } from 'ionicons/icons'
import React from 'react'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

const ChatHeader = () => {
  const {dispatch, data} = useContext(ChatContext);
  const handleClick = ()=>{
    dispatch({type: "HIDE_CHAT", payload: null})
  }
  return (
    <div className="chat_header">
        <div className="imgcontent">
            <IonIcon icon={arrowBackSharp} onClick={handleClick} />
            <div className="imgbox">
              <img src={data.user.photoURL} alt="" />
            </div>
            <h3>{data.user.displayName} <br/><span>Online</span></h3>
        </div>
        <div className="actionsBtn">
            <IonIcon icon={videocam} />
            <IonIcon icon={call} />
            <IonIcon icon={ellipsisVertical} />
        </div>
    </div>
  )
}

export default ChatHeader