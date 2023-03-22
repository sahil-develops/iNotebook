import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
  let myStyle ={
    fontWeight: "700",
    borderRadius: "21px",
    backgroundColor: "#E49393",
    border: "none",
    color: "#000",
    padding: "8px 41px 8px 50px"

  }
  let location = useLocation();
let history = useNavigate()
  const handleLogout =()=>{
    localStorage.removeItem('token')
    history('/login')
  }
  const storage = localStorage.getItem('token')
  console.log(storage)
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor:"#2D2727"}}>
  <div className="container-fluid">
    <Link className="navbar-brand d-flex"  to="#">iNotebook
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className={`nav-item d-${!localStorage.getItem('token')? 'none' : 'block'}`}>
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                  My Notes
                </Link>
        </li>
     
      </ul>
     {!localStorage.getItem('token')?<form className="d-flex my-2" role="search">
      <Link className="btn btn-primary mx-3" to="/login" style={myStyle} role="button">Login</Link>
      <Link className="btn btn-primary" to="/signup" role="button" style={myStyle} >Signup</Link>
      </form>: <> 
      <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                  Notes
                </Link>
        </li>

       <Link className={`nav-link ${location.pathname==="/about"?"active":"" }  btn btn-outline-secondary my-2 mx-3 px-5 py-1`} id="loginButton" style={myStyle} to="/about">
                  Profile
                </Link>
                 <button onClick={handleLogout} className="btn btn-primary " style={myStyle}>Logout</button>
        </>}
        
    </div>
  </div>
</nav>
    </>
  );
};

export default Navbar;
