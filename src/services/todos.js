

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