

const CreateTodoForm = ({ description, onSubmit, onDescriptionChange}) => {

  return(
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="To do description"
          value={description}
          onChange={(e) => {onDescriptionChange(e.target.value)}}
        />
        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateTodoForm