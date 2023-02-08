import { createContext, useReducer } from "react";

export const HideContext = createContext();
export const HideContextProvider = ({children})=>{
    const INITIAL_STATE = {
        hideToolbox: true,
        hideAdd: true
    }
    const hideReducer = (state, action)=>{
        switch (action) {
            case "HIDE_TOOLBOX":
                return{
                    hideToolbox: true,
                    hideAdd: true
                }
            case "OPEN_TOOLBOX":
                return{
                    hideToolbox: false,
                    hideAdd: true
                }
            case "HIDE_ADD":
                return{
                    hideToolbox: true,
                    hideAdd: true
                }
            case "OPEN_ADD":
                return{
                    hideToolbox: true,
                    hideAdd: false
                }
        
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(hideReducer, INITIAL_STATE);

    return(
        <HideContext.Provider value={{hide:state, dispatch}}>
            {children}
        </HideContext.Provider>
    )
}