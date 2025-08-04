import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate,Link } from 'react-router-dom';
const login = () => {
  
    const [username, setuser] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    
    const navigate = useNavigate();


     const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        axios.post("https://project-ecommerce-react-backend.onrender.com/users/register", formData)
            .then((res) => {
                console.log(res);
                navigate("/")
            })
            .catch((err) => {
                console.log(err);
            });
    };
  
  
    return (
    <div>
      <div className="body">
        <div className="page">
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">Username</label>
                <input 
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setuser(e.target.value)}
                    name="username"
                    id="username"
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        name="email"
                        id="email"
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        name="password"
                        id="password"
                        
                     />
                     <br /><br />
                     <button type="submit">Register</button>
                     
            </form>
        </div>
      </div>
    </div>
  )
}

export default login
