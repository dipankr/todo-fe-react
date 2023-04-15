import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';

const baseUrl = 'http://localhost:8080/api/todolist';
function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // get local stored todos
  useEffect(() => {
    getAllTodo();
  }, [])

  useEffect(() => {
    console.log('todos updated');
  }, [todos])

  const getAllTodo = () => {
    fetch(baseUrl)
      .then(res => res.json())
      .then((res) => {
        setTodos(res.response.data)
      });
  }

  const addNewTodo = (name) => {
    fetch(baseUrl, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ title: name })
    }).then(res => res.json())
      .then((res) => {
        setTodos(res.response.data)
      });
  }

  const updateTodo = (curTodo) => {
    fetch(baseUrl, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({ id: curTodo.id, title: curTodo.title, completed: curTodo.completed })
    }).then(res => res.json())
      .then((res) => {
        if(res.response.data) setTodos(res.response.data)
      });
  }

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value
    if (name) {
      addNewTodo(name);
      todoNameRef.current.value = null
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo(event);
    }
  };
  const handleClearCompleted = () => {
    fetch(baseUrl, {
      method: 'DELETE',
      mode: 'cors'
    }).then(res => res.json())
      .then((res) => {
        if(res.response.data) setTodos(res.response.data)
      });
  }

  return (
    <>
      <h1 align="center" className="appTitle">TodoList</h1>
      <div className="todo-pending" align="right"> <span> <span>{todos.filter(todo => !todo.completed).length} </span> Todo items left </span> </div>
      <div className="addTodoItem">
        <input ref={todoNameRef} className="form-control addTodoItemInput" id="floatingInput" placeholder="Add Todo Item" onKeyDown={handleKeyDown}/>
      </div>
      <TodoList todos={todos} updateTodo={updateTodo} />
      <button className="btn btn-danger" onClick={handleClearCompleted}> Clear Completed </button>
    </>
  )
}

export default App;
