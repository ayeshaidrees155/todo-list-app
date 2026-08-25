import React, { useEffect, useState } from 'react';
import "./todo.css";
import Header from '../components/header/header';
import TodoList from "../components/TodoList/TodoList"
import InputBox from "../components/InputBox/InputBox"



export default function Todo() {
  const [todos, setTodos] = useState(() =>
    JSON.parse(localStorage.getItem("MytodoList") || "[]"))


  const [currentId, setCurrentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null)


  const handelAddorUpdate = (text) => {
    if (isEditing) {
      setTodos(todos.map((todo) => (
        todo.id === currentId ? { ...todo, text: text } : todo
      )));
      setIsEditing(false);
      setCurrentId(null);
      setTaskToEdit(null);
    }
    else {
      const newItem = {
        text: text,
        id: Date.now()
      };
      setTodos((prevItem) => [...prevItem, newItem])
    }
  };


  const handelEditItem = (item) => {
    setIsEditing(true)
    setCurrentId(item.id)
    setTaskToEdit(item);
  }



  const handelDelItem = (id) => {
    setTodos((prevTodos) => prevTodos?.filter(item => item.id !== id));
  }

  const handelClearAllItem = () => {
    setTodos([]);
    localStorage.removeItem("MytodoList")
  }


  useEffect(() => {
    localStorage.setItem("MytodoList", JSON.stringify(todos))
  }, [todos])



  const userName = localStorage.getItem("loggedUser") || "Guest";
  return (

    <>
      <Header />
      <div className='todoPage'>
        <div className='childDiv'>
          <h1 style={{ color: 'white', padding: "5px 10px", textAlign: "center" }}>Hi! {userName}</h1>

          <InputBox onAdd={handelAddorUpdate} taskToEdit={taskToEdit} isEditing={isEditing} />
          <TodoList items={todos} onDel={handelDelItem} onEdit={handelEditItem} />
          <button className='delAllBtn' onClick={handelClearAllItem}>Delete Todos</button>
        </div>
      </div>
    </>
  )
}
