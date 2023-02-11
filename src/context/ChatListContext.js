import { createContext, useReducer } from "react";

export const ChatListContext = createContext();
export const ChatListContextProvider = ({children})=>{
    const INITIAL_STATE = {
        chats: {}
    }
    const chatListReducer = (state, action)=>{
        switch (action.type) {
            case "CONNECT":
                return {
                    chats: action.payload
                }
            default: return state
        }
    }

    const [state, dispatch] = useReducer(chatListReducer, INITIAL_STATE);
        
    return(
        <ChatListContext.Provider value={{chats: state.chats, dispatch}} >
            {children}
        </ChatListContext.Provider>
    )
}