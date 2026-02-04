

export const getTodos = async () => {
  const res = await fetch('http://localhost:3000/todos',{
    method: 'GET',
    headers: {"Content-type": "application/json"}}
  )

  if(!res.ok) {
    const err = await res.json()
    throw new Error(err.Error || "getTodos fail")
  }
  return res.json()
}

export const createTodo = async (description) => {
  const res = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(description)
  })

  if(!res.ok) {
    const err = await res.json()
    throw new Error(err.Error || "createTodo fail")
  }
  return res.json(res)
}