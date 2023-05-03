import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

const Logout = () => {
    const {logout} =useAuth() 
    useEffect(() => {
        logout()
        
    }, )
    return (
        <Navigate to='/login' />
    )
}

export default Logout
