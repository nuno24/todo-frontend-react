export type Todo = {
  id: string
  description: string
  state: 'COMPLETE' | 'INCOMPLETE'
  createdAt: string
  completedAt: string | null
}

export {}