import React, {useContext, useState} from 'react'
import {UserTodoContext} from "../context/UserTodoContext";
import {FilterContext} from "../context/FilterContext";
import {LoadingContext} from "../context/LoadingContext";

const AddTodoForm = () => {
  const [inputText, setInputText] = useState('');

  const {addUserTodo, clearCompletedUserTodo} = useContext(UserTodoContext);
  const {setFilter} = useContext(FilterContext);
  const {isLoading} = useContext(LoadingContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const curUserTodo = {
      title: inputText,
      completed: false
    }
    addUserTodo(curUserTodo);
    setInputText('');
  }
  const inputChangeHandler = (e) => {
    setInputText(e.target.value);
  }
  const statusHandler = (e) => {
    setFilter(e.target.value);
  }
  const clearCompletedHandler = (e) => {
    e.preventDefault();
    clearCompletedUserTodo();
  }

  if (isLoading) {
    return
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

export default AddTodoForm;