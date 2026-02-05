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
    <div>
      <input 
        type='checkbox'
        checked={checked}
        onChange={(e) => handleToggleState(todo.id, e.target.checked ? 'COMPLETE' : 'INCOMPLETE')}
      />

      {isEditing ? (
        <form onSubmit={(e) => {
          e.preventDefault()
          setIsEditing(false)
          handleEdit(todo.id, newDescription)
        }}>
          <input
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button type='submit'>Save</button>
          <button
            onClick={() => {
              setNewDescription(todo.description)
              setIsEditing(false)
            }}
          >Cancel</button>
        </form>
      ) : (
      <div>
        <h2>{todo.description}</h2>
        <p>{todo.id}</p>
        <div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      </div>
      )}

    </div>
  )
}

export default Todo