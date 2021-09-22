import React from 'react'

import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai'

import { Link } from 'react-router-dom'
const Todo = ({ todo, deleteTodo }) => {
  const { _id, description, responsible, priority, completed } = todo

  const handleDeleteTodo = async (id) => {
    deleteTodo(id)
  }
  return (
    <tr style={{ textAlign: 'center' }}>
      <td className={completed ? 'completed' : ''}>{description}</td>
      <td className={completed ? 'completed' : ''}>{responsible}</td>
      <td className={completed ? 'completed' : ''}>{priority}</td>
      <td>
        <Link to={'/edit/' + _id}>
          <AiOutlineEdit style={{ fontSize: '1.5rem' }} />
        </Link>
      </td>
      <td>
        <AiFillDelete
          style={{ color: 'red', fontSize: '1.5rem' }}
          onClick={() => handleDeleteTodo(_id)}
        />
      </td>
    </tr>
  )
}

export default Todo
