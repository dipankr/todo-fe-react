import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleToggleForm = () => {
    navigate('/login');
  }

  return (
      <div className="login-register-container">
        <form onSubmit={handleSubmit} className="login-register-form">
          <input type="text" name="name" id="name" value={name}
                 onChange={handleNameChange}
                 placeholder="your name"/>
          <br/>
          <input type="email" value={email}
                 onChange={handleEmailChange}
                 placeholder="you@example.com"
                 name="email"
                 id="email"/>
          <br/>
          <input type="password" value={password}
                 onChange={handlePasswordChange}
                 placeholder="password"
                 name="password"
                 id="pasword"/>
          <br/>
          <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={handleToggleForm}>Already have an
          account? Login here
        </button>
      </div>
  )
}

export default Register;