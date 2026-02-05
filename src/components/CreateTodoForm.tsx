type CreateTodoFormProps = {
  description: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDescriptionChange: (value: string) => void;
};

const CreateTodoForm = ({ description, onSubmit, onDescriptionChange }: CreateTodoFormProps) => {

  return(
    <div className="createForm">
      <form onSubmit={onSubmit}>
        <input
          className="createInput"
          type="text"
          placeholder="To do description"
          value={description}
          onChange={(e) => {onDescriptionChange(e.target.value)}}
        />
        <button className="createButton">Create</button>
      </form>
    </div>
  )
}

export default CreateTodoForm