import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import Properties from "../property/Properties";
import {LoadingContext} from "../context/LoadingContext";
import Loading from "./Loading";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {token, updateToken} = useContext(AuthContext);
  const {isLoading, setLoading} = useContext(LoadingContext);

  const authUrl = Properties.server + '/api/v1/auth/authenticate';

  let delay = Properties.delay;

  useEffect(() => {
    setLoading(false);
    token && navigate('/userTodo');
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(authUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((res) => {
      if (res.token) {
        updateToken(res.token)
        setTimeout(() => navigate('/userTodo', {replace: true}), 1000 * delay);
      } else {
        throw new Error(res.message);
      }
    })
    .catch(() => {
      setLoading(false);
    });
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
      isLoading ? (
          <div style={{
            padding: "10rem 0",
            display: "flex",
            justifyContent: "center"
          }}><Loading type="bars"/></div>
      ) : (
          <div className="login-register-container">
            <form onSubmit={handleSubmit} className="login-register-form">
              <input type="email" value={email}
                     onChange={handleEmailChange}
                     placeholder="you@example.com"
                     name="email"
                     id="email" required/>
              <br/>
              <input type="password" value={password}
                     onChange={handlePasswordChange}
                     placeholder="password"
                     name="password"
                     id="pasword"
                     pattern=".{8,}"
                     title="Must contain 8 or more characters"
                     required/>
              <br/>
              <button type="submit">Login</button>
            </form>
            <button className="link-btn" onClick={handleFormToggle}>
              Don't have an account? Register here
            </button>
          </div>
      )
  )
}

export default Login;