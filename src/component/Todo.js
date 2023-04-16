import React from 'react'

function Todo({index, todo, updateTodo, deleteTodo}) {

  const handleTodoDelete = () => {
    deleteTodo(todo)
  }

  const handleCompletedStatus = () => {
    todo.completed = !todo.completed;
    updateTodo(todo);
  }

  return (
      <div className="todo">
        <li className={`todo-item ${todo.completed && "completed"}`}
            key={index}>
          {todo.title}
        </li>
        <button className="complete-btn" onClick={handleCompletedStatus}>
          <i className="fas fa-check"></i>
        </button>
        <button className="trash-btn" onClick={handleTodoDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
  )
}

export default Todo;