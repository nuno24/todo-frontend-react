import Todo from './Todo'

const TodoList = ({todos}) => {
  if (todos.length === 0) return <h2>No TODOS</h2>


  return(
    <ul>
      {todos.map((todo) => (
        <Todo 
          key={todo.id}
          todo={todo}
        />
      ))
      }
    </ul>
  )
}

export default TodoList