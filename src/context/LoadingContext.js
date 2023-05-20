import React, {createContext, useState} from 'react'

export const LoadingContext = createContext();

const LoadingContextProvider = (props) => {
  const [isLoading, setLoading] = useState(false);

  return (
      <LoadingContext.Provider value={{
        isLoading,
        setLoading
      }}>
        {props.children}
      </LoadingContext.Provider>
  )
}

export default LoadingContextProvider;