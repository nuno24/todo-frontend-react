import './App.css';
import {useEffect, useState} from 'react'
import TodoList from '../src/components/TodoList'
import { createTodo, getTodos } from './services/todos';
import CreateTodoForm from './components/CreateTodoForm';

function App() {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState('')
  const [description, setDescription] = useState('')

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
        setError(err.message)
      }
    })()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    setError('')

    try {
      const res = await createTodo({description})
      setDescription('')
      await fetchTodos()
      console.log(res)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
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
