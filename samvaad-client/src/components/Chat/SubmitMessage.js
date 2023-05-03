import { useState } from 'react';
import { useMessages } from '../../contexts/MessageContext';

const SubmitMessage = ({isDm,roomId}) => {
    const [message, setmessage] = useState('')
    
    const {sendMessage}=useMessages();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isDm)
            sendMessage({message,receiverId:roomId})
        else
            sendMessage({message,roomId:roomId})

        setmessage('')
    }
    return (
        <div className="input-group mb-2 border border-primary border-2">
                <textarea className="form-control" value={message} onChange={(e)=>setmessage(e.target.value)}></textarea>
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>

            </div>
    )
}


export default SubmitMessage
