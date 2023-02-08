import React from 'react'
import { useState } from 'react'
import BoxCalls from './BoxCalls'
import BoxChats from './BoxChats'
import BoxStatus from './BoxStatus'

const MainMenu = () => {
    const [menu, setMenu] = useState('chats')
  return (
    <div className="tabs">
        <div className="button">
            <button onClick={()=>setMenu('chats')}>Chats</button>
            <button onClick={()=>{setMenu('status'); alert('fitur ini belum tersedia')}}>Status</button>
            <button onClick={()=>{setMenu('calls'); alert('fitur ini belum tersedia')}}>Calls</button>
                <div className={'underline '+menu}></div>
        </div>
        <div className={'content '+menu}>
            <BoxChats />
            <BoxStatus />
            <BoxCalls />
        </div>
    </div>
  )
}

export default MainMenu