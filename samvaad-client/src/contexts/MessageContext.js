import React, { useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useSocket } from "./SocketContext";

const MessageContext=React.createContext();
export const useMessages=()=>useContext(MessageContext);
export const MessageProvider=({children})=>{
   const [dmMessages, setdmMessages] = useState({})
   const [grpMessages, setgrpMessages] = useState({})
    // console.log("hello")
    const {user}=useAuth();
    const {Socket}=useSocket();

    const getMessages=()=>{
        
        fetch("http://localhost:4000/messages", {credentials:"include"})
  .then(response => response.json())
  .then(result => {
    setdmMessages(result.pvtMessagePerUser);
    setgrpMessages(result.grpMessagePerUser);
})
  .catch(error => console.log('error', error));
    }
    useEffect(() => {
        
        if(user)
        {
            getMessages()
            console.log("hello")
        }
        
    }, [user])
    
    const sendMessage=(data)=>{
        data={...data,senderId:user.id}
        Socket.emit('send_message',data);
        if(data.receiverId)
        {

            if(dmMessages[data.receiverId])
            setdmMessages({...dmMessages,[data.receiverId]:[...dmMessages[data.receiverId],data]});
            else
            setdmMessages({...dmMessages,[data.receiverId]:[data]});


        }
        if(data.roomId)
        {
            if(grpMessages[data.roomId])
            setgrpMessages({...grpMessages,[data.roomId]:[...grpMessages[data.roomId],data]});
            else
            setgrpMessages({...grpMessages,[data.roomId]:[data]});


        }
        
       
    }
    const receiveMessage=useCallback((data)=>
    {   
        console.log(data)
        if(data.roomId)
        {
            console.log(grpMessages[data.roomId],grpMessages,data.roomId)
            
            if(grpMessages[data.roomId] )
            {
                setgrpMessages((prev)=>{return {...prev,[data.roomId]:[...prev[data.roomId],data]}})
            }
            // else
            //     setgrpMessages({...grpMessages,[data.roomId]:[data]})


        }
        if(data.receiverId)
        {
            if(dmMessages[data.senderId])
            {
                setdmMessages((prev)=>{return {...prev,[data.senderId]:[...prev[data.senderId],data]}})
            }
            else
            {
                
                setdmMessages((prev)=>{return {...prev,[data.senderId]:[data]}})
            }
        }

    },[dmMessages,grpMessages])
    useEffect(() => {
        
        Socket.on('receive_message',(data)=>receiveMessage(data))
        return () => {
            Socket.off('receive_message')
        }
        
    }, [Socket,receiveMessage])

    const value={dmMessages,setdmMessages,grpMessages,sendMessage}
    return (
        <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
    )
}