export interface Todo {
  id: string;
  text: string;
  completed: number;
  createdAt: number;
}

export type TodoFilter = 'all' | 'active' | 'completed';
