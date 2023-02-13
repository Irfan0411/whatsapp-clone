import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';

const BlockChat = ({photoURL, displayName, lastMessage, payload}) => {
    const {dispatch} = useContext(ChatContext);
    const handleSelect = ()=>{
        if(displayName === "Public Chat"){
             dispatch({type: "PUBLIC_CHAT", payload: {}})
        } else {
            dispatch({type: "OPEN_CHAT", payload})
        }
    }
  return (
    <div className="block" onClick={handleSelect}>
        <div className="imgbox">
            <img src={photoURL} alt="" />
        </div>
        <div className="details">
            <div className="listHead">
                <h4>{displayName}</h4>
                <p className="time">10:03</p>
            </div>
            <div className="message_p">
                <p>{lastMessage}</p>
                <b>1</b>
            </div>
        </div>
    </div>
  )
}

export default BlockChat