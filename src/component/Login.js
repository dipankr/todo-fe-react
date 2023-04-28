import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleFormToggle = () => {
    navigate('/register');
  }

  return (
      <div className="login-register-container">
        <form onSubmit={handleSubmit} className="login-register-form">
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
          <button type="submit">Login</button>
        </form>
        <button className="link-btn" onClick={handleFormToggle}>Don't have an
          account? Register here
        </button>
      </div>
  )
}

export default Login;