import React, { useContext } from 'react';
import { ChatListContext } from '../context/ChatListContext';
import BlockChat from './BlockChat';

const BoxChats = () => {
  const {chats} = useContext(ChatListContext);

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