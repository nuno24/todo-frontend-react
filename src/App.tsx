import './App.css';
import { useState } from 'react'
import TodoList from './components/TodoList'
import CreateTodoForm from './components/CreateTodoForm';
import { useTodos } from './context/TodosContext';


function App() {
  const [description, setDescription] = useState<string>('')
  const {error, fetchTodos} = useTodos()


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetchTodos()
  }


  return (
    <div className="App">
      <h1>Todo App</h1>
      {error ? <p role="alert">{error}</p> : null}
      <CreateTodoForm
        description={description}
        onSubmit={handleSubmit}
        onDescriptionChange={setDescription}
      />
      <TodoList />
    </div>
  );
}

export default App;
