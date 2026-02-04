import type { Todo as TodoType } from '../types/todo';

type TodoProps = {
  todo: TodoType
  onDelete: (id: string) => void
};

const Todo = ({ todo, onDelete }: TodoProps) => {
  
  
  return(
    <div>
      <input 
        type='checkbox'
      />
      <h2>{todo.description}</h2>
      <p>{todo.id}</p>
      <div>
        <button>Edit</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    </div>
  )
}

export default Todo