import { useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useContacts } from "../../contexts/ContactContext";
import { useMessages } from "../../contexts/MessageContext";
import Messages from "./Messages"
import SubmitMessage from "./SubmitMessage";
import Welcome from "./Welcome";

const ChatWindow = ({roomId}) => {
  const {dmMessages,grpMessages}=  useMessages()
  console.log(grpMessages)
  const sref=useCallback((node)=>{
    if(node!==null)
        node.scrollIntoView({smooth:true})
},[])
  const contacts=useContacts()
  const {user}=useAuth()
  let isDm=false;
    if(!roomId) return (<Welcome/>); 
    const messageElement=[]
    if(dmMessages[roomId]){
        isDm=true;
    dmMessages[roomId].forEach((value,idx)=>
        messageElement.push(<Messages key={idx} isMyMessage={value.senderId===user.id}  content={value.message} sender={contacts[value.senderId]}></Messages>))
    }

   else if(grpMessages[roomId]){
        grpMessages[roomId].forEach((value,idx)=>
            messageElement.push(<Messages key={idx} isMyMessage={value.senderId===user.id} content={value.message} sender={ contacts[value.senderId]}></Messages>))
        }
    
    return (
        <div className="d-flex flex-column flex-grow-1 m-3">
            <div className="flex-grow-1 d-flex flex-column">
               {/* <Messages/> */}
            {messageElement}  
            <div ref={sref}></div>
            {/* {tabIndex} */}
            {/* {messages[tabIndex]?messages[tabIndex][0]:''} */}
            </div>
            
            <SubmitMessage isDm={isDm} roomId={roomId}/>
            
        </div>
    )
}

export default ChatWindow
