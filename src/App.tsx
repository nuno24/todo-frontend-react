import './App.css';
import { useState } from 'react'
import TodoList from './components/TodoList'
import CreateTodoForm from './components/CreateTodoForm';
import { useTodos } from './context/TodosContext';
import { createTodo } from './services/todos';


function App() {
  const [description, setDescription] = useState<string>('')
  const {error, fetchTodos} = useTodos()
  const [localError, setLocalError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!description.trim()) return

    try {
      await createTodo({description})
      setDescription('')
      await fetchTodos()
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to create todod')
    }

  }


  return (
    <div className="App">
      <div className='panel'>
        <h1>Todo App</h1>
        {error ? <p role="alert">{error}</p> : null}
        <CreateTodoForm
          description={description}
          onSubmit={handleSubmit}
          onDescriptionChange={setDescription}
        />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
