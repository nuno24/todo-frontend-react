import './App.css';
import { useEffect, useState } from 'react'
import TodoList from './components/TodoList'
import { createTodo, getTodos } from './services/todos';
import CreateTodoForm from './components/CreateTodoForm';
import type { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [error, setError] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  async function fetchTodos() {
    const data = await getTodos()
    setTodos(data)
    console.log(data)
  }

  useEffect(() => {
    (async () => {
      try{
        await fetchTodos()
      }catch(err){
        setError(err instanceof Error ? err.message : 'Failed to fetch todos')
      }
    })()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('')

    try {
      const res = await createTodo({ description })
      setDescription('')
      await fetchTodos()
      console.log(res)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create todo')
    }
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
      <TodoList 
        todos={todos}
      />
    </div>
  );
}

export default App;
