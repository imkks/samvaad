import { useState } from "react";
import { SearchUser } from "./SearchUser";

const CreateRoomModal = ({fetchRooms,setshowModal}) => {
  
  
  const [name, setname] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([]);
  const createRoom=(data)=>{
    // console.log(data)
    let myHeaders=new Headers()
    myHeaders.append("Content-Type", "application/json");

    let raw= JSON.stringify(data)
    fetch("http://localhost:4000/rooms", {method: 'POST',
    body:raw,
    headers:myHeaders,
    credentials:"include"
  })
  .then(response => response.json())
  .then(result =>fetchRooms() )
  .catch(error => console.log('error', error));
  }
  
  const submitHandler=(e)=>
  {
    e.preventDefault();
    let membersId=selectedUsers.map((u)=>u.id)
    createRoom({name,membersId})
    setshowModal(false)
    // createRoom({name})
  }
  
    return (
  
  <div className="modal"  id="NewRoomModal" style={{display:"block"}}  >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="CreateRoomModal">Create Room</h5>
        <button type="button" onClick={()=>setshowModal(false)} className="btn-close"  aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitHandler}>
            <label className="form-label">Room Name</label>
            <input className="form-control" type="text" value={name} onChange={(e)=>setname(e.target.value)}/>
            <SearchUser selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
            <div className="m-2">
            <button type="submit"  className="btn btn-primary w-100">Create Room</button>

            </div>
            
        </form>
      </div>
      
    </div>
  </div>
</div> 
    )
}

export default CreateRoomModal
