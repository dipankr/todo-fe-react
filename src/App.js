import React, {useEffect, useState} from 'react';
import TodoList from './component/TodoList';
import Form from './component/Form';

const baseUrl = 'https://todo-uyt1.onrender.com/api/todolist';

function App() {
  //state objects
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // useEffect: used to trigger effect on state change
  //run once
  useEffect(() => {
    getAllTodo();
  }, [])

  //runs everytime todos or status changes
  useEffect(() => {
    filterHandler();
  }, [todos, status])

  //functions
  const filterHandler = () => {
    switch (status) {
      case 'pending':
        setFilteredTodos(todos.filter(todo => !todo.completed))
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed))
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }
  const getAllTodo = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then((res) => {
      setTodos(res.response.data)
    });
  }

  const addNewTodo = (curTodo) => {
    addLocalTodo(curTodo);
    fetch(baseUrl, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(curTodo)
    });
  }

  const updateTodo = (curTodo) => {
    updateLocalTodo(curTodo);
    fetch(baseUrl, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(
          {id: curTodo.id, title: curTodo.title, completed: curTodo.completed})
    }).then();
  }
  const deleteTodo = (curTodo) => {
    deleteLocalTodo(curTodo);
    fetch(baseUrl + "/" + curTodo.id, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(
          {id: curTodo.id, title: curTodo.title, completed: curTodo.completed})
    }).then(r => r.errored &&
        console.log(r.response.message));
  }
  const addLocalTodo = (curTodo) => {
    setTodos(todos.concat(curTodo));
  }
  const updateLocalTodo = (curTodo) => {
    setTodos(todos.map(todo => {
      if (todo.id === curTodo.id) {
        return curTodo;
      } else {
        return todo;
      }
    }));
  }
  const deleteLocalTodo = (curTodo) => {
    setTodos(todos.filter(todo => todo.id !== curTodo.id));
  }

  const clearLocalComplete = () => {
    setTodos(todos.filter(todo => !todo.completed));
  }

  const clearCompleted = () => {
    clearLocalComplete();
    fetch(baseUrl, {
      method: 'DELETE',
      mode: 'cors'
    });
  }

  return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Todo List</h1>
        </header>
        <Form
            inputText={inputText}
            setInputText={setInputText}
            addNewTodo={addNewTodo}
            setStatus={setStatus}
            clearCompleted={clearCompleted}
        />
        <TodoList
            todos={todos}
            status={status}
            filteredTodos={filteredTodos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
        />
      </div>
  )
}

export default App;
