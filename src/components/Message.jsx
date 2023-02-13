import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Message = ({message, isPublic}) => {
    const {currentUser} = useContext(AuthContext);

  return (
    <div className={`message ${message.senderId === currentUser.uid &&'owner'}`}>
    <span className="displayname">{message.displayName}</span>
    <p className={isPublic ? "public" : ""}>{message.text}</p>
    <span className="time">02:11</span>
  </div>
)
}

export default Message