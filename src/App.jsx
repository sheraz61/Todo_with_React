import React, { useEffect, useState } from 'react'
import TodoForm from './Components/todoForm'
function App() {
  const [todos, setTodos] = useState([])
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo)))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevtodo) => prevtodo.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevtodo) => prevtodo.id === id ? { ...prevtodo, completed: !prevtodo.completed } : prevtodo))
  }


  // fetch data from user local storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
  // save data to user local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])


  return (
    <todoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className='bg-[#172842] min-h-screen py-8'>
        <div className='max-w-xs sm:w-full sm:max-w-2xl mx-auto shadow-md rounded-lg px-2 py-1 sm:px-4 sm:py-3 text-white'>
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 mt-1 sm:mb-8 sm:mt-2">Manage Your Todos</h1>
          <div className="mb-4">
          <TodoForm/>
          </div>
          <div className='flex flex-wrap gap-y-3'>
            {/* todoITems */}
          </div>
        </div>
      </div>
    </todoProvider>
  )
}

export default App