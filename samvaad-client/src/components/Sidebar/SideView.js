import { useAuth } from "../../contexts/AuthContext"
import Dms from "./Dms"
import Groups from "./Groups"
import logo from '../../assets/a.png'

const SideView = ({setroomId}) => {
    const {user}= useAuth()
    return (
        <div className="pe-3 border-end border-4 border-primary" style={{width:"25%",}}>
        <div className="d-flex justify-content-between" style={{height:"64px"}}>
            <img src={logo} className="rounded img-thumbnail" alt="..."/>
            <h2> I am {user.name}</h2>

        </div>
        <Groups setroomId={setroomId}/>
        <Dms setroomId={setroomId}/>
        
    </div>
    )
}

export default SideView
