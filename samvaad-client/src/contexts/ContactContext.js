import react, { useEffect } from "react"
import { useContext,useState } from "react"
import { useAuth } from "./AuthContext";

const ContactContext=react.createContext()
export const useContacts=()=>useContext(ContactContext);
export const ContactsProvider=({children})=>{
    const [contacts, setContacts] = useState({a:123})
    const {user}=useAuth();
    

    useEffect(() => {
        const addUsers=(data)=>{
            let myUser={}
            data.forEach((cntct)=>{
                myUser[cntct.id]=cntct.name;
            })
            setContacts(myUser)

        }
        async function fetchUserInfo(){
          let response=await fetch(`http://localhost:4000/users`, {
              method: 'POST', 
              credentials:'include'
            })
            let data=await response.json();
            await addUsers(data)
        }
        if(user)
            fetchUserInfo();
  
         
        
      }, [user])

    return(
        <ContactContext.Provider value={contacts}>
            {children}
        </ContactContext.Provider>
    )
}