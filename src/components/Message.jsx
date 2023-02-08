import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Message = ({message}) => {
    const {currentUser} = useContext(AuthContext);

  return (
    <div className={`message ${message.senderId === currentUser.uid &&'owner'}`} key={message.id}>
    {message.text}
    <br />
    <span className="time">02:11</span>
  </div>
)
}

export default Message