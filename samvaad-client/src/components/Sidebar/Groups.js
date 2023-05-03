import { useEffect, useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import { createPortal } from "react-dom";

const Groups = ({setroomId}) => {
    const [rooms, setrooms] = useState([])
    const [showModal, setshowModal] = useState(false)

    const fetchRooms=()=>{
        fetch("http://localhost:4000/rooms",{credentials:'include'})
  .then(response => response.json())
  .then(result =>{setrooms(result)} )
  .catch(error => console.log('error', error));

    }
    useEffect(() => {
        fetchRooms()
        
        
    }, [])
    const roomsHtml=[];
    for(let {id,name} of rooms)
    {
        roomsHtml.push(<div key={id} onClick={()=>setroomId(id)}  className="list-group-item  bg-light border"><p>{name}</p></div>)
    }
    return (
        <>
        <div className="  bg-primary text-light border">
            <h2>Groups</h2>
         </div>
    <div className="  list-group">
        {roomsHtml}
    </div>
    <div className="  my-4">
        <button className="btn btn-primary w-100 "  onClick={()=>setshowModal(p=>!p)} >Create new Group</button>
    </div>
    
    {showModal && createPortal(<>

        <div className="modal-backdrop"></div>
    <CreateRoomModal fetchRooms={fetchRooms} setshowModal={setshowModal}/></>
    ,document.getElementById('modal'))}   

</>
    )
}

export default Groups
