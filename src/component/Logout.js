import React, {useContext} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import Properties from "../property/Properties";
import {LoadingContext} from "../context/LoadingContext";

const Logout = () => {
  const {authenticated, token, updateToken} = useContext(
      AuthContext);
  const navigate = useNavigate();
  const {setLoading} = useContext(LoadingContext);

  const authUrl = Properties.server + '/logout';
  let delay = Properties.delay;

  const handleLogout = () => {
    setLoading(true);
    let isSure = window.confirm('Are you sure you want to log out?');
    if (!isSure) {
      setLoading(false);
      return;
    }

    let bearerToken = 'Bearer ' + token;
    fetch(authUrl, {
      mode: 'cors',
      headers: {
        Authorization: bearerToken
      }
    }).then((response) => {
      updateToken('');
      setTimeout(() => navigate('/', {replace: true}), 1000 * delay);

      if (!response.ok) {
        throw new Error('logout failed');
      }
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
      authenticated && (
          <div style={{
            display: "flex",
            justifyContent: "right"
          }}>
            <button className="link-btn" onClick={handleLogout}>Logout</button>
          </div>
      )
  )
}
export default Logout
