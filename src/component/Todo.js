import React, {useContext} from 'react'
import {UserTodoContext} from "../context/UserTodoContext";

const Todo = ({index, userTodo}) => {
  const {updateUserTodo, deleteUserTodo} = useContext(UserTodoContext);

  const handleCompletedStatus = () => {
    userTodo.completed = !userTodo.completed;
    updateUserTodo(userTodo);
  }
  const handleTodoDelete = () => {
    deleteUserTodo(userTodo)
  }

  return (
      <div className="todo">
        <li className={`todo-item ${userTodo.completed && "completed"}`}
            key={userTodo.id}>
          {userTodo.title}
        </li>
        <button className="complete-btn" onClick={handleCompletedStatus}>
          <i className={`fas ${userTodo.completed ? "fa-times-circle"
              : "fa-check"}`}></i>
        </button>
        <button className="trash-btn" onClick={handleTodoDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
  )
}

export default Todo;