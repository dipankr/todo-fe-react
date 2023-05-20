import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import Properties from "../property/Properties";
import {AuthContext} from "../context/AuthContext";
import {LoadingContext} from "../context/LoadingContext";
import Loading from "./Loading";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {token, updateToken} = useContext(AuthContext);
  const {isLoading, setLoading} = useContext(LoadingContext);

  const regUrl = Properties.server + '/api/v1/auth/register';

  let delay = Properties.delay;

  useEffect(() => {
    setLoading(false);
    token && navigate('/userTodo');
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(regUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then((response) => {
      console.log('response.ok: ' + response.ok);
      if (response.ok) {
        return response.json();
      }
      throw new Error(response);
    })
    .then((res) => {
      if (res.token) {
        updateToken(res.token)
        setTimeout(() => navigate('/userTodo', {replace: true}), 1000 * delay);
      } else {
        throw new Error(res.message);
      }
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
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
    navigate('/');
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
              <input type="text" name="name" id="name" value={name}
                     onChange={handleNameChange}
                     placeholder="your name"
                     required/>
              <br/>
              <input type="email" value={email}
                     onChange={handleEmailChange}
                     placeholder="you@example.com"
                     name="email"
                     id="email"
                     required/>
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
              <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={handleToggleForm}>Already
              have an
              account? Login here
            </button>
          </div>
      )
  )
}

export default Register;