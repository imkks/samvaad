import { useState } from "react";
import { useMessages } from "../../contexts/MessageContext";
import { SearchUser } from "./SearchUser"

const NewDmModal = ({setshowModal}) => {
    const {dmMessages,setdmMessages}=useMessages()
  const [selectedUsers, setSelectedUsers] = useState([]);

    const submitHandler=(e)=>
    {
      e.preventDefault();
      if(!dmMessages[selectedUsers[0].id])
            setdmMessages({...dmMessages,[selectedUsers[0].id]:[]});
        setSelectedUsers([])
        setshowModal(false)
      // createRoom({name})
    }
    
    return (
        <div className="modal"  id="NewDmModal" style={{display:"block"}}  >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="NewDmModal">Enter New userID</h5>
        <button type="button" onClick={()=>setshowModal(false)} className="btn-close" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitHandler}> 
            <SearchUser selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} multiSelect={false}></SearchUser>
            <div className="m-2">
            <button type="submit"  className="btn btn-primary w-100">Chat </button>

            </div>
           
        </form>
      </div>
      
    </div>
  </div>
</div> 
    )
}

export default NewDmModal
