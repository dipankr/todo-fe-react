import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from "./component/Login";
import Register from "./component/Register";
import AddTodoForm from "./component/AddTodoForm";
import NoMatch from "./component/NoMatch";
import Header from "./component/Header";
import AuthContextProvider from "./context/AuthContext";
import FilterContextProvider from "./context/FilterContext";
import UserTodoContextProvider from "./context/UserTodoContext";
import Logout from "./component/Logout";
import LoadingContextProvider from "./context/LoadingContext";
import Loading from "./component/Loading";

const LazyTodos = React.lazy(() => import('./component/TodoList'));

function App() {
  return (
      <div className="App">
        <AuthContextProvider>
          <FilterContextProvider>
            <UserTodoContextProvider>
              <LoadingContextProvider>
                <Header/>
                <Routes>
                  <Route path="/" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/userTodo" element={
                    <>
                      <div className="todos-form">
                        <AddTodoForm/>
                        <React.Suspense fallback={
                          <div style={{
                            padding: "10rem 0",
                            display: "flex",
                            justifyContent: "center"
                          }}><Loading type="bars"/></div>
                        }>
                          <LazyTodos/>
                        </React.Suspense>
                      </div>
                      <Logout/>
                    </>
                  }/>
                  <Route path='*' element={<NoMatch/>}/>
                </Routes>
              </LoadingContextProvider>
            </UserTodoContextProvider>
          </FilterContextProvider>
        </AuthContextProvider>
      </div>
  )
}

export default App;
