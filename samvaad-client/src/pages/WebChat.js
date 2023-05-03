import React, { useState } from 'react'
import SideView from '../components/Sidebar/SideView'
import ChatWindow from '../components/Chat/ChatWindow'

const WebChat = () => {
    const [roomId, setroomId] = useState(null)
    return (
        <div className="d-flex" style={{minHeight:"90vh"}}>
        <SideView setroomId={setroomId}/>
        <ChatWindow roomId={roomId}></ChatWindow>
   </div>
    )
}

export default WebChat
