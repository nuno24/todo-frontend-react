import { useState } from 'react';
import type { Todo as TodoType } from '../types/todo';
import { useTodos } from '../context/TodosContext';

type TodoProps = {
  todo: TodoType
};

const Todo = ({ todo}: TodoProps) => {
  const { handleDelete, handleToggleState, handleEdit} = useTodos()
  const [isEditing, setIsEditing] = useState(false)
  const [newDescription, setNewDescription] = useState(todo.description)

  const checked = todo.state === 'COMPLETE'
  
  return(
    <li className={`todoItem ${checked ? 'todoItem--done' : ''}`}>
      {isEditing ? (
        <form 
          className='todoEditForm'
          onSubmit={(e) => {
            e.preventDefault()
            setIsEditing(false)
            handleEdit(todo.id, newDescription)
          }}
        >
          <input className="todoCheckbox" type="checkbox" checked={checked} disabled />
          <input
            className='todoEditInput'
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <div className='todoActions'>
            <button type='submit' className='todoActionBtn'>Save</button>
            <button
              className='todoActionBtn'
              onClick={() => {
                setNewDescription(todo.description)
                setIsEditing(false)
              }}
            >Cancel</button>
          </div>
        </form>
      ) : (
      <>
        <input 
          className='todoCheckbox'
          type='checkbox'
          checked={checked}
          onChange={(e) => handleToggleState(todo.id, e.target.checked ? 'COMPLETE' : 'INCOMPLETE')}
        />
        <span className='todoTextDesc'>{todo.description}</span>
        <div className='todoActions'>
          <button 
            className='todoActionBtn'
            onClick={() => setIsEditing(true)}>Edit</button>
          <button 
            className='todoActionBtn'
            onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
        <p className='todoTextId'>{todo.id}</p>
      </>
      )}

    </li>
  )
}

export default Todo