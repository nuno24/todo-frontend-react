import type { Todo as TodoType } from '../types/todo';

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  
  
  return(
    <div>
      <input 
        type='checkbox'
      />
      <h2>{todo.description}</h2>
      <p>{todo.id}</p>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default Todo