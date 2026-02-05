import Todo from './Todo'
import type { Todo as TodoType } from '../types/todo'
import { useTodos } from '../context/TodosContext';



const TodoList = () => {
  const {todos, hideCompleted, setHideCompleted, cycleSort} = useTodos()

  if (todos.length === 0) return <h2>No TODOS</h2>


  return(
    <div className='todoList'>
      <div className='tasksHeader'>
        <button className='tasksHeaderBtn' onClick={cycleSort}>Tasks</button>
      </div>
      <ul className='todoItems'>
        {todos.map((todo: TodoType) => (
          <Todo 
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
      <label className='todoFooter'>
        Hide Completed
        <input
          type='checkbox'
          checked={hideCompleted}
          onChange={e => setHideCompleted(e.target.checked)}
        />
      </label>
    </div>
  )
}

export default TodoList