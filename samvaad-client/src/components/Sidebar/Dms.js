import { useState } from "react";
import { useContacts } from "../../contexts/ContactContext";
import { useMessages } from "../../contexts/MessageContext"
import NewDmModal from "./NewDmModal";
import { createPortal} from "react-dom"

const Dms = ({setroomId}) => {
    const {dmMessages}=useMessages();
    const contacts=useContacts();
    const [showModal, setshowModal] = useState(false)
    // console.log(contacts)
    const dmsHtml=[];
    if(dmMessages)
    {
    for(let [key] of Object.entries(dmMessages))
    {
        // console.log(key)
        dmsHtml.push(<div key={key} onClick={()=>setroomId(key)} className="list-group-item bg-light border"><p>{contacts[key]}</p></div>)
    }
    }
    
    return (
<>
        <div className="  bg-primary text-light border">
                <h2>Dm</h2>
            </div>
            <div className="  list-group">
               {dmsHtml}
                
            </div>
            <div className="  my-4">
                <button className="btn btn-primary w-100" onClick={()=>setshowModal(p=>!p)} >New Dm</button>
            </div>   
            {showModal && createPortal(<>
            <div className="modal-backdrop"></div>
            <NewDmModal setshowModal={setshowModal}/>
            </>,document.getElementById('modal'))}    
        </>
    )
}

export default Dms
