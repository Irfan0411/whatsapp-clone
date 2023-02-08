import Header from "../components/Header";
import MainMenu from "../components/MainMenu";
import ChatHeader from "../components/ChatHeader";
import MessageBox from "../components/MessageBox";
import MessageInput from "../components/MessageInput";
import { useContext } from "react";
import { HideContext } from "../context/HideContext";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import AddChat from "../components/AddChat";
import { ChatContext } from "../context/ChatContext";

const Home = ()=> {

  const {hide, dispatch} = useContext(HideContext);
  const {data} = useContext(ChatContext);
  const navigate = useNavigate();
  return (
    <div className="container">
      <Header />
      <MainMenu />
      <div className={`chatbox ${data.hideChat ? 'hide': ''}`}>
        <ChatHeader />
        <MessageBox />
        <MessageInput />
      </div>
      <div className={`toolbox ${hide.hideToolbox ? 'hide': ''}`}>
        <button onClick={()=>{navigate("/profile"); dispatch("HIDE_TOOLBOX")}}>Edit Profile</button>
        <button onClick={()=>{dispatch("OPEN_ADD")}}>Add Chat</button>
        <button onClick={()=>{signOut(auth); dispatch("HIDE_TOOLBOX")}}>Log Out</button>
        <button onClick={()=>dispatch("HIDE_TOOLBOX")}>Close</button>
      </div>
      <AddChat />
    </div>
  );
}

export default Home;
