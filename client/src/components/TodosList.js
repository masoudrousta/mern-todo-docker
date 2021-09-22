import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import axios from 'axios'

const TodosList = () => {
  const [todos, setTodos] = useState([])
  const fetchData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND}`)
    setTodos(res.data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const deleteTodo = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND}/${id}`)
    fetchData()
  }
  return (
    <div>
      {todos && todos.length > 0 && (
        <>
          <h3>Todos List</h3>
          <table className='table table-striped' style={{ marginTop: 20 }}>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th>Description</th>
                <th>Responsible</th>
                <th>Priority</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => {
                return (
                  <Todo
                    todo={todo}
                    key={todo._id}
                    deleteTodo={(id) => deleteTodo(id)}
                  />
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default TodosList
