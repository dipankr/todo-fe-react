import React, {createContext, useEffect, useState} from 'react'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (localStorage.length > 0) {
      let savedToken = localStorage.getItem('token');
      if (savedToken && savedToken.length > 0) {
        setToken(savedToken);
        setAuthenticated(true);
      }
    }
  }, [])

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    if (newToken && newToken.length > 0) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }

  return (
      <AuthContext.Provider value={{
        authenticated,
        token,
        updateToken
      }}>
        {props.children}
      </AuthContext.Provider>
  )
}

export default AuthContextProvider;