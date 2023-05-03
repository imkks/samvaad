import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
    const {user}=useAuth()
    return (
        <nav className="navbar vh-10 navbar-expand-lg bg-primary">
        <div className="container">
        <a class="navbar-brand">Samvaad App</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
            {user?(<>
                <li className="nav-item">
                   <a className="nav-link"> Hi {user.name}</a>
          </li>
            <li className="nav-item">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
            
          </li></>):(<>
              <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>
            </>
          )}
          
        </ul>
      </div>
      </div>
    </nav>
  );
}

    
export default NavBar
