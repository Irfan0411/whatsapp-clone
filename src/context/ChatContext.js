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