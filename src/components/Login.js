import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
let history = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success ){
            // redirect
            localStorage.setItem('token',json.authToken)
            history("/")
props.showAlert("Logged in Successfully","success")

        }
        else {
props.showAlert("Invalid details","danger")

        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container'>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">

                <h4 style={{color:"#fff"}}>Login to continue to iNotebook</h4>
                    <label htmlFor="email" style={{color:"#fff"}} className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" style={{color:"#8F43EE"}} className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{color:"#fff"}}>Password</label>
                    <input type="password" className="form-control"  value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

<div className="container text-center">
                <button type="submit" className="btn btn-primary px-5 py-2">Submit</button><br />
                <Link className="btn btn-outline-light mx-3 my-2" to={'/signup'} role="button">Don't have a Account ? <span>Create One</span></Link>

</div>
            </form>
        </div>
    )
}

export default Login