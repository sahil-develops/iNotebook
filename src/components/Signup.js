import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword: ""}) 
  let history = useNavigate()
      const handleSubmit = async (e) => {
          e.preventDefault();
          const {name,email,password} = credentials
          const response = await fetch("http://localhost:5000/api/auth/createuser", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({name,email,password})
          });
          const json = await response.json()
          console.log(json);
          if(json.success ){
            // redirect
            localStorage.setItem('token',json.authToken)
            history("/login")
props.showAlert("Account created Successfully","success")
        }
        else {
props.showAlert("Invalid credentials","danger")
        }
  
        }  

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}


  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
    <label htmlFor="userName" className="form-label" style={{color:"#fff"}}>User Name</label>
    <input type="text" className="form-control" onChange={onChange} id="userName" aria-describedby="emailHelp" value={credentials.name}  name='name' required/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" style={{color:"#fff"}} className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp"  name='email' required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label" style={{color:"#fff"}}>Password</label>
    <input type="password" className="form-control" onChange={onChange} id="password" name='password' minLength={5} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label" style={{color:"#fff"}} >Confirm Password </label>
    <input type="password" className="form-control" onChange={onChange} id="cpassword" name='cpassword' minLength={5} required/>
  </div>
  <div id="emailHelp" className="form-text my-2"  style={{color:"#fff"}} >{credentials.password!==credentials.cpassword ? "Password and Confirm Password must be same":``}</div>
  <button disabled={credentials.password!==credentials.cpassword} type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup