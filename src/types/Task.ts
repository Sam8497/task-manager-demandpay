export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
}

export type TaskFilter = 'all' | 'completed' | 'pending';

export type Priority = 'low' | 'medium' | 'high';