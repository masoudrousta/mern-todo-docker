import React, { useState } from 'react'
import axios from 'axios'

const CreateTodo = ({ history }) => {
  const [todo, setTodo] = useState({
    description: '',
    responsible: '',
    priority: '',
    completed: false,
  })
  const onChangeTodoDescription = (e) => {
    setTodo({ ...todo, description: e.target.value })
  }

  const onChangeTodoResponsible = (e) => {
    setTodo({ ...todo, responsible: e.target.value })
  }

  const onChangeTodoPriority = (e) => {
    setTodo({ ...todo, priority: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!todo.description || !todo.responsible || !todo.priority) return

    const newTodo = {
      description: todo.description,
      responsible: todo.responsible,
      priority: todo.priority,
      completed: todo.completed,
    }

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND}`,
      newTodo
    )

    await axios.get(`${process.env.REACT_APP_BACKEND}`)

    setTodo({
      description: '',
      responsible: '',
      priority: '',
      completed: false,
    })
    history.push('/')
  }
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Create New Todo</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            className='form-control'
            value={todo.description}
            onChange={onChangeTodoDescription}
          />
        </div>
        <div className='form-group'>
          <label>Responsible: </label>
          <input
            type='text'
            className='form-control'
            value={todo.responsible}
            onChange={onChangeTodoResponsible}
          />
        </div>
        <div className='form-group'>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='priorityOptions'
              id='priorityLow'
              value='Low'
              checked={todo.priority === 'Low'}
              onChange={onChangeTodoPriority}
            />
            <label className='form-check-label'>Low</label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='priorityOptions'
              id='priorityMedium'
              value='Medium'
              checked={todo.priority === 'Medium'}
              onChange={onChangeTodoPriority}
            />
            <label className='form-check-label'>Medium</label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='priorityOptions'
              id='priorityHigh'
              value='High'
              checked={todo.priority === 'High'}
              onChange={onChangeTodoPriority}
            />
            <label className='form-check-label'>High</label>
          </div>
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create Todo'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  )
}

export default CreateTodo
