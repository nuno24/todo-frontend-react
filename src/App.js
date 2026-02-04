import './App.css';
import {useEffect, useState} from 'react'
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
      <h1>Todo list</h1>
      {todos ? (
        todos.map((todo) => {
          return <li key={todo.id}>{todo.description}</li>
        })
      ):(
        <div>NO TODOS </div>
      )}
    </div>
  );
}

export default App;
