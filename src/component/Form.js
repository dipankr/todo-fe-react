import React from 'react'
import {v4 as uuidv4} from 'uuid';

const Form = ({
  inputText,
  setInputText,
  addNewTodo,
  setStatus,
  clearCompleted
}) => {
  const submitHandler = (e) => {
    e.preventDefault();
    const curTodo = {
      id: uuidv4(),
      title: inputText,
      completed: false
    }
    addNewTodo(curTodo);
    setInputText('');
  }
  const inputChangeHandler = (e) => {
    setInputText(e.target.value);
  }
  const statusHandler = (e) => {
    setStatus(e.target.value);
  }
  const clearCompletedHandler = (e) => {
    e.preventDefault();
    clearCompleted();
  }

  return (
      <form className="add-todo-form">
        <input type="text" placeholder="Add Task" onChange={inputChangeHandler}
               value={inputText}/>
        <button type="submit" className="todo-button" onClick={submitHandler}>
          <i className="fa fa-plus-square"/>
        </button>
        <div className="select">
          <select name="todos" className="filter-todo" onChange={statusHandler}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button type="delete" className="clear-completed-button"
                onClick={clearCompletedHandler} title="Clear All Completed!">
          <i className="fa fa-times"/>
        </button>
      </form>
  )
}

export default Form;