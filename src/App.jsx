import React, { useEffect, useState } from 'react'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'
import { TodoProvider } from "./Context"
function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }


  // fetch data from user local storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
  // save data to user local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className='bg-[#fff] min-h-screen py-8'>
        <div className='max-w-xs bg-[#000] sm:w-full sm:max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3  text-white'>
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 mt-1 sm:mb-8 sm:mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id}
                className="w-full"
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App