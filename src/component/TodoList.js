import React from 'react';
import Todo from "./Todo";

const TodoList = ({updateTodo, deleteTodo, filteredTodos}) => {

  return (
      filteredTodos.map((todo, index) => {
        return (
            <div className="todo-container">
              <ul className="todo-list">
                <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                />
              </ul>
            </div>
        )
      })
  )
}

export default TodoList;