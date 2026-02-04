

const Todo = ({todo}) => {
  
  
  return(
    <div>
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