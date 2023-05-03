import react from "react";
import { useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { useAuth } from "./AuthContext";


const SocketContext= react.createContext();
export const useSocket=()=>
{ 
    return useContext(SocketContext)
}
export const SocketProvider=({children})=>
{
    const {user} = useAuth()
    const [Socket, setSocket] = useState(()=>socket)
    useEffect(() => {
        if(user)
            Socket.connect()
            return () => {
                socket.disconnect();
              };
    }, [user,Socket])
    let value={Socket}
    return (<SocketContext.Provider value={value}>
        {children}
    </SocketContext.Provider>)

}
    