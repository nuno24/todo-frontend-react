type CreateTodoFormProps = {
  description: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDescriptionChange: (value: string) => void;
};

const CreateTodoForm = ({ description, onSubmit, onDescriptionChange }: CreateTodoFormProps) => {

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