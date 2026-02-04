import Todo from './Todo'
import type { Todo as TodoType } from '../types/todo'

type TodoListProps = {
  todos: TodoType[];
};

const TodoList = ({ todos }: TodoListProps) => {
  if (todos.length === 0) return <h2>No TODOS</h2>


  return(
    <div>
      <p>Tasks</p>
      <ul>
        {todos.map((todo: TodoType) => (
          <Todo 
            key={todo.id}
            todo={todo}
          />
        ))
        }
      </ul>
    </div>
  )
}

export default TodoList