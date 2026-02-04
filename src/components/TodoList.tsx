import Todo from './Todo'
import type { Todo as TodoType } from '../types/todo'

type TodoListProps = {
  todos: TodoType[];
  onDelete: (id:string) => void
};

const TodoList = ({ todos, onDelete }: TodoListProps) => {
  if (todos.length === 0) return <h2>No TODOS</h2>


  return(
    <div>
      <p>Tasks</p>
      <ul>
        {todos.map((todo: TodoType) => (
          <Todo 
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
          />
        ))
        }
      </ul>
    </div>
  )
}

export default TodoList