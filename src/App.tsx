import './App.css';
import { useEffect, useState } from 'react'
import TodoList from './components/TodoList'
import { createTodo, deleteTodo, getTodos, updateTodo } from './services/todos';
import CreateTodoForm from './components/CreateTodoForm';
import type { Todo } from './types/todo';

type Sort = 'created' | 'asc' | 'desc'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [description, setDescription] = useState<string>('')

  const [hideCompleted, setHideCompleted] = useState(false)
  const [sort, setSort] = useState('created')

  const [error, setError] = useState<string>('')

  function cycleSort() {
    setSort(prev => (prev === 'created' ? 'desc' : prev === 'desc' ? 'asc' : 'created'))
  }

  async function fetchTodos() {
    const filter = hideCompleted ? 'incomplete' : 'all'
    const orderBy = sort === 'created' ? 'created_at' : 'description'
    const data = await getTodos(filter, orderBy)
    setTodos(sort === 'desc' ? [...data].reverse() : data)
  }

  useEffect(() => {
    (async () => {
      try{
        await fetchTodos()
      }catch(err){
        setError(err instanceof Error ? err.message : 'Failed to fetch todos')
      }
    })()
  }, [hideCompleted, sort])

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

  async function handleDelete(id:string) {
    setError('')
    try {
      await deleteTodo(id)
      await fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    }
  }

  async function handleToggleState(id: string, state: 'COMPLETE' | 'INCOMPLETE') {
    setError('')

    try {
      await updateTodo(id, {state})
      await fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to Toggle todo state')
    }
  }

  async function handleEdit(id: string, description: string) {
    setError('')
    try {
      await updateTodo(id, {description})
      await fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo desc.')
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
        onDelete={handleDelete}
        hideCompleted={hideCompleted}
        onHideCompletedChange={setHideCompleted}
        onCycleSort={cycleSort}
        onToggleState={handleToggleState}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
