import type { Todo } from '../types/todo';

export type TodoFilter = 'all' | 'complete' | 'incomplete'
export type TodoOrderBy = 'description' | 'created_at'

export const getTodos = async (
  filter: TodoFilter, orderBy: TodoOrderBy
): Promise<Todo[]> => {

  const url = new URL('http://localhost:3000/todos')
  url.searchParams.set('filter', filter)
  if(orderBy) {
    url.searchParams.set('orderBy', orderBy)
  }

  const res = await fetch(url,{
    method: 'GET',
    headers: {"Content-type": "application/json"}}
  )

  if(!res.ok) {
    const err = await res.json()
    throw new Error(err.Error || "getTodos fail")
  }
  return (await res.json()) as Todo[]
}

export type CreateTodoInput = {
  description: string;
};

export const createTodo = async (input: CreateTodoInput): Promise<Todo> => {
  const res = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(input)
  })

  if(!res.ok) {
    const err = await res.json()
    throw new Error(err.Error || "createTodo fail")
  }
  return (await res.json()) as Todo
}

export const deleteTodo = async (id: string) => {
  const res = await fetch(`http://localhost:3000/todo/${id}`, {
    method: 'DELETE',
    headers: {"Content-type": "application/json"},
  })

  if(!res.ok) {
    const err = await res.json()
    throw new Error(err.Error || "deleteTodo fail")
  }
  return (await res.json()) as Todo
}