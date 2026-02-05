import Todo from './Todo'
import type { Todo as TodoType } from '../types/todo'


type TodoListProps = {
  todos: TodoType[];
  onDelete: (id:string) => void
  hideCompleted: boolean
  onHideCompletedChange: (value: boolean) => void
  onCycleSort: () => void
  onToggleState: (id:string, state: 'COMPLETE' | 'INCOMPLETE') => void
  onEdit: (id: string, description: string) => void
};


const TodoList = ({ todos, onDelete, hideCompleted, onHideCompletedChange, onCycleSort,onToggleState, onEdit }: TodoListProps) => {
  if (todos.length === 0) return <h2>No TODOS</h2>


  return(
    <div>
      <button onClick={onCycleSort}>Tasks</button>
      <ul>
        {todos.map((todo: TodoType) => (
          <Todo 
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggleState={onToggleState}
            onEdit={onEdit}
          />
        ))
        }
      </ul>
      <label>
        <input
          type='checkbox'
          checked={hideCompleted}
          onChange={e => onHideCompletedChange(e.target.checked)}
        />
        Hide Completed
      </label>
    </div>
  )
}

export default TodoList