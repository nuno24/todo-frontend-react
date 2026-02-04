import './App.css';
import {useEffect, useState} from 'react'
import TodoList from '../src/components/TodoList'
import { getTodos } from './services/todos';

function App() {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState('')

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
        setError(err)
      }
    })()
  }, [])

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoList todos={todos}/>
    </div>
  );
}

export default App;
