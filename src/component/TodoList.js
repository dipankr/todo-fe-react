import React, {useContext, useEffect} from 'react';
import Todo from "./Todo";
import {AuthContext} from "../context/AuthContext";
import {UserTodoContext} from "../context/UserTodoContext";
import {useNavigate} from "react-router-dom";
import {LoadingContext} from "../context/LoadingContext";
import Loading from "react-loading";

const TodoList = () => {
  const {authenticated} = useContext(AuthContext);
  const {getAllUserTodo, filteredUserTodos} = useContext(UserTodoContext);
  const {isLoading, setLoading} = useContext(LoadingContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    getAllUserTodo();
    // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return (
        <div style={{
          padding: "10rem 0",
          display: "flex",
          justifyContent: "center"
        }}><Loading type="bars"/></div>
    )
  }

  return (
      authenticated ? (
          <div className="todo-container">
            <ul className="todo-list">
              {
                  filteredUserTodos.length > 0 && filteredUserTodos.map(
                      (userTodo) => {
                        return (
                            <Todo
                                key={userTodo.id}
                                userTodo={userTodo}
                            />
                        )
                      })
              }
            </ul>
          </div>
      ) : (
          <h2 style={{
            textAlign: "center",
            padding: "4rem",
            color: "cyan"
          }}><span onClick={() => navigate('/')} style={{
            cursor: "pointer",
            textDecoration: "underline"
          }}>Login</span> to see your
            Todos
          </h2>
      )
  )
}

export default TodoList;