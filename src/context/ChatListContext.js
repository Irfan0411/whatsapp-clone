import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ChatListContext = createContext();
export const ChatListContextProvider = ({children})=>{
    const {currentUser} = useContext(AuthContext);
    const [chats, setChats] = useState(null);
    useEffect(()=>{
        const getChats = ()=>{
            onSnapshot(doc(db, "userChats", currentUser.uid), (doc)=>{
                setChats(doc.data());
            })
        }
        currentUser.uid && getChats();
    }, [currentUser.uid])
        
    return(
        <ChatListContext.Provider value={{chats}} >
            {children}
        </ChatListContext.Provider>
    )
}