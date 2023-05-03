import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

const AuthVerify = () => {
    let location =useLocation();
    let {user,logout}=useAuth()
    useEffect(() => {
    
        if(user && user.exp<Date.now())
        {
            console.log(user.exp<Date.now())
            logout();

        }
        
    }, [location,logout,user])
    return;
}

 
export default AuthVerify
