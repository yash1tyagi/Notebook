import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
const Singup = () => {
  const[credentials, setCredentials] = useState({name: "",email: "",password: "",cpassword: ""})
  let navigate = useNavigate();
  const handleSubmit = async (e)=>{
      e.preventDefault();
      const{name , email , password} = credentials
      const response = await fetch("http://localhost:5000/api/auth",{
          method: "POST",
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name ,email, password})
      })
      const json = await response.json();
      console.log(json)
  
          localStorage.setItem('token',json.authtoken);
          navigate("/"); 
  }
  const onChange = (e) =>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return <div className='container my-3'>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" name='name' id="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" name='email' id="emial" onChange={onChange} aria-describedby="emailHelp" />
        </div>
      <div className="mb-3">
        <label htmlFor="Password" className="form-label">Password</label>
        <input type="password" className="form-control" name='password' onChange={onChange} id="Password" />
      </div>
      <div className="mb-3">
        <label htmlFor="cPassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" name='cpassword'  onChange={onChange} id="cPassword" />
      </div>
      <button type="submit" className="btn btn-danger">Submit</button>
    </form>
  </div>;
};

export default Singup;

