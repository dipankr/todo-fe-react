import React, {createContext, useContext, useEffect, useState} from "react";
import {FilterContext} from "./FilterContext";
import {AuthContext} from "./AuthContext";
import Properties from "../property/Properties";

export const UserTodoContext = createContext();

const UserTodoContextProvider = (props) => {
  const [userTodos, setUserTodos] = useState([]);
  const [filteredUserTodos, setFilteredUserTodos] = useState([]);

  const {filter} = useContext(FilterContext);
  const {token} = useContext(AuthContext);

  const userTodoUrl = Properties.server + '/api/v1/userTodo'
  const bearerToken = 'Bearer ' + token;

  useEffect(() => {
    filterHandler();
    // eslint-disable-next-line
  }, [userTodos, filter])

  const filterHandler = () => {
    switch (filter) {
      case 'pending':
        setFilteredUserTodos(
            userTodos.filter(userTodo => !userTodo.completed)
            .sort(compareStatusThenId)
        )
        break;
      case 'completed':
        setFilteredUserTodos(
            userTodos.filter(userTodo => userTodo.completed)
            .sort(compareStatusThenId)
        )
        break;
      default:
        setFilteredUserTodos(
            userTodos.sort(compareStatusThenId)
        )
        break;
    }
  }

  const compareStatusThenId = (a, b) => {
    if (a.completed === b.completed) {
      return a.id - b.id;
    }
    if (a.completed) {
      return 1;
    }
    return -1;
  }

  //api requests
  const getAllUserTodo = () => {
    fetch(userTodoUrl, {
      mode: 'cors',
      headers: {
        Authorization: bearerToken
      }
    })
    .then(r => r.json())
    .then((res) => {
      setUserTodos(res.data)
    });
  }
  const addUserTodo = (curUserTodo) => {
    //addLocalUserTodo(curUserTodo);
    fetch(userTodoUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: bearerToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(curUserTodo)
    }).then(r => r.json())
    .then((res) => {
      setUserTodos(res.data)
    });
  }
  const updateUserTodo = (curUserTodo) => {
    //updateLocalUserTodo(curUserTodo);
    fetch(userTodoUrl, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Authorization: bearerToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(curUserTodo)
    }).then(r => r.json())
    .then((res) => {
      setUserTodos(res.data)
    });
  }
  const deleteUserTodo = (curUserTodo) => {
    deleteLocalUserTodo(curUserTodo);
    fetch(userTodoUrl + "/" + curUserTodo.id, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Authorization: bearerToken,
        'Content-Type': 'application/json'
      }
    }).then(r => r.errored &&
        console.log(r.message))
    .then(r => r.json())
    .then((res) => {
      setUserTodos(res.data)
    });
  }
  const clearCompletedUserTodo = () => {

    let isSure = window.confirm(
        "Are you sure? \n\nAll the completed tasks will be DELETED!\nThis can not be undone.");
    if (!isSure) {
      return
    }

    let completedTodos = countCompleted();
    if (completedTodos === 0) {
      return // skip call to the backend
    }

    fetch(userTodoUrl, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Authorization: bearerToken,
        'Content-Type': 'application/json'
      },
    }).then(r => r.json())
    .then((res) => {
      setUserTodos(res.data)
    });
  }

  //local changes
  const addLocalUserTodo = (newUserTodo) => {
    setUserTodos(userTodos.concat(newUserTodo));
  }
  const updateLocalUserTodo = (curUserTodo) => {
    setUserTodos(userTodos.map(userTodo => {
      if (userTodo.id === curUserTodo.id) {
        return curUserTodo;
      } else {
        return userTodo;
      }
    }));
  }
  const deleteLocalUserTodo = (curUserTodo) => {
    setUserTodos(userTodos.filter(todo => todo.id !== curUserTodo.id));
  }
  const countCompleted = () => {
    let countCompleted = 0;
    userTodos.forEach(todo => {
      if (todo.completed) {
        countCompleted++;
      }
    });

    return countCompleted;
  }

  return (
      <UserTodoContext.Provider value={{
        userTodos,
        setUserTodos,
        getAllUserTodo,
        addUserTodo,
        updateUserTodo,
        deleteUserTodo,
        clearCompletedUserTodo,
        filteredUserTodos,
        setFilteredUserTodos
      }}>
        {props.children}
      </UserTodoContext.Provider>
  )
}
export default UserTodoContextProvider;
