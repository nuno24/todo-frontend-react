import { createContext, useContext, useEffect, useState } from "react"
import { Todo } from "../types/todo"
import { deleteTodo, getTodos, updateTodo } from "../services/todos"


type Sort = 'created' | 'asc' | 'desc'
type TodoState = 'COMPLETE' | 'INCOMPLETE'

type TodosContextValue = {
  todos: Todo[]
  error: string

  hideCompleted: boolean
  setHideCompleted: (v: boolean) => void

  sort: Sort
  cycleSort: () => void

  fetchTodos: () => Promise<void>
  handleDelete: (id: string) => Promise<void>
  handleToggleState: (id: string, state: TodoState) => Promise<void>
  handleEdit: (id: string, description: string) => Promise<void>
}

const TodosContext = createContext<TodosContextValue | undefined>(undefined)

export function TodosProvider({children}: {children: React.ReactNode}) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [error, setError] = useState<string>('')
  const [hideCompleted, setHideCompleted] = useState(false)
  const [sort, setSort] = useState<Sort>('created')
  
  
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


  async function handleDelete(id:string) {
    setError('')
    try {
      await deleteTodo(id)
      await fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    }
  }

  async function handleToggleState(id: string, state: TodoState) {
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
    <TodosContext.Provider
      value={{
        todos,
        error,
        hideCompleted,
        setHideCompleted,
        sort,
        cycleSort,
        fetchTodos,
        handleDelete,
        handleToggleState,
        handleEdit,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export function useTodos() {
  const ctx = useContext(TodosContext)
  if (!ctx) throw new Error('useTodos must be used within TodosProvider')
  return ctx
}