import react from "react";
import { useContext, useState } from "react";

const AuthContext=react.createContext();
export const useAuth=()=>
{
    return useContext(AuthContext)
}
export const AuthProvider=({children})=>
{

    const [user,setUser]=useState(()=>{
        if(localStorage.getItem('user'))
        return JSON.parse(localStorage.getItem('user'))
      else
        return null
    });
    const login =async (body)=>{
        let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify(body);

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  credentials:'include',
  redirect: 'follow'
};

let response=await fetch("http://localhost:4000/login", requestOptions)
  let result = await response.json()
  
    localStorage.setItem('user',JSON.stringify(result));
    setUser(result)
  
        
    }
    const signUp = async(body)=>
    {
        let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
let raw = JSON.stringify(body);
let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    credentials:'include',
    redirect: 'follow'
  };
  
  let response=await fetch("http://localhost:4000/signup", requestOptions)
    let result= await response.json();
    localStorage.setItem('user',JSON.stringify(result));
    setUser(result)
    // .catch(error => console.log('error', error));
          
          
    }
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
      };
    const value={signUp,user,login,logout};
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}