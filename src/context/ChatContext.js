import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
export const ChatContextProvider = ({children})=>{
    const {currentUser} = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
        hideChat: true
    }

    const chatReducer = (state, action)=>{
        switch (action.type) {
            case "OPEN_CHAT":
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid,
                    hideChat: false
                }
            case "PUBLIC_CHAT":
                return {
                    user: {
                        displayName: "Public Chat",
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/chat-3191a.appspot.com/o/global.svg?alt=media&token=392220e5-20ec-4580-8ea0-07e007d06587"
                    },
                    chatId: "globalChat",
                    hideChat: false
                }
            case "HIDE_CHAT":
                return INITIAL_STATE
            default : return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}