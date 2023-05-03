import {  useState } from "react";
import { useContacts } from "../../contexts/ContactContext";


export const SearchUser = ({multiSelect,selectedUsers,setSelectedUsers}) => {
    const contacts=useContacts();
const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if(event.target.value==='')
    {
      

        setUsers([])
        return;

    }
    let searchResults=[]
    for(let [key,value] of Object.entries(contacts))
    {
        // console.log(value)
    //   optionHtml.push(<option key={key} value={key}>{value}</option>)
    if(value.includes(searchTerm))
        searchResults.push({id:key,name:value})
    }
    setUsers(searchResults)
  };

  const handleSelectUser = (user) => {
    if (multiSelect && !selectedUsers.includes(user)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    else if (!multiSelect)
        setSelectedUsers([user])
    
  };

  const handleRemoveUser = (user) => {
    const newSelectedUsers = selectedUsers.filter((u) => u !== user);
    setSelectedUsers(newSelectedUsers);
  };

    return (
        <div>
        <label className="form-label">User</label>
        
        <input className="form-control" type="text" value={searchTerm} onChange={handleInputChange} />
        <div className="list-group my-2 border border-primary">
          {users.map((user) => (
            <a className="list-group-item list-group-item-action" key={user.id}
            onMouseEnter={(e)=>e.currentTarget.classList.add('active')}
            onMouseLeave={(e)=>e.currentTarget.classList.remove('active')}
            
             onClick={(e) =>
              handleSelectUser(user)}>
              {user.name}
            </a>
          ))}
        </div>
        <div>
          {selectedUsers.map((user) => {console.log(user.id)
              return (
            
            <span className="badge bg-primary m-2" key={user.id} onClick={() => handleRemoveUser(user)}>
              {user.name}&#x2715;
            </span>
          )})}
        </div>
      </div>
    )
}



SearchUser.defaultProps = {
    multiSelect:true

}

