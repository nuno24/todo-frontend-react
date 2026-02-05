import Todo from './Todo'
import type { Todo as TodoType } from '../types/todo'
import { useTodos } from '../context/TodosContext';



const TodoList = () => {
  const {todos, hideCompleted, setHideCompleted, cycleSort} = useTodos()

  if (todos.length === 0) return <h2>No TODOS</h2>


  return(
    <div>
      <button onClick={cycleSort}>Tasks</button>
      <ul>
        {todos.map((todo: TodoType) => (
          <Todo 
            key={todo.id}
            todo={todo}
          />
        ))
        }
      </ul>
      <label>
        <input
          type='checkbox'
          checked={hideCompleted}
          onChange={e => setHideCompleted(e.target.checked)}
        />
        Hide Completed
      </label>
    </div>
  )
}

export default TodoList