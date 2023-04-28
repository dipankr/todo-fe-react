import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from "./component/Login";
import Register from "./component/Register";
import Form from "./component/Form";
import NoMatch from "./component/NoMatch";
import Header from "./component/Header";

const LazyTodos = React.lazy(() => import('./component/TodoList'));

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
    // eslint-disable-next-line
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
    .then(r => r.json())
    .then((res) => {
      setTodos(res.data)
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
        console.log(r.message));
  }
  const clearCompleted = () => {

    let isSure = window.confirm(
        "Are you sure? \n\nAll the completed tasks will be DELETED!\nThis can not be undone.");
    if (!isSure) {
      return
    }

    let completedTodos = clearLocalComplete();
    if (completedTodos === 0) {
      return // skip call to the backend
    }

    fetch(baseUrl, {
      method: 'DELETE',
      mode: 'cors'
    });
  }

  //handle local data
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
    let countCompleted = 0;
    setTodos(todos.filter(todo => {
      if (todo.completed) {
        countCompleted++;
      }
      return !todo.completed;
    }));

    return countCompleted;
  }

  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register"
                 element={<Register/>}/>
          <Route path="/" element={
            <div className="todos-form">
              <Form
                  inputText={inputText}
                  setInputText={setInputText}
                  addNewTodo={addNewTodo}
                  setStatus={setStatus}
                  clearCompleted={clearCompleted}
              />
              <React.Suspense fallback='Loading...'>
                <LazyTodos
                    filteredTodos={filteredTodos}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                />
              </React.Suspense>
            </div>
          }/>
          <Route path='*' element={<NoMatch/>}/>
        </Routes>
      </div>
  )
}

export default App;
