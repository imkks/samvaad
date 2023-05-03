import { useReducer} from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
const initialState = {
    name: "",
    email: "",
    password: "",
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_NAME":
        return { ...state, name: action.payload };
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
      
      default:
        return state;
    }
  };
const Signup = () => {
    const [state, dispatch] = useReducer(reducer,initialState)
    const navigate= useNavigate()
    const {signUp}=useAuth();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
          case "name":
            dispatch({ type: "SET_NAME", payload: value });
            break;
          case "email":
            dispatch({ type: "SET_EMAIL", payload: value });
            break;
          case "password":
            dispatch({ type: "SET_PASSWORD", payload: value });
            break;
          default:
            break;
        }
      };
    

    const submitHandler=async (e)=>{
        e.preventDefault();
        
        await signUp(state)
        // signUp({name:nameRef.current.value})
        navigate('/')
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            <form onSubmit={submitHandler} className="border p-5 w-50">
            <h3 className="text-center">Sign up</h3>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input name="name"
          value={state.name}
          onChange={handleInputChange} 
          type="text" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input name="email"
          value={state.email}
          onChange={handleInputChange}
           type="text" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                    name="password"
                    value={state.password}
                    onChange={handleInputChange}
                     type="password" className="form-control"></input>
                </div>

                <div className="mb-3">
                    <button onClick={submitHandler} className="btn btn-primary w-100">Create Account</button>
                </div>
                <div className="form-text">Already have an account <Link to="/login">Login</Link> </div>
            </form>
        </div>
    )
}

export default Signup
