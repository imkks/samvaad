import { useRef} from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
    
    const {login}=useAuth();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log(emailRef.current.value)
        await login({email:emailRef.current.value,password:passwordRef.current.value})
        navigate('/')

    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            
            <form action="" className="border p-5 w-50">
            <h3 className="text-center">Login</h3>
            <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input ref={emailRef}  type="text" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input ref={passwordRef}  type="password" className="form-control"></input>
                </div>
                <div className="mb-3">
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100">Login</button>
                </div>
                <div className="form-text">Dont have an account  <Link to="/signup">Sign Up</Link> </div>

            </form>
        </div>
    )
}
