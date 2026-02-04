import type { Todo } from '../types/todo';

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch('http://localhost:3000/todos',{
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